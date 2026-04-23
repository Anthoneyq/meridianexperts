import { redirect } from "next/navigation";

/**
 * Serves the static site under /public. "/" redirects to the real homepage
 * (multi-page static HTML, not a React tree).
 */
export default function Home() {
  redirect("/Home.html");
}
