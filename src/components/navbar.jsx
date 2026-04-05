import AuthContext from "../Authcontext"
import { useContext } from "react"
import { PersonCircle, DoorOpenFill } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate()
    const { user, onLogout } = useContext(AuthContext);

    function handleLogout() {
      fetch('/api/logout')
      .then(function(response) {
        return response.json()
      })
      .then(function(data) {
        onLogout()
        navigate('/', {replace: true})
      })
    }
    return (
      <nav className="navbar px-5">
        <div className="left">
          <span className="navbar-brand fw-bold fs-4">
             <Link to="/">XYZ estate</Link>
          </span>
        </div>

        <div className="mid">
          <Link className="btn btn-link me-1" to="/browse">Browse</Link>
        </div>

        <div className="right">
          {user && user.name &&
            <Link to={`/profile/${user.id}`}>
              <PersonCircle />
              Hi, {user.name}
            </Link>
          }

          {user.name &&
            <>
              <button className="btn btn-sm" onClick={handleLogout}>
                <DoorOpenFill color="red" />
              </button>
            </>
          }
        </div>
      </nav>
    )
  }