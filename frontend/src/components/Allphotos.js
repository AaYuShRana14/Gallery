import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ErrorPage from "./ErrorPage";
import Card from "./Card";
const Allphotos = () => {
  const [imgs, setImgs] = useState([]);
  const navigate = useNavigate();
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/signup');
    }
  }, [navigate]);
  useEffect(() => {
    document.body.style.overflow = 'scroll';

    // Cleanup: Set body overflow back to 'auto' when the component unmounts
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, []);
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dli5g7kbs",
        uploadPreset: "ltcyvgkv",
      },
      function (err, result) {
        if (result && result.event === "success" && result.info.secure_url) {
          const apiUrl = 'http://localhost:3000/upload';
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
          };
          const imgLink = result.info.secure_url;

          const postImage = async () => {
            try {
              await axios.post(apiUrl, { img: imgLink }, { headers: headers });
              console.log("Image uploaded successfully");
              // Fetch images again after uploading
              fetchImages();
            } catch (error) {
              console.error("Error uploading image:", error);

            }
          };

          if (localStorage.getItem("token")) {
            postImage();
          }
        }
      }
    );
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchImages();
    }
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:3000/photos', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        }
      });
      const data = res.data;
      setImgs(data.images);
      console.log(data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
      <ErrorPage></ErrorPage>
    }
  };

  return (
    <>
      <div style={{display:"flex",justifyContent:"center" ,alignContent:"center"}}>
        <button  className="btn btn-success" onClick={() => { widgetRef.current.open() }}>Upload</button>
        
      </div>
      {imgs.length > 0 && imgs.map(img => (
        <Card img={img}></Card>
      ))}
      {imgs.length ===0 && <div style={{display:"flex",justifyContent:"center" ,alignContent:"center"}} >No images yet</div>
      }

    </>);
}
export default Allphotos;