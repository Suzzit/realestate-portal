import { useState, useEffect, useContext } from "react";
import { Heart } from "react-bootstrap-icons";
import AuthContext from "../Authcontext";

const properties_ = [
  {
    id: 1,
    title: "Skyline Apartment",
    address: "903 Marine Drive, Mumbai",
    price: "₹1.89 Cr",
    type: "Apartment",
    beds: 3,
    baths: 2,
    area: 1850,
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
  },
  {
    id: 2,
    title: "Verdant Villa",
    address: "22 Juhu Tara Road, Mumbai",
    price: "₹5.50 Cr",
    type: "Villa",
    beds: 5,
    baths: 4,
    area: 4800,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    id: 3,
    title: "Ivory Studio Loft",
    address: "7B Pali Hill Road, Khar",
    price: "₹87.5 L",
    type: "Studio",
    beds: 1,
    baths: 1,
    area: 720,
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
  },
];

export default function BrowsePage() {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([])
  const [savedFav, setSavedFav] = useState([])

  function fetchProperties() {
    fetch(`/api/properties/list/${user.id}`)
    .then(function(res) {
      return res.json()
    })
    .then(function(data) {
      setProperties(data)
    })
  }

  function handleSave(id) {
    fetch(`/api/favourite/add/${id}/${user.id}`)
    .then((response) => {
      return response.json()
    })
    .then(function(jsonData) {
      setSavedFav([...savedFav, jsonData.message])
    })
  }

  useEffect(function() {
    if(user.id) {
      fetchProperties()
    }
  }, [user, savedFav])
  return (
    <div className="container py-5">
      <div className="row g-4">
        {properties.map((p) => (
          <div className="col-md-4" key={p.id}>
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              <div style={{ position: "relative" }}>
                <img src={p.image_url} className="card-img-top" alt={p.title} style={{ height: 200, objectFit: "cover" }} />
                <span className="badge bg-primary position-absolute top-0 start-0 m-2">{p.type}</span>
                <button
                  className="btn btn-light btn-md rounded-circle position-absolute top-0 end-0 m-2"
                  onClick={() => {handleSave(p.id)}}
                >
                  <Heart />
                </button>
              </div>

              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="card-title fw-bold mb-0">{p.title}</h5>
                  <span className="text-primary fw-bold fs-6">{p.price}</span>
                </div>
                <p className="text-muted small mt-1">
                  <i className="bi bi-geo-alt-fill me-1"></i>{p.address}
                </p>

                <hr />

                <div className="d-flex justify-content-between text-muted small">
                  <span><i className="bi bi-door-open me-1"></i>{p.beds} Beds</span>
                  <span><i className="bi bi-droplet me-1"></i>{p.baths} Baths</span>
                  <span><i className="bi bi-aspect-ratio me-1"></i>{p.area} sqft</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}