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
          object-fit: contain;
          display: block;
        }

        .stat-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          text-align: center;
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

        .philosophy-banner {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #ffffff;
          border-radius: 24px;
          padding: 40px;
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
                  alt="Trinity Housing Professional Portrait"
                />
              </div>
            </div>

            <div className="col-lg-7">
              <span className="badge bg-primary-subtle text-primary fw-bold rounded-pill px-3 py-2 mb-3">
                About Us – Trinity Housing
              </span>
              <h1 className="fw-extrabold display-5 mb-3 text-dark">
                More Than Property. We Build Possibilities.
              </h1>
              <p className="text-secondary fs-5 leading-relaxed mb-4 fw-medium">
                At Trinity Housing, we believe that real estate is not just about buying a property—it is about making the right decision for your future, lifestyle, and investment goals.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                With expertise built over many years in the real estate industry, Trinity Housing has developed strong market knowledge, valuable relationships, and a deep understanding of the property landscape. Over the years, we have had the opportunity to work with trusted, reputed, and well-known builders and developers, giving our clients access to quality projects and promising real estate opportunities.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                From premium residential homes and new projects to commercial spaces and investment opportunities, we focus on matching every client with the right property based on their requirements and budget.
              </p>

              {/* STATS ROW */}
              <div className="row g-3">
                <div className="col-4">
                  <div className="stat-card">
                    <h3 className="fw-bold text-primary mb-0">100+</h3>
                    <small className="text-muted fw-semibold">Units Delivered</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-card">
                    <h3 className="fw-bold text-success mb-0">7+</h3>
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

          {/* OUR EXPERTISE SECTION */}
          <div className="my-5 py-4">
            <div className="text-center mb-5">
              <h2 className="fw-bold fs-2 text-dark">Our Expertise</h2>
              <p className="text-muted">Delivering professional guidance and genuine value across every milestone.</p>
            </div>

            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="feature-card">
                  <div className="fs-1 mb-3">🏙️</div>
                  <h5 className="fw-bold text-dark mb-2">Years of Real Estate Experience</h5>
                  <p className="text-muted small mb-0">
                    A strong understanding of market trends, locations, projects, and investment opportunities.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="feature-card">
                  <div className="fs-1 mb-3">🤝</div>
                  <h5 className="fw-bold text-dark mb-2">Trusted Builder Network</h5>
                  <p className="text-muted small mb-0">
                    Strong professional associations and experience working with reputed and well-known builder/developer groups.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="feature-card">
                  <div className="fs-1 mb-3">🎯</div>
                  <h5 className="fw-bold text-dark mb-2">Personalized Property Solutions</h5>
                  <p className="text-muted small mb-0">
                    We understand that every client has different goals, and we provide recommendations accordingly.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="feature-card">
                  <div className="fs-1 mb-3">🔑</div>
                  <h5 className="fw-bold text-dark mb-2">End-to-End Assistance</h5>
                  <p className="text-muted small mb-0">
                    From property selection and site visits to negotiations and closing, we guide our clients throughout the journey.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PHILOSOPHY & VISION */}
          <div className="row g-4 my-5">
            <div className="col-lg-6">
              <div className="philosophy-banner h-100 d-flex flex-column justify-content-center">
                <span className="text-primary-subtle fw-bold text-uppercase small tracking-wide mb-2">Our Philosophy</span>
                <h3 className="fw-extrabold text-white mb-3">Trust. Experience. Transparency. Relationships.</h3>
                <p className="text-slate-300 mb-0 leading-relaxed">
                  These values form the foundation of Trinity Housing. Our goal is not simply to complete a transaction, but to build long-term relationships by delivering professional guidance and genuine value.
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="bg-white border rounded-4 p-5 h-100 d-flex flex-column justify-content-center shadow-sm">
                <span className="text-primary fw-bold text-uppercase small tracking-wide mb-2">Our Vision</span>
                <h3 className="fw-bold text-dark mb-3">Building a Trusted Name in Real Estate</h3>
                <p className="text-muted mb-0 leading-relaxed">
                  To become a trusted and respected name in real estate, recognized for our expertise, strong builder relationships, customer-centric approach, and commitment to excellence.
                </p>
              </div>
            </div>
          </div>

          {/* OUR PROMISE / CALL TO ACTION */}
          <div className="bg-primary text-white rounded-4 p-5 text-center my-5 shadow-lg">
            <span className="text-uppercase small fw-bold text-white-50 tracking-wider">Our Promise</span>
            <h2 className="fw-bold my-2">Years of experience. Trusted builder relationships.</h2>
            <p className="text-white-50 mb-4 fs-5">Personalized guidance. Smarter property decisions.</p>
            <div className="mb-4">
              <h5 className="fw-extrabold tracking-wide mb-0">TRINITY HOUSING</h5>
              <small className="text-white-50 italic">Where Experience Meets Opportunity.</small>
            </div>
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