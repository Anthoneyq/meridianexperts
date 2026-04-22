import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="Page not found."
        intro="The page you requested does not exist, or has been moved."
      />
      <section style={{ padding: "4rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <Link href="/" className="btn btn--primary">
            Return Home →
          </Link>
        </div>
      </section>
    </>
  );
}
