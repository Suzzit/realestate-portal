import { useState, useEffect, useContext } from "react";
import { HeartFill, BookmarkCheck, BookFill, BookmarkFill, BookmarkStar, BookmarkStarFill } from "react-bootstrap-icons";
import AuthContext from "../Authcontext";

export default function FavouritePage() {
    const { user } = useContext(AuthContext);
    const [favProperties, setFavProperties] = useState([])
    const [deleteFavMessages, setDeleteFavMessages] = useState([])

    function fetchFavProperties() {
        fetch(`/api/properties/favourites/${user.id}`)
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                setFavProperties(data)
            })
    }

    function removeFav(fav_id) {
        console.log(fav_id)
        fetch(`/api/favourites/remove/${user.id}`, {
            method: 'DELETE',
            body: JSON.stringify({'fav_id': fav_id}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((jsonData) => {
            console.log(jsonData)
            setDeleteFavMessages([...deleteFavMessages, jsonData.message])
        })
    }

    useEffect(function () {
        if (user.id) {
            console.log('now this run')
            fetchFavProperties()
        }
    }, [user, deleteFavMessages])
    return (
        <div className="container py-5">
            <h4> <BookmarkStarFill color="gold" /> Saved Properties </h4>
            <div className="row g-4">
                {favProperties.map((p) => (
                    <div className="col-md-4" key={p.id}>
                        <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                            <div style={{ position: "relative" }}>
                                <img src={p.image_url} className="card-img-top" alt={p.title} style={{ height: 200, objectFit: "cover" }} />
                                <span className="badge bg-primary position-absolute top-0 start-0 m-2">{p.type}</span>
                                <button
                                    className="btn btn-light btn-md rounded-circle position-absolute top-0 end-0 m-2"
                                >
                                    <HeartFill color="red" onClick={() => {removeFav(p.fav_id)}} />
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