import { notFound } from "next/navigation";

import { AdminCaseDetail } from "@/components/admin/admin-case-detail";
import { adminCases, getCaseById } from "@/lib/admin/mock-data";

type AdminCasePageProps = {
  params: Promise<{ caseId: string }>;
};

export async function generateStaticParams() {
  return adminCases.map((item) => ({ caseId: item.id }));
}

export default async function AdminCasePage({ params }: AdminCasePageProps) {
  const { caseId } = await params;
  const item = getCaseById(caseId);

  if (!item) {
    notFound();
  }

  return <AdminCaseDetail item={item} />;
}
