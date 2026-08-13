import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#0f172a", color: "#94a3b8" }} className="pt-5 pb-4">
      <div className="container px-4">
        <div className="row g-4 mb-5">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <h5 className="text-white fw-bold mb-3">Western Homes</h5>
            <p className="small mb-3" style={{ lineHeight: "1.6" }}>
              Your trusted real estate partner across Mumbai's Western Line, connecting buyers with luxury apartments and commercial spaces from Andheri to Mira Road.
            </p>
            <div className="d-flex gap-3">
              <span className="badge bg-slate-800 text-light border border-secondary px-3 py-2 rounded-pill">
                📍 Western Line Specialist
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-white fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 m-0">
              <li><a href="/properties" className="text-decoration-none text-slate-400 hover-white">Featured Properties</a></li>
              <li><a href="/about" className="text-decoration-none text-slate-400 hover-white">About Us</a></li>
            </ul>
          </div>

          {/* Important Notice & Contact */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-bold mb-3">Important Notice</h6>
            <p className="small mb-2" style={{ fontSize: "0.825rem" }}>
              All property details and prices are subject to change. Verify RERA registration numbers before signing agreement documents.
            </p>
            <div className="mt-3">
              <span className="d-block small text-light fw-semibold">Need Help?</span>
              <p className="fw-bold small" style={{color:"white !important"}}>+91 99999 99999</p>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: "#334155" }} />

        {/* Bottom Bar with Copyright Sign */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between pt-3 gap-3 small">
          <div>
            &copy; {currentYear} Trinity Housing Real Estate Advisory. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;