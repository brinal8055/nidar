"use client";

import { siteConfig } from "@/lib/site-content";
import { QuizData } from "@/lib/storage";
import { BackendCaseResponse } from "@/lib/backend-contract";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type CreateCaseInput = {
  contact: {
    fullName: string;
    phone: string;
    email: string;
    coupon: string;
    source: string;
  };
  quizSummary: QuizData;
};

type UploadCaseMediaInput = {
  caseId: string;
  contactEmail: string;
  files: File[];
};

type CreateCaseResult =
  | {
      configured: false;
    }
  | {
      configured: true;
      data?: BackendCaseResponse;
      error?: string;
    };

type UploadCaseMediaResult =
  | {
      configured: false;
    }
  | {
      configured: true;
      uploaded: number;
      errors: string[];
    };

export async function createCaseOnBackend(input: CreateCaseInput): Promise<CreateCaseResult> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return { configured: false };
  }

  const { data, error } = await supabase.functions.invoke<BackendCaseResponse>("create_case", {
    body: {
      contact: input.contact,
      consultFee: siteConfig.consultFee,
      quizSummary: input.quizSummary,
      vertical: "hair_care",
    },
  });

  if (error) {
    return { configured: true, error: error.message };
  }

  if (!data) {
    return { configured: true, error: "The backend did not return a case confirmation." };
  }

  return { configured: true, data };
}

export async function uploadCaseMediaFiles(input: UploadCaseMediaInput): Promise<UploadCaseMediaResult> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return { configured: false };
  }

  const errors: string[] = [];
  let uploaded = 0;

  for (const file of input.files) {
    const { data, error } = await supabase.functions.invoke<{
      objectPath: string;
      token: string;
      signedUrl: string;
    }>("upload_case_media", {
      body: {
        caseId: input.caseId,
        contactEmail: input.contactEmail,
        mediaKind: "hair_photo",
        originalFileName: file.name,
      },
    });

    if (error || !data?.objectPath || !data.token) {
      errors.push(`${file.name}: ${error?.message || "Unable to request upload URL."}`);
      continue;
    }

    const { error: uploadError } = await supabase.storage
      .from("case-media")
      .uploadToSignedUrl(data.objectPath, data.token, file);

    if (uploadError) {
      errors.push(`${file.name}: ${uploadError.message}`);
      continue;
    }

    uploaded += 1;
  }

  return { configured: true, uploaded, errors };
}
