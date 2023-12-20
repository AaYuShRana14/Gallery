import { useState } from "react";
import axios from "axios";
import { userState } from "../store/atoms/UserState";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const setUser = useSetRecoilState(userState);
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://gallery-fyvv.onrender.com/signup", {
                email,
                password,
            });
            let data = response.data;
            localStorage.setItem("token", data.token);
            setUser({
                userEmail: email,
                password,
            })
            navigate("/photos");
        }
        catch (e) {
            navigate("/error");
        }
    }
    return (
        <div style={{ position: 'relative', opacity: '0.9' }}>
            <img src="https://www.euroschoolindia.com/blogs/wp-content/uploads/2023/10/northern-lights-causes.jpg" style={{ width: '100vw', height: '100vh', objectFit: 'cover' }} alt="Background" />
            <div style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}>
                <div style={{ display:"flex", justifyContent:"center", marginTop:"40px"}}>
                    <div style={{ color: "white" }}>Sign up</div>
                </div>
                <div className="mb-3" style={{ position: "absolute", top: "35%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", color: "white" }}>
                    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => { setEmail(e.target.value) }} />
                    <div id="emailHelp" className="form-text" style={{ color: "#000814" }}>We'll never share your email with anyone else.</div>
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => { setPass(e.target.value) }} />
                    <div style={{ marginTop: "5px" }}>
                        <button type="submit" class="btn btn-primary" onClick={submitHandler}>Submit</button>
                    </div>
                </div>
            </div>
        </div>)
}
export default Signup;