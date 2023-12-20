import { useState } from "react";
import axios from "axios";
import { userState } from "../store/atoms/UserState";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
const Login=()=>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const setUser = useSetRecoilState(userState);
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://gallery-fyvv.onrender.com/user/login", {
                email,
                password,
            });
            let data = response.data;
            localStorage.setItem("token", data.token);
            setUser({
                userEmail: email,
                password
            })
            navigate("/photos");
        }
        catch (e) {
            navigate("/error");
        }
    }
    return (<>
    <div style={{ position: 'relative', opacity: '0.9' }}>
            <img src="https://www.nps.gov/grca/learn/management/images/Hassell-cropped.png" style={{ width: '100vw', height: '100vh', objectFit: 'cover' }} alt="Background" />
            <div style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}>
                <div style={{ display:"flex", justifyContent:"center", marginTop:"40px"}}>
                    <div style={{ color: "white" }}>Welcome Back</div>
                </div>
                <div className="mb-3" style={{ position: "absolute", top: "35%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", color: "white" }}>
                    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => { setEmail(e.target.value) }} />
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => { setPass(e.target.value) }} />
                    <div style={{ marginTop: "5px" }}>
                        <button type="submit" className="btn btn-primary" onClick={submitHandler}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Login;