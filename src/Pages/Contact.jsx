import React, { useState } from "react";
import Navigationbar from "../Components/Navigationbar";
import Footer from "../Components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    suburb: "Andheri",
    propertyType: "Buy",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Our Western Suburbs property consultant will contact you shortly.");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .contact-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #0f172a;
          background-color: #fafafa;
        }

        .contact-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          padding-top: 140px;
          padding-bottom: 80px;
          color: #ffffff;
        }

        .contact-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.08);
          padding: 36px;
        }

        .info-card {
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px -10px rgba(15, 23, 42, 0.1);
        }

        .form-control-custom, .form-select-custom {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px 16px;
          font-weight: 500;
        }

        .form-control-custom:focus, .form-select-custom:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
        }

        .btn-gradient {
          background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
          color: #ffffff;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          padding: 14px 28px;
          transition: all 0.3s ease;
        }

        .btn-gradient:hover {
          color: #ffffff;
          opacity: 0.95;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
        }
      `}</style>

      <div className="contact-root">
        <Navigationbar />

        {/* HERO SECTION */}
        <section className="contact-hero text-center">
          <div className="container px-4">
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill mb-3">
              📍 Local Real Estate Advisory
            </span>
            <h1 className="display-5 fw-extrabold mb-3">Get in Touch with Our Experts</h1>
            <p className="lead text-slate-300 mx-auto mb-0" style={{ maxWidth: "600px", color: "#94a3b8" }}>
              Looking to buy, sell, or rent along the Western Suburban belt? Share your requirements and let's discuss your options.
            </p>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="py-5" style={{ marginTop: "-40px" }}>
          <div className="container px-4">
            <div className="row g-4">
              
              {/* CONTACT FORM */}
              <div className="col-lg-7">
                <div className="contact-card">
                  <h3 className="fw-bold mb-1">Send Us a Message</h3>
                  <p className="text-muted small mb-4">Fill out the details below and we will get back to you as soon as possible.</p>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-secondary">FULL NAME</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control form-control-custom"
                          placeholder="e.g. Rahul Sharma"
                          required
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-secondary">PHONE NUMBER</label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control form-control-custom"
                          placeholder="+91 98765 43210"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-secondary">EMAIL ADDRESS</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control form-control-custom"
                          placeholder="rahul@example.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-secondary">PREFERRED SUBURB</label>
                        <select className="form-select custom-select">
                          <option value="">All Western Suburbs</option>
                          <option value="Andheri">Andheri</option>
                          <option value="Jogeshwari">Jogeshwari</option>
                          <option value="Goregaon">Goregaon</option>
                          <option value="Malad">Malad</option>
                          <option value="Kandivali">Kandivali</option>
                          <option value="Borivali">Borivali</option>
                          <option value="Dahisar">Dahisar</option>
                          <option value="Mira Road">Mira Road</option>
                          <option value="Bhayander">Bhayander</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <label className="form-label small fw-bold text-secondary">PURPOSE</label>
                        <div className="d-flex gap-3">
                          {["Buy Property", "Rent Property", "Sell Property"].map((type) => (
                            <div className="form-check" key={type}>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="propertyType"
                                id={type}
                                value={type}
                                checked={formData.propertyType === type}
                                onChange={handleChange}
                              />
                              <label className="form-check-label small fw-semibold" htmlFor={type}>
                                {type}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="col-12">
                        <label className="form-label small fw-bold text-secondary">YOUR REQUIREMENT</label>
                        <textarea
                          name="message"
                          rows="4"
                          className="form-control form-control-custom"
                          placeholder="Mention budget, configuration (e.g., 2 BHK in Borivali West), or specific preferences..."
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-gradient w-100">
                          Submit Enquiry
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* DIRECT CONTACT INFO & LOCATIONS */}
              <div className="col-lg-5">
                <div className="d-flex flex-column gap-3">
                  
                  {/* Call / WhatsApp Box */}
                  <div className="info-card bg-white">
                    <h5 className="fw-bold mb-3">Direct Connect</h5>
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="p-3 bg-primary-subtle text-primary rounded-circle">📞</div>
                      <div>
                        <span className="d-block text-muted small">Call Us Directly</span>
                        <a href="tel:+919876543210" className="fw-bold text-dark text-decoration-none">+91 99999 99999</a>
                      </div>
                    </div>
                  </div>

                  {/* Regional Offices */}
                  <div className="info-card">
                    <h5 className="fw-bold mb-3">Suburban Operations</h5>
                    
                    <div className="mb-3 border-bottom pb-3">
                      <h6 className="fw-bold mb-1">📍 Andheri Hub</h6>
                      <p className="small text-muted mb-0">
                        SV Road, Near Station, Andheri West, Mumbai – 400058
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="info-card">
                    <h5 className="fw-bold mb-2">Office Hours</h5>
                    <p className="small text-muted mb-0">
                      <strong>Monday – Sunday:</strong> 10:00 AM – 8:00 PM<br />
                      <em>Site visits can be arranged on all 7 days with prior booking.</em>
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Contact;