import { Link } from "react-router-dom";
const Home = () => {
    let backurl = "https://www.ionos.co.uk/digitalguide/fileadmin/DigitalGuide/Teaser/instagram-fuer-unternehmen-t.jpg";
    return (
        <div style={{ position: 'relative', opacity: '0.9' }}>
            <img src={backurl} style={{ width: '100vw', height: '100vh', objectFit: 'cover' }} alt="Background" />
            <div class="card" style={{ position: 'absolute', top: "10%", left: 0, color: 'black', fontSize: '16px', background: '#fefae0', width: "43vh", margin: "auto" }}>
                <h3 class="card-header">Keep your memories close</h3>
                <div class="card-body"  >
                    <h2 class="card-title">Exploring Moments: A Visual Symphony of Memories Captured in Every Frame 📷✨</h2>
                    <p class="card-text">With great people/places comes great pictures</p>
                    {
                        !localStorage.getItem("token") && 
                        <Link to="/signup" class="btn btn-primary">Join now</Link>
                    }
                </div>
            </div>
        </div>
    )
}
export default Home;
