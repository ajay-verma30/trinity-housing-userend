import React from "react";
import { useNavigate } from "react-router-dom";
import Navigationbar from "../Components/Navigationbar";
import Footer from "../Components/Footer";

const ClientStories = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .stories-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #0f172a;
          background-color: #f8fafc;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 90px;
        }

        .coming-soon-wrapper {
          padding: 80px 20px;
          text-align: center;
          position: relative;
        }

        .badge-pill {
          background-color: rgba(56, 189, 248, 0.1);
          color: #0284c7;
          border: 1px solid rgba(2, 132, 199, 0.2);
          font-size: 0.875rem;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 50px;
          display: inline-block;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .coming-soon-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .sub-text {
          font-size: clamp(1.1rem, 2vw, 1.35rem);
          color: #64748b;
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .glass-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 40px 30px;
          box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.05);
          max-width: 800px;
          margin: 0 auto;
        }

        .icon-circle {
          width: 80px;
          height: 80px;
          background: #f1f5f9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          margin: 0 auto 24px auto;
        }
      `}</style>

      <div className="stories-root">
        <Navigationbar />

        <main className="container my-auto">
          <div className="coming-soon-wrapper">
            <div className="glass-card">
              <div className="icon-circle">🌟</div>
              
              <div className="mb-3">
                <span className="badge-pill">TRINITY HOUSING</span>
              </div>

              <h1 className="coming-soon-title mb-3">
                CLIENT STORIES
              </h1>

              <div className="display-6 fw-bold text-primary mb-4" style={{ letterSpacing: "0.05em" }}>
                COMING SOON
              </div>

              <p className="sub-text mb-4">
                We are currently gathering real journeys, homebuyer experiences, and success stories from our valued clients. Stay tuned to read how we turn property decisions into possibilities!
              </p>

              <div className="d-flex flex-wrap justify-content-center gap-3">
                <button
                  className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm"
                  onClick={() => navigate("/properties")}
                >
                  Browse Available Properties →
                </button>
                <button
                  className="btn btn-outline-secondary rounded-pill px-4 py-2 fw-semibold"
                  onClick={() => navigate("/contact")}
                >
                  Share Your Experience
                </button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ClientStories;