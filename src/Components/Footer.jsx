import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer-link {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }
        .footer-link:hover {
          color: #ffffff !important;
          transform: translateX(4px);
        }
        .footer-contact-item {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-contact-item:hover {
          color: #38bdf8 !important;
        }
      `}</style>

      <footer style={{ backgroundColor: "#0f172a", color: "#94a3b8" }} className="pt-5 pb-4 border-top border-secondary-subtle">
        <div className="container px-4">
          <div className="row g-4 mb-5">
            {/* Brand Info */}
            <div className="col-lg-4 col-md-6">
              <h5 className="text-white fw-extrabold mb-3 tracking-wide" style={{ fontSize: "1.35rem" }}>
                TRINITY HOUSING
              </h5>
              <p className="small mb-3" style={{ lineHeight: "1.7", color: "#cbd5e1" }}>
                More Than Property. We Build Possibilities. Connecting buyers with quality residential and commercial real estate opportunities across premier locations.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-dark-subtle text-dark border border-secondary px-3 py-2 rounded-pill small">
                  🤝 Trusted Builder Network
                </span>
                <span className="badge bg-dark-subtle text-dark border border-secondary px-3 py-2 rounded-pill small">
                  🔑 End-to-End Assistance
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h6 className="text-white fw-bold mb-3">Quick Links</h6>
              <ul className="list-unstyled small d-flex flex-column gap-2 m-0">
                <li>
                  <Link to="/" className="footer-link">Home</Link>
                </li>
                <li>
                  <Link to="/properties" className="footer-link">Featured Properties</Link>
                </li>
                <li>
                  <Link to="/about" className="footer-link">About Us</Link>
                </li>
                <li>
                  <Link to="/contact" className="footer-link">Contact Us</Link>
                </li>
              </ul>
            </div>

            {/* Services / Focus */}
            <div className="col-lg-3 col-md-6">
              <h6 className="text-white fw-bold mb-3">Our Core Philosophy</h6>
              <p className="small mb-3" style={{ fontSize: "0.85rem", lineHeight: "1.6", color: "#94a3b8" }}>
                Trust. Experience. Transparency. Relationships.
              </p>
              <div className="p-3 rounded-3" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid #1e293b" }}>
                <span className="d-block text-white-50 fw-semibold extra-small" style={{ fontSize: "0.75rem" }}>VERIFICATION NOTICE</span>
                <p className="small m-0 text-slate-400" style={{ fontSize: "0.8rem" }}>
                  All property details are subject to change. Verify RERA registration numbers prior to document executions.
                </p>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="col-lg-3 col-md-6">
              <h6 className="text-white fw-bold mb-3">Get In Touch</h6>
              <div className="d-flex flex-column gap-2 small">
                <div>
                  <span className="d-block text-white-50" style={{ fontSize: "0.75rem" }}>NEED ASSISTANCE?</span>
                  <Link to="/contact" className="footer-contact-item fw-semibold text-white fs-6">
                    Book a Free Consultation →
                  </Link>
                </div>
                <div className="mt-2">
                  <span className="d-block text-white-50" style={{ fontSize: "0.75rem" }}>INQUIRY EMAIL</span>
                  <a href="mailto:info@trinityhousing.com" className="footer-contact-item text-slate-300">
                    info@trinityhousing.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <hr style={{ borderColor: "#334155" }} />

          {/* Bottom Bar */}
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between pt-2 gap-3 small text-slate-400">
            <div>
              &copy; {currentYear} <strong className="text-white">Trinity Housing Real Estate Advisory</strong>. All rights reserved.
            </div>
            <div className="d-flex gap-4">
              <span className="text-white-50">Where Experience Meets Opportunity.</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;