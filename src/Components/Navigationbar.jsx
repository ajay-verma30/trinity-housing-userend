import React, { useState, useEffect } from "react";
import "./Navigation.css";

const Navigationbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll logic for backdrop blur and shadow intensity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Featured Properties", path: "/properties" },
    { name: "Sold Properties", path: "/sold" },
    { name: "About Us", path: "/about" },
    { name: "Client Stories", path: "/reviews" },
  ];

  return (
    <>
      {/* Custom Styles for New-Age Design Elements */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .agent-navbar-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Glassmorphism Backdrop */
        .nav-glassmorphism {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-glassmorphism.scrolled {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.08);
          padding-top: 0.65rem !important;
          padding-bottom: 0.65rem !important;
        }

        /* New-Age Hover Link Effects */
        .nav-link-custom {
          color: #334155 !important; /* Slate 700 */
          font-weight: 500;
          font-size: 0.925rem;
          position: relative;
          transition: color 0.25s ease;
          padding: 0.5rem 0.75rem !important;
        }

        .nav-link-custom:hover {
          color: #4f46e5 !important; /* Indigo 600 */
        }

        .nav-link-custom::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 2px;
          left: 50%;
          background: linear-gradient(90deg, #4f46e5, #06b6d4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%);
          border-radius: 2px;
        }

        .nav-link-custom:hover::after {
          width: 80%;
        }

        /* Action Buttons */
        .btn-call-agent {
          color: #0f172a;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.2s ease;
          background: #f1f5f9;
        }

        .btn-call-agent:hover {
          background: #e2e8f0;
          color: #4f46e5;
        }

        .btn-consultation {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.875rem;
          border: none;
          box-shadow: 0 4px 14px 0 rgba(15, 23, 42, 0.2);
          transition: all 0.3s ease;
        }

        .btn-consultation:hover {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px 0 rgba(15, 23, 42, 0.3);
        }

        /* Status Badge Pulse */
        .status-dot {
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          animation: pulse-green 2s infinite;
        }

        @keyframes pulse-green {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }
      `}</style>

      <div className="agent-navbar-root">
        <nav
          className={`navbar navbar-expand-xl fixed-top nav-glassmorphism py-3 border-bottom border-light-subtle ${
            isScrolled ? "scrolled" : ""
          }`}
        >
          <div className="container-fluid px-3 px-lg-5">
            {/* Agent Branding */}
            <a
              className="navbar-brand d-flex align-items-center gap-2 m-0"
              href="/"
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                style={{
                  width: "42px",
                  height: "42px",
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
                  fontSize: "1.1rem",
                }}
              >
                TH
              </div>
              <div className="d-flex flex-column">
                <span className="fw-bold fs-5 text-dark lh-1 tracking-tight">
                  Trinity Housing
                </span>
                {/* <span className="text-muted fw-semibold mt-1 d-flex align-items-center gap-1" style={{ fontSize: "0.725rem", letterSpacing: "0.5px" }}>
                  <span className="status-dot"></span> LUXURY REAL ESTATE
                </span> */}
              </div>
            </a>

            {/* Mobile Menu Toggler */}
            <button
              className="navbar-toggler border-0 shadow-none p-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#agentNavbarContent"
              aria-controls="agentNavbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Nav Menu & CTAs */}
            <div
              className="collapse navbar-collapse mt-3 mt-xl-0"
              id="agentNavbarContent"
            >
              {/* Centered Navigation Links */}
              <ul className="navbar-nav mx-auto mb-3 mb-xl-0 gap-xl-3 align-items-xl-center">
                {navLinks.map((link, idx) => (
                  <li className="nav-item" key={idx}>
                    <a className="nav-link nav-link-custom" href={link.path}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Right Side Action Buttons */}
              <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-2 pt-2 pt-xl-0 ">
                <div className="d-flex align-items-center gap-2 pt-2 pt-xl-0 ">
                  <a
                    href="/contact"
                    className="btn btn-nav-primary rounded-pill px-4 py-2 text-decoration-none text-center"
                   style={{color:"white"}}>
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigationbar;
