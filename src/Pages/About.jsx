import React from "react";
import { useNavigate } from "react-router-dom";
import Navigationbar from "../Components/Navigationbar";
import Footer from "../Components/Footer";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .about-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #0f172a;
          background-color: #f8fafc;
          min-height: 100vh;
          padding-top: 90px;
        }

        .profile-img-frame {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.15);
        }

        .profile-img-frame img {
          width: 100%;
          height: 480px;
          object-fit: cover;
          display: block;
        }

        .stat-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          text-center;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
        }

        .feature-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 30px;
          height: 100%;
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }
      `}</style>

      <div className="about-root">
        <Navigationbar />

        <div className="container px-4 py-5">
          {/* HERO PROFILE SECTION */}
          <div className="row g-5 align-items-center mb-5 pb-4">
            <div className="col-lg-5">
              <div className="profile-img-frame">
                <img
                  src="/Images/profile.jpeg"
                  alt="Founder & CEO Professional Portrait"
                />
              </div>
            </div>

            <div className="col-lg-7">
              <span className="badge bg-primary-subtle text-primary fw-bold rounded-pill px-3 py-2 mb-3">
                About Our Venture
              </span>
              <h1 className="fw-extrabold display-5 mb-3 text-dark">
                Helping You Find A Place You Can Truly Call Home
              </h1>
              <p className="text-secondary fs-5 leading-relaxed mb-4">
                Real estate is more than just transactions—it's about matching families, individuals, and businesses with spaces where they can grow and thrive. We bridge the gap between properties and buyers with absolute transparency.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                Whether you're looking for your first residential apartment, expanding into a commercial office, or exploring long-term land investments, our team ensures a verified, smooth, and hassle-free journey from property selection to final handover.
              </p>

              {/* STATS ROW */}
              <div className="row g-3">
                <div className="col-4">
                  <div className="stat-card">
                    <h3 className="fw-bold text-primary mb-0">500+</h3>
                    <small className="text-muted fw-semibold">Units Delivered</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-card">
                    <h3 className="fw-bold text-success mb-0">10+</h3>
                    <small className="text-muted fw-semibold">Years Experience</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-card">
                    <h3 className="fw-bold text-dark mb-0">99%</h3>
                    <small className="text-muted fw-semibold">Client Satisfaction</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* OUR VALUES */}
          <div className="my-5 py-4">
            <div className="text-center mb-5">
              <h2 className="fw-bold fs-2 text-dark">Why Clients Trust Us</h2>
              <p className="text-muted">Built on clear communication, technical diligence, and verified listings.</p>
            </div>

            <div className="row g-4">
              <div className="col-md-4">
                <div className="feature-card">
                  <div className="fs-1 mb-3">🏢</div>
                  <h5 className="fw-bold text-dark mb-2">Verified Inventory</h5>
                  <p className="text-muted small mb-0">
                    Every property listing undergoes strict verification regarding RERA status, legal documentation, and developer track records.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="feature-card">
                  <div className="fs-1 mb-3">🤝</div>
                  <h5 className="fw-bold text-dark mb-2">Transparent Pricing</h5>
                  <p className="text-muted small mb-0">
                    No hidden charges or unexpected commissions. We maintain absolute transparency in pricing, maintenance costs, and taxes.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="feature-card">
                  <div className="fs-1 mb-3">🎯</div>
                  <h5 className="fw-bold text-dark mb-2">End-to-End Assistance</h5>
                  <p className="text-muted small mb-0">
                    From initial site visits to legal documentation and final possession keys, our advisors guide you through every milestone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="bg-primary text-white rounded-4 p-5 text-center my-5 shadow-lg">
            <h2 className="fw-bold mb-2">Ready to explore available properties?</h2>
            <p className="text-white-50 mb-4">Browse through our latest active residential and commercial inventory.</p>
            <button
              className="btn btn-light rounded-pill px-4 py-2 fw-semibold text-primary"
              onClick={() => navigate("/properties")}
            >
              Explore Properties →
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default About;