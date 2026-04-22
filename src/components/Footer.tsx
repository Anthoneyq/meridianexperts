import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" className="wordmark" aria-label="Meridian Experts">
              <span className="wordmark__mark">
                <span className="wordmark__cross" />
              </span>
              <span className="wordmark__text">
                MERIDIAN
                <small>EXPERTS</small>
              </span>
            </Link>
            <p>
              Litigation-grade building consultants. Retained by attorneys in
              construction, insurance, and structural failure matters.
            </p>
          </div>

          <div className="footer__col">
            <h4>Practice</h4>
            <ul>
              <li>
                <Link href="/practice-areas/construction-defects">
                  Construction Defects
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/water-intrusion">
                  Water &amp; Envelope
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/insurance-catastrophe">
                  Insurance &amp; Cat Loss
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/structural-failures">
                  Structural Failures
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/expert-testimony">
                  Expert Testimony
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Firm</h4>
            <ul>
              <li>
                <Link href="/approach">Approach</Link>
              </li>
              <li>
                <Link href="/process">Process</Link>
              </li>
              <li>
                <Link href="/credentials">Credentials</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:intake@meridianexperts.com">
                  intake@meridianexperts.com
                </a>
              </li>
              <li>
                <a href="tel:">(XXX) XXX-XXXX</a>
              </li>
              <li style={{ color: "var(--warm-grey)", paddingTop: "0.5rem" }}>
                Multi-state engagements
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <div>© {year} Meridian Experts. All rights reserved.</div>
          <div>Privacy · Terms · Conflict Policy</div>
        </div>
      </div>
    </footer>
  );
}
