export type StaffRole = "admin" | "ops" | "doctor" | "support";

export type StaffProfile = {
  id: string;
  full_name: string;
  role: StaffRole;
  active: boolean;
};

export type BackendCaseResponse = {
  caseId: string;
  caseNumber: string;
  status: string;
};

export function getStaffHome(role: StaffRole) {
  if (role === "doctor") {
    return "/doctor";
  }

  return "/admin";
}
