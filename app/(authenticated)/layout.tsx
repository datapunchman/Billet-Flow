import { UserShell } from "@/components/shared/UserShell";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserShell>{children}</UserShell>;
}
