import { redirect } from "next/navigation";

// The marketing landing page lives at Logo/mandrok-experience/index-final.html
// (the actual Mandrok site) — this app only serves the product itself, so its
// root simply sends visitors to sign in.
export default function RootPage() {
  redirect("/login");
}
