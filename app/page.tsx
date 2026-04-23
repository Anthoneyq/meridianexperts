import { redirect } from "next/navigation";

/**
 * "/" → /index.html (Claude multi-page static site in /public).
 */
export default function Home() {
  redirect("/index.html");
}
