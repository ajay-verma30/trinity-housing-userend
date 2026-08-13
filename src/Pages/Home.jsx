import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigationbar from "../Components/Navigationbar";
import Footer from "../Components/Footer";
import API from "../api/axios";

const Home = () => {
  const navigate = useNavigate();

  // API Data States
  const [properties, setProperties] = useState([]);
  const [builders, setBuilders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [filters, setFilters] = useState({
    locality: "",
    property_type: "",
    bhk: "",
    max_price: ""
  });

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const [propRes, builderRes] = await Promise.all([
          API.get("/properties"),
          API.get("/builders")
        ]);

        // API Response handling
        const propData = propRes.data?.properties || propRes.data || [];
        const builderData = Array.isArray(builderRes.data) ? builderRes.data : [];

        setProperties(propData);
        setBuilders(builderData);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Helper function to truncate text to exactly N words
  const truncateWords = (str, limit = 5) => {
    if (!str) return "";
    const words = str.trim().split(/\s+/);
    if (words.length <= limit) return str;
    return words.slice(0, limit).join(" ") + "...";
  };

  // Filter changes handler
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Base client-side filtering logic matching search bar
  const filteredProperties = properties.filter((p) => {
    const matchesLocality = !filters.locality || 
      (p.locality && p.locality.toLowerCase().includes(filters.locality.toLowerCase())) ||
      (p.address && p.address.toLowerCase().includes(filters.locality.toLowerCase()));

    const matchesType = !filters.property_type || p.property_type === filters.property_type;

    const matchesBhk = !filters.bhk || 
      (p.bhk && p.bhk.toLowerCase().includes(filters.bhk.toLowerCase()));

    const matchesPrice = !filters.max_price || Number(p.price) <= Number(filters.max_price);

    return matchesLocality && matchesType && matchesBhk && matchesPrice;
  });

  // 1. Featured Properties: Exclude sold properties and limit to top 5
  const activeFeaturedProperties = filteredProperties
    .filter((p) => p.availability_status?.toLowerCase() !== "sold")
    .slice(0, 5);

  // 2. Sold Properties: Include only sold properties and limit to top 5
  const soldProperties = filteredProperties
    .filter((p) => p.availability_status?.toLowerCase() === "sold")
    .slice(0, 5);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .homepage-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #0f172a;
          background-color: #f8fafc;
        }

        .hero-section {
          position: relative;
          padding-top: 140px;
          padding-bottom: 100px;
          background: linear-gradient(
              180deg,
              rgba(15, 23, 42, 0.75) 0%,
              rgba(15, 23, 42, 0.55) 50%,
              rgba(15, 23, 42, 0.85) 100%
            ),
            url('/Images/LandingImage.jpg') center/cover no-repeat;
          min-height: 85vh;
          display: flex;
          align-items: center;
        }

        .search-card-container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
          padding: 24px;
        }

        .search-field-group {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 8px 12px;
          transition: all 0.2s ease;
        }

        .search-field-group:focus-within {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
        }

        .field-label {
          font-size: 0.6875rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-weight: 700;
          color: #64748b;
          margin-bottom: 2px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .custom-select, .custom-input {
          border: none;
          background: transparent;
          font-weight: 600;
          font-size: 0.9375rem;
          color: #0f172a;
          padding: 0;
          width: 100%;
          outline: none;
        }

        /* Horizontal Scrollable Container Styles */
        .horizontal-scroll-container {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-bottom: 16px;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        .horizontal-scroll-container::-webkit-scrollbar {
          height: 6px;
        }

        .horizontal-scroll-container::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 10px;
        }

        .horizontal-scroll-item {
          flex: 0 0 320px;
          scroll-snap-align: start;
        }

        @media (min-width: 768px) {
          .horizontal-scroll-item {
            flex: 0 0 360px;
          }
        }

        .property-card {
          border: none;
          border-radius: 20px;
          overflow: hidden;
          background: #ffffff;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #e2e8f0;
        }

        .property-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 30px -10px rgba(15, 23, 42, 0.12);
        }

        .property-img-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
          background-color: #e2e8f0;
        }

        .property-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .property-card:hover .property-img-wrapper img {
          transform: scale(1.05);
        }

        .badge-tag {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(8px);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.75rem;
          padding: 5px 12px;
          border-radius: 30px;
        }

        .badge-status {
          position: absolute;
          top: 14px;
          right: 14px;
          font-weight: 600;
          font-size: 0.75rem;
          padding: 5px 12px;
          border-radius: 30px;
          text-transform: capitalize;
        }

        .builder-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          padding: 16px 20px;
          transition: all 0.25s ease;
        }

        .builder-card:hover {
          border-color: #6366f1;
          box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.1);
        }

        .btn-gradient {
          background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
          color: #ffffff;
          font-weight: 700;
          border: none;
          transition: all 0.3s ease;
          border-radius: 14px;
        }

        .btn-gradient:hover {
          color: #ffffff;
          opacity: 0.95;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.4);
        }

        .cta-box {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-radius: 28px;
          color: #ffffff;
          padding: 50px 36px;
        }
      `}</style>

      <div className="homepage-root">
        <Navigationbar />

        {/* HERO & FILTER SECTION */}
        <section className="hero-section">
          <div className="container px-4">
            <div className="row justify-content-center text-center mb-5">
              <div className="col-lg-9">
                <span 
                  className="badge px-3 py-2 rounded-pill mb-3 text-white border border-light-subtle"
                  style={{ background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(10px)" }}
                >
                  ✨ Real Estate Specialist
                </span>
                <h1 className="display-4 text-white mb-3" style={{ fontWeight: "800" }}>
                  Find Your Ideal Space in Top Localities
                </h1>
                <p className="lead text-white-50 fs-5 mx-auto" style={{ maxWidth: "680px" }}>
                  Discover verified residential apartments, commercial properties, and developments.
                </p>
              </div>
            </div>

            {/* Filter Search Card */}
            <div className="row justify-content-center">
              <div className="col-lg-11 col-xl-10">
                <div className="search-card-container">
                  <div className="row g-3 align-items-center">
                    
                    {/* LOCALITY / CITY */}
                    <div className="col-md-6 col-lg-3">
                      <div className="search-field-group">
                        <label className="field-label">📍 Locality / Address</label>
                        <input
                          type="text"
                          name="locality"
                          className="custom-input"
                          placeholder="e.g. Mira Road, Mumbai"
                          value={filters.locality}
                          onChange={handleFilterChange}
                        />
                      </div>
                    </div>

                    {/* PROPERTY TYPE */}
                    <div className="col-md-6 col-lg-3">
                      <div className="search-field-group">
                        <label className="field-label">🏢 Property Type</label>
                        <select 
                          name="property_type" 
                          className="form-select custom-select"
                          value={filters.property_type}
                          onChange={handleFilterChange}
                        >
                          <option value="">All Types</option>
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="plot">Plot</option>
                        </select>
                      </div>
                    </div>

                    {/* BHK CONFIGURATION */}
                    <div className="col-md-6 col-lg-2">
                      <div className="search-field-group">
                        <label className="field-label">🛏️ Config</label>
                        <select 
                          name="bhk" 
                          className="form-select custom-select"
                          value={filters.bhk}
                          onChange={handleFilterChange}
                        >
                          <option value="">Any BHK</option>
                          <option value="1 BHK">1 BHK</option>
                          <option value="2 BHK">2 BHK</option>
                          <option value="3 BHK">3 BHK</option>
                        </select>
                      </div>
                    </div>

                    {/* MAX BUDGET */}
                    <div className="col-md-6 col-lg-2">
                      <div className="search-field-group">
                        <label className="field-label">💰 Max Budget</label>
                        <select 
                          name="max_price" 
                          className="form-select custom-select"
                          value={filters.max_price}
                          onChange={handleFilterChange}
                        >
                          <option value="">Any Price</option>
                          <option value="5000000">Under ₹50 Lakh</option>
                          <option value="10000000">Under ₹1 Cr</option>
                          <option value="15000000">Under ₹1.5 Cr</option>
                          <option value="25000000">Under ₹2.5 Cr</option>
                        </select>
                      </div>
                    </div>

                    {/* SEARCH ACTION */}
                    <div className="col-12 col-lg-2">
                      <button
                        type="button"
                        className="btn btn-gradient w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                        onClick={() => {
                          const element = document.getElementById("properties-list");
                          element?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <span>Find</span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PROPERTIES SECTION (EXCLUDES SOLD, MAX 5, HORIZONTAL SCROLL) */}
        <section className="py-5" id="properties-list">
          <div className="container px-4">
            <div className="d-flex flex-row justify-content-between align-items-end mb-4">
              <div>
                <h2 className="fw-bold fs-2 mb-1">Featured Properties</h2>
                <p className="text-muted mb-0">Explore our top available listings.</p>
              </div>
              <Link 
                to="/properties" 
                className="btn btn-outline-primary rounded-pill px-3 py-2 fw-bold btn-sm text-nowrap"
              >
                View All Properties →
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Loading properties...</p>
              </div>
            ) : activeFeaturedProperties.length > 0 ? (
              <div className="horizontal-scroll-container">
                {activeFeaturedProperties.map((prop) => (
                  <div className="horizontal-scroll-item" key={prop.id}>
                    <div className="card property-card h-100 border-0 shadow-sm rounded-4 overflow-hidden d-flex flex-column">
  {/* Image Header */}
  <div className="property-img-wrapper position-relative">
    <img 
      src={prop.images?.[0]?.image_url || prop.images?.[0] || "/Images/LandingImage.jpg"} 
      alt={prop.title} 
      className="card-img-top"
      onError={(e) => {
        e.target.src = "https://via.placeholder.com/600x400?text=Property+Image";
      }}
    />
    <span className="badge-tag">
      {prop.bhk || prop.property_type}
    </span>
    <span className={`badge-status text-white ${prop.availability_status?.toLowerCase() === 'sold' ? 'bg-danger' : 'bg-success'}`}>
      {prop.availability_status || "Available"}
    </span>
  </div>

  {/* Card Body */}
  <div className="card-body p-4 d-flex flex-column">
    <div className="mb-2">
      <small className="text-primary fw-semibold text-uppercase">
        {prop.project?.name || prop.project_name || "Standalone"} • {prop.project?.locality || prop.locality || prop.city}
      </small>
      <h5 className="fw-bold text-dark mb-1 text-truncate">{prop.title}</h5>
      <p className="text-muted small mb-3">
        {truncateWords(prop.description, 5)}
      </p>
    </div>

    {/* Specs Grid */}
    <div className="row g-2 text-center py-2 mb-3 bg-light rounded-3">
      <div className="col-4">
        <span className="d-block text-muted small">Bedrooms</span>
        <strong className="text-dark">{prop.bhk || prop.bedrooms || "N/A"}</strong>
      </div>
      <div className="col-4 border-start border-end">
        <span className="d-block text-muted small">Baths</span>
        <strong className="text-dark">{prop.bathrooms || "N/A"}</strong>
      </div>
      <div className="col-4">
        <span className="d-block text-muted small">Carpet</span>
        <strong className="text-dark">
          {prop.carpet_area_sqft ? `${Math.round(prop.carpet_area_sqft)} sqft` : "N/A"}
        </strong>
      </div>
    </div>

    {/* Price Section Inside Body */}
    <div className="mt-auto pt-2">
      <span className="text-muted d-block small">Price</span>
      <h4 className="fw-bold text-success mb-0">
        ₹{Number(prop.price || 0).toLocaleString("en-IN")}
      </h4>
    </div>
  </div>

  {/* Card Footer (Only Button) */}
  <div className="card-footer bg-white border-top p-3 text-end">
    <button 
      className="btn btn-outline-primary btn-sm rounded-pill px-4 fw-semibold w-100"
      onClick={() => navigate(`/properties/${prop.id}`)}
    >
      View Details →
    </button>
  </div>
</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 bg-white rounded-4 border">
                <h4 className="fw-semibold text-muted">No active properties match your filter criteria</h4>
                <button 
                  className="btn btn-link text-primary"
                  onClick={() => setFilters({ locality: "", property_type: "", bhk: "", max_price: "" })}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* RECENTLY SOLD PROPERTIES SECTION (MAX 5, HORIZONTAL SCROLL) */}
        <section className="py-5 bg-light border-top">
          <div className="container px-4">
            <div className="mb-4">
              <h2 className="fw-bold fs-2 mb-1">Recently Sold Properties</h2>
              <p className="text-muted mb-0">Successful deals and completed inventory across prime locations.</p>
            </div>

            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-secondary" role="status"></div>
              </div>
            ) : soldProperties.length > 0 ? (
              <div className="horizontal-scroll-container">
                {soldProperties.map((prop) => (
                  <div className="horizontal-scroll-item" key={prop.id}>
                    <div className="property-card h-100 d-flex flex-column opacity-90">
                      
                      <div className="property-img-wrapper">
                        <img 
                          src="/Images/LandingImage.jpg" 
                          alt={prop.title} 
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/600x400?text=Property+Image";
                          }}
                        />
                        <span className="badge-tag">
                          {prop.bhk || prop.property_type}
                        </span>
                        <span className="badge-status bg-danger text-white">
                          Sold
                        </span>
                      </div>

                      <div className="p-4 d-flex flex-column flex-grow-1">
                        <div className="mb-2">
                          <small className="text-secondary fw-semibold text-uppercase">
                            {prop.project_name || "Standalone"} • {prop.locality || prop.city}
                          </small>
                          <h5 className="fw-bold text-dark mb-1 text-truncate">{prop.title}</h5>
                          <p className="text-muted small mb-3">
                            {truncateWords(prop.description, 5)}
                          </p>
                        </div>

                        {/* Specs grid */}
                        <div className="row g-2 text-center py-2 mb-3 bg-light rounded-3">
                          <div className="col-4">
                            <span className="d-block text-muted small">Bedrooms</span>
                            <strong className="text-dark">{prop.bhk || prop.bedrooms || "N/A"}</strong>
                          </div>
                          <div className="col-4 border-start border-end">
                            <span className="d-block text-muted small">Baths</span>
                            <strong className="text-dark">{prop.bathrooms || "N/A"}</strong>
                          </div>
                          <div className="col-4">
                            <span className="d-block text-muted small">Carpet</span>
                            <strong className="text-dark">
                              {prop.carpet_area_sqft ? `${Math.round(prop.carpet_area_sqft)} sqft` : "N/A"}
                            </strong>
                          </div>
                        </div>

                        <div className="mt-auto d-flex align-items-center justify-content-between pt-2 border-top">
                          <div>
                            <span className="text-muted d-block small">Sold Value</span>
                            <h4 className="fw-bold text-dark mb-0">
                              ₹{Number(prop.price || 0).toLocaleString("en-IN")}
                            </h4>
                          </div>
                          <button 
                            className="btn btn-secondary btn-sm rounded-pill px-3 fw-semibold"
                            onClick={() => navigate(`/properties/${prop.id}`)}
                          >
                            Details →
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 bg-white rounded-4 border">
                <p className="text-muted mb-0">No sold properties available to show at this time.</p>
              </div>
            )}
          </div>
        </section>

        {/* TOP BUILDERS SHOWCASE - NAMES ONLY */}
        <section className="py-5 bg-white border-top border-bottom">
          <div className="container px-4">
            <div className="text-center mb-5">
              <h2 className="fw-bold fs-2 mb-2">Featured Developers & Builders</h2>
              <p className="text-muted">Trusted real estate brands behind premium regional developments.</p>
            </div>

            <div className="row g-3 justify-content-center">
              {builders.length > 0 ? (
                builders.map((builder) => (
                  <div className="col-md-6 col-lg-4" key={builder.id}>
                    <div className="builder-card d-flex align-items-center gap-3">
                      <div 
                        className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold fs-4 flex-shrink-0"
                        style={{ width: "48px", height: "48px" }}
                      >
                        {builder.name ? builder.name.charAt(0) : "B"}
                      </div>
                      <div>
                        <h5 className="fw-bold mb-0 text-dark">{builder.name}</h5>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center text-muted">No developers listed</div>
              )}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="py-5">
          <div className="container px-4 py-4">
            <div className="cta-box text-center text-lg-start">
              <div className="row align-items-center g-4">
                <div className="col-lg-8">
                  <h2 className="fw-bold fs-1 mb-2">Looking for a tailored property consultation?</h2>
                  <p className="text-slate-300 fs-5 mb-0" style={{ color: "#94a3b8" }}>
                    Get in touch with our specialists to schedule site visits or get direct availability updates.
                  </p>
                </div>
                <div className="col-lg-4 text-lg-end">
                  <Link to="/contact" className="btn btn-light rounded-pill px-4 py-3 fw-bold text-dark fs-6 shadow">
                    Book Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
};

export default Home;