import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navigationbar from "../Components/Navigationbar";
import Footer from "../Components/Footer";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/properties/${id}`);
        const data = res.data?.property || res.data;
        setProperty(data);

        if (data?.images?.length > 0) {
          const primaryImg = data.images.find((img) => img.is_primary) || data.images[0];
          setSelectedImage(primaryImg.image_url);
        }
      } catch (err) {
        console.error("Error fetching property details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container text-center py-5 my-5">
        <h4>Property Details Not Found</h4>
        <button className="btn btn-primary mt-3 rounded-pill" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const {
    title,
    description,
    bhk,
    bedrooms,
    bathrooms,
    carpet_area_sqft,
    built_up_area_sqft,
    floor_number,
    total_floors,
    facing,
    price,
    maintenance_amount,
    parking_spaces,
    furnishing_status,
    availability_status,
    project,
    builder,
    images
  } = property;

  const isSold = availability_status?.toLowerCase() === "sold";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .details-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #0f172a;
          background-color: #f8fafc;
          min-height: 100vh;
          padding-top: 100px;
          padding-bottom: 60px;
        }

        .main-gallery-img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
        }

        .thumb-img {
          width: 80px;
          height: 70px;
          object-fit: cover;
          border-radius: 12px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.2s ease;
        }

        .thumb-img.active {
          border-color: #4f46e5;
        }

        .spec-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 16px;
        }

        .card-custom {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }
      `}</style>

      <div className="details-root">
         <Navigationbar />
        <div className="container">
          <button
            className="btn btn-link text-decoration-none text-muted mb-4 p-0 fw-semibold"
            onClick={() => navigate(-1)}
          >
            ← Back to Properties
          </button>

          <div className="row g-4">
            {/* LEFT COLUMN: Gallery & Overview */}
            <div className="col-lg-8">
              <div className="card-custom mb-4">
                {/* GALLERY */}
                <div className="mb-3 position-relative">
                  <img
                    src={selectedImage || "/Images/LandingImage.jpg"}
                    alt={title}
                    className="main-gallery-img"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/800x500?text=Property+Image";
                    }}
                  />
                  <span
                    className={`badge position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill fs-6 ${
                      isSold ? "bg-danger" : "bg-success"
                    }`}
                  >
                    {availability_status?.toUpperCase() || "AVAILABLE"}
                  </span>
                </div>

                {images && images.length > 1 && (
                  <div className="d-flex gap-2 overflow-auto mb-4 pb-2">
                    {images.map((img) => (
                      <img
                        key={img.id}
                        src={img.image_url}
                        alt="thumbnail"
                        className={`thumb-img ${selectedImage === img.image_url ? "active" : ""}`}
                        onClick={() => setSelectedImage(img.image_url)}
                      />
                    ))}
                  </div>
                )}

                {/* TITLE & LOCATION */}
                <h2 className="fw-bold text-dark mb-1">{title}</h2>
                <p className="text-muted fw-medium mb-3">
                  📍 {project?.locality ? `${project.locality}, ` : ""}
                  {project?.city ? `${project.city}, ` : ""}
                  {project?.state} {project?.pincode ? `- ${project.pincode}` : ""}
                </p>

                {/* QUICK SPECS GRID */}
                <div className="row g-3 my-2">
                  <div className="col-4 col-md-3">
                    <div className="spec-box text-center">
                      <small className="text-muted d-block">Configuration</small>
                      <strong className="fs-6">{bhk || "N/A"}</strong>
                    </div>
                  </div>

                  <div className="col-4 col-md-3">
                    <div className="spec-box text-center">
                      <small className="text-muted d-block">Bathrooms</small>
                      <strong className="fs-6">{bathrooms ?? "N/A"}</strong>
                    </div>
                  </div>

                  <div className="col-4 col-md-3">
                    <div className="spec-box text-center">
                      <small className="text-muted d-block">Floor</small>
                      <strong className="fs-6">
                        {floor_number ? `${floor_number} / ${total_floors || "N/A"}` : "N/A"}
                      </strong>
                    </div>
                  </div>

                  <div className="col-4 col-md-3">
                    <div className="spec-box text-center">
                      <small className="text-muted d-block">Facing</small>
                      <strong className="fs-6">{facing || "N/A"}</strong>
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <hr className="my-4 text-muted opacity-25" />
                <h5 className="fw-bold mb-2">Description</h5>
                <p className="text-secondary leading-relaxed mb-0" style={{ whitespace: "pre-line" }}>
                  {description || "No description provided."}
                </p>
              </div>

              {/* SPECIFICATIONS & DETAILS */}
              <div className="card-custom mb-4">
                <h5 className="fw-bold mb-3">Property Specifications</h5>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <span className="text-muted">Carpet Area:</span>{" "}
                    <strong>{carpet_area_sqft ? `${carpet_area_sqft} sqft` : "N/A"}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="text-muted">Built-up Area:</span>{" "}
                    <strong>{built_up_area_sqft ? `${built_up_area_sqft} sqft` : "N/A"}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="text-muted">Furnishing:</span>{" "}
                    <strong>{furnishing_status || "N/A"}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="text-muted">Parking Spaces:</span>{" "}
                    <strong>{parking_spaces ?? "N/A"}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="text-muted">Maintenance Charge:</span>{" "}
                    <strong>{maintenance_amount ? `₹${maintenance_amount}` : "N/A"}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Price, Project & Builder Info */}
            <div className="col-lg-4">
              {/* PRICE CARD */}
              <div className="card-custom mb-4">
                <small className="text-muted fw-bold text-uppercase d-block mb-1">Total Price</small>
                <h2 className="fw-extrabold text-success mb-3">
                  ₹{Number(price || 0).toLocaleString("en-IN")}
                </h2>

                <button
                  className="btn btn-primary w-100 rounded-pill py-2 fw-semibold mb-2"
                  disabled={isSold}
                >
                  {isSold ? "Property Sold Out" : "Contact Agent"}
                </button>
              </div>

              {/* PROJECT DETAILS */}
              {project && (
                <div className="card-custom mb-4">
                  <h5 className="fw-bold mb-2">{project.name}</h5>
                  <p className="text-muted small mb-3">{project.description}</p>

                  <div className="small">
                    {project.rera_number && (
                      <p className="mb-1">
                        <strong>RERA Reg:</strong> {project.rera_number}
                      </p>
                    )}
                    {project.possession_date && (
                      <p className="mb-0">
                        <strong>Possession:</strong>{" "}
                        {new Date(project.possession_date).toLocaleDateString("en-IN", {
                          month: "short",
                          year: "numeric"
                        })}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* BUILDER DETAILS */}
              {builder && (
                <div className="card-custom">
                  <small className="text-muted fw-bold text-uppercase d-block mb-1">Developer</small>
                  <h6 className="fw-bold text-dark mb-1">{builder.name}</h6>
                  <p className="text-muted small mb-0">{builder.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PropertyDetails;