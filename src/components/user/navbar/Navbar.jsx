import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faUser, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import style from "./Navbar.module.css";


export default function Navbar({isLogin , userData , setIsLogin , setUserData}) {
  const navigate = useNavigate();
  function handelLogout(){
    localStorage.removeItem("userToken");
    setIsLogin(false);
    setUserData({});
    navigate('/login');
  }
  return (
<nav 
  className="navbar navbar-expand-lg py-2" 
  style={{ 
    backgroundColor: "#B89F7A", 
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" 
  }}
>
  <div className="container d-flex align-items-center">
    <div className="d-flex align-items-center gap-1">
    <FontAwesomeIcon icon={faStore} style={{color: "#318c37",fontSize: '30px',marginRight: '5px'}} />
        <a 
        className="navbar-brand" 
        href="#" 
        style={{ 
          fontSize: "1.5rem", 
          fontWeight: "bold", 
          color: "#ffffff" 
        }}
      >
        E-Market
      </a>
    </div>
    <button 
      className="navbar-toggler" 
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#navbarNav" 
      aria-controls="navbarNav" 
      aria-expanded="false" 
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-auto fw-bold">
        <li className="nav-item">
          <Link 
            className="nav-link active" 
            aria-current="page" 
            to={'/'} 
            style={{ 
              fontSize: "1.2rem", 
              color: "#5B4E47 ", 
              transition: "color 0.3s ease" 
            }}
            onMouseEnter={(e) => e.target.style.color = "white"} 
            onMouseLeave={(e) => e.target.style.color = "#5B4E47 "}
          >
            Home
          </Link>
        </li>
        {isLogin && (
          <li className="nav-item" style={{ display: 'flex', alignItems: 'center', marginLeft: "10px" }}>
            <span 
              style={{ 
                fontSize: "1.2rem", 
                color: "#5B4E47 ", 
                marginRight: "10px",
                transition: "color 0.3s ease" 
              }}
            >
              Welcome {userData.userName}
            </span>
          </li>
        )}
        <li className="nav-item">
          <Link 
            className="nav-link" 
            to={'/products'} 
            style={{ 
              fontSize: "1.2rem", 
              color: "#5B4E47 ", 
              transition: "color 0.3s ease" 
            }}
            onMouseEnter={(e) => e.target.style.color = "white"} 
            onMouseLeave={(e) => e.target.style.color = "#5B4E47 "}
          >
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            className="nav-link" 
            to={'/categories'} 
            style={{ 
              fontSize: "1.2rem", 
              color: "#5B4E47 ", 
              transition: "color 0.3s ease" 
            }}
            onMouseEnter={(e) => e.target.style.color = "white"} 
            onMouseLeave={(e) => e.target.style.color = "#5B4E47 "}
          >
            Categories
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav ms-auto">
        {isLogin ? (
          <>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to={'/profile'} 
                style={{ 
                  fontSize: "1.2rem", 
                  color: "#2F3E46", 
                  transition: "color 0.3s ease" 
                }}
                onMouseEnter={(e) => e.target.style.color = "white"} 
                onMouseLeave={(e) => e.target.style.color = "#2F3E46"}
              >
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to={'/cart'} 
                style={{ 
                  fontSize: "1.2rem", 
                  color: "#2F3E46", 
                  transition: "color 0.3s ease" 
                }}
                onMouseEnter={(e) => e.target.style.color = "white"} 
                onMouseLeave={(e) => e.target.style.color = "#2F3E46"}
              >
                <FontAwesomeIcon icon={faShoppingBag} />
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                onClick={handelLogout} 
                style={{ 
                  fontSize: "1.2rem", 
                  color: "#2F3E46", 
                  transition: "color 0.3s ease" 
                }}
                onMouseEnter={(e) => e.target.style.color = "white"} 
                onMouseLeave={(e) => e.target.style.color = "#2F3E46"}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <li className="nav-item dropdown">
            <a 
              className="nav-link dropdown-toggle" 
              href="#" 
              role="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false" 
              style={{ 
                fontSize: "1.2rem", 
                color: "#2F3E46", 
                transition: "color 0.3s ease" 
              }}
              onMouseEnter={(e) => e.target.style.color = "white"} 
              onMouseLeave={(e) => e.target.style.color = "#2F3E46"}
            >
              Account
            </a>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={'/register'}>Register</Link>
              </li>
              <li>
                <Link className="dropdown-item" to={'/login'}>Login</Link>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </div>
  </div>
</nav>
  )
}

