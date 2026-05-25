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

type CreateCaseResult =
  | {
      configured: false;
    }
  | {
      configured: true;
      data?: BackendCaseResponse;
      error?: string;
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
