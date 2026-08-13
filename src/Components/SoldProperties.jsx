import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigationbar from "../Components/Navigationbar";
import Footer from "../Components/Footer";
import API from "../api/axios";

const SoldProperties = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [filters, setFilters] = useState({
    search: "",
    locality: "",
    property_type: "",
    bhk: "",
    max_price: ""
  });

  useEffect(() => {
    const fetchSoldProperties = async () => {
      setLoading(true);
      try {
        const res = await API.get("/properties");
        const rawData = res.data?.properties || res.data || [];

        // Strictly filter sold properties
        const soldList = rawData.filter(
          (item) => item.availability_status?.toLowerCase() === "sold"
        );

        setProperties(soldList);
      } catch (err) {
        console.error("Error fetching sold properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSoldProperties();
  }, []);

  const truncateWords = (str, limit = 5) => {
    if (!str) return "";
    const words = str.trim().split(/\s+/);
    if (words.length <= limit) return str;
    return words.slice(0, limit).join(" ") + "...";
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      !filters.search ||
      p.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.project_name?.toLowerCase().includes(filters.search.toLowerCase());

    const matchesLocality =
      !filters.locality ||
      p.locality?.toLowerCase().includes(filters.locality.toLowerCase()) ||
      p.address?.toLowerCase().includes(filters.locality.toLowerCase()) ||
      p.city?.toLowerCase().includes(filters.locality.toLowerCase());

    const matchesType =
      !filters.property_type ||
      p.project_property_type?.toLowerCase() === filters.property_type.toLowerCase() ||
      p.property_type?.toLowerCase() === filters.property_type.toLowerCase();

    const matchesBhk = (() => {
      if (!filters.bhk) return true;
      const targetVal = p.bhk || p.bedrooms;
      if (filters.bhk === "3 BHK +") {
        const numVal = parseInt(targetVal, 10);
        return !isNaN(numVal) && numVal >= 3;
      }
      return String(targetVal || "")
        .toLowerCase()
        .includes(filters.bhk.toLowerCase());
    })();

    const matchesPrice =
      !filters.max_price || Number(p.price) <= Number(filters.max_price);

    return (
      matchesSearch &&
      matchesLocality &&
      matchesType &&
      matchesBhk &&
      matchesPrice
    );
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .properties-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #0f172a;
          background-color: #f8fafc;
          min-height: 100vh;
          padding-top: 90px;
        }

        .filter-header-card {
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.05);
          padding: 24px;
        }

        .custom-field-input {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 0.9rem;
          font-weight: 600;
          width: 100%;
          outline: none;
          transition: all 0.2s ease;
        }

        .custom-field-input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
        }

        .property-card {
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          background: #ffffff;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .property-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 30px -10px rgba(15, 23, 42, 0.12);
        }

        .property-img-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
          background-color: #e2e8f0;
        }

        .property-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          filter: grayscale(20%);
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
          text-transform: uppercase;
        }
      `}</style>

      <div className="properties-root">
        <Navigationbar />

        <div className="container px-4 py-4">
          <div className="mb-4">
            <h1 className="fw-bold fs-2 mb-1 text-danger">Sold Out Properties</h1>
            <p className="text-muted">
              Explore historical records and delivered real estate inventory.
            </p>
          </div>

          {/* FILTERS */}
          <div className="filter-header-card mb-5">
            <div className="row g-3">
              <div className="col-md-6 col-lg-3">
                <label className="form-label small fw-bold text-muted">Search Title / Project</label>
                <input
                  type="text"
                  name="search"
                  className="custom-field-input"
                  placeholder="e.g. Lodha Crown"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="col-md-6 col-lg-3">
                <label className="form-label small fw-bold text-muted">Locality / City</label>
                <input
                  type="text"
                  name="locality"
                  className="custom-field-input"
                  placeholder="e.g. Mira Road"
                  value={filters.locality}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="col-md-4 col-lg-2">
                <label className="form-label small fw-bold text-muted">Property Type</label>
                <select
                  name="property_type"
                  className="form-select custom-field-input"
                  value={filters.property_type}
                  onChange={handleFilterChange}
                >
                  <option value="">All Types</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="plot">Plot</option>
                </select>
              </div>

              <div className="col-md-4 col-lg-2">
                <label className="form-label small fw-bold text-muted">Config (BHK)</label>
                <select
                  name="bhk"
                  className="form-select custom-field-input"
                  value={filters.bhk}
                  onChange={handleFilterChange}
                >
                  <option value="">Any BHK</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="3 BHK +">3 BHK +</option>
                </select>
              </div>

              <div className="col-md-4 col-lg-2">
                <label className="form-label small fw-bold text-muted">Max Price</label>
                <select
                  name="max_price"
                  className="form-select custom-field-input"
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
          </div>

          {/* GRID */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-danger" role="status"></div>
              <p className="mt-2 text-muted fw-semibold">Loading sold inventory...</p>
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="row g-4 mb-5">
              {filteredProperties.map((prop) => (
                <div className="col-md-6 col-lg-4" key={prop.id}>
                  <div className="property-card h-100 d-flex flex-column">
                    <div className="property-img-wrapper">
                      <img
                        src="/Images/LandingImage.jpg"
                        alt={prop.title}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/600x400?text=Property+Image";
                        }}
                      />
                      <span className="badge-tag">
                        {prop.bhk ? `${prop.bhk} BHK` : prop.project_property_type || prop.property_type}
                      </span>
                      <span className="badge-status bg-danger text-white">
                        SOLD OUT
                      </span>
                    </div>

                    <div className="p-4 d-flex flex-column flex-grow-1">
                      <div className="mb-2">
                        <small className="text-danger fw-semibold text-uppercase">
                          {prop.project_name || "Standalone"} • {prop.locality || prop.city}
                        </small>
                        <h5 className="fw-bold text-dark mb-1 text-truncate">{prop.title}</h5>
                        <p className="text-muted small mb-3">
                          {truncateWords(prop.description, 5)}
                        </p>
                      </div>

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
                          <span className="text-muted d-block small">Sold At</span>
                          <h4 className="fw-bold text-dark mb-0">
                            ₹{Number(prop.price || 0).toLocaleString("en-IN")}
                          </h4>
                        </div>
                        <button
                          className="btn btn-outline-secondary btn-sm rounded-pill px-3 fw-semibold"
                          onClick={() => navigate(`/properties/${prop.id}`)}
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 bg-white rounded-4 border">
              <h4 className="fw-semibold text-muted mb-2">No sold properties found matching criteria</h4>
              <button
                className="btn btn-secondary rounded-pill px-4"
                onClick={() =>
                  setFilters({ search: "", locality: "", property_type: "", bhk: "", max_price: "" })
                }
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default SoldProperties;