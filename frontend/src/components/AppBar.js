import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/UserState";
import { useNavigate } from "react-router-dom";
const AppBar = () => {
    const navigate=useNavigate();
    const setuser=useSetRecoilState(userState);
    const logoutHandler=()=>{
        localStorage.removeItem("token");
        setuser({
            userEmail:null
        });
        navigate("/");
    }
    return (<div >
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container-fluid" >
                <Link className="navbar-brand" to="/">Gallery</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to="/photos">All photos</Link>
                        <div className="d-flex">
                            {!localStorage.getItem("token") &&
                                <>
                                    <Link className="btn text-success mx-1" to="/login">login</Link>
                                    <Link className="btn text-success mx-1" to="/signup">Signup</Link>
                                </>
                            }
                            {localStorage.getItem("token") &&<div className="btn text-danger  d-flex " onClick={logoutHandler} >Logout</div>}
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    </div>)
}
export default AppBar;