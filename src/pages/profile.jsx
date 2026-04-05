import { useContext, useEffect, useState } from "react";
import { Container, Card, Button, Badge, Stack, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../Authcontext";
import FavouritePage from "./favourites";

const ProfilePage = () => {
    const { user } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState(null)

    function fetchUser() {
        fetch(`/api/user/${user.id}`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setUserInfo(data)
            })
    }

    useEffect(() => {
        if (user.id) {
            fetchUser()
        }
    }, [user])

    return (
        <>
            <Container>
                <Card className="shadow-sm">
                    <Card.Body className="text-center pt-4">
                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-white fw-bold fs-4"
                            style={{
                                width: 80,
                                height: 80,
                                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            }}
                        >
                            {userInfo && userInfo.name
                                .split(" ")
                                .map((n) => n[0].toUpperCase())
                                .join("")}
                        </div>

                        <Card.Title className="mb-0">{userInfo && userInfo.name}</Card.Title>
                        <Card.Subtitle className="text-muted mb-1">{userInfo && userInfo.email}</Card.Subtitle>
                        <small className="text-muted">
                            Status: {userInfo && userInfo.is_active ? "Active" : "Inactive"} |{" "}
                            {userInfo && userInfo.is_verified ? "Verified" : "Not Verified"}
                        </small>

                        <Card.Text className="mt-3 text-muted small">
                            Created at: {new Date(userInfo && userInfo.created_at).toLocaleDateString()} <br />
                            Last login: {userInfo && userInfo.last_login_at ? new Date(userInfo && userInfo.last_login_at).toLocaleString() : "N/A"}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>

            <FavouritePage />
        </>
    );
};

export default ProfilePage;