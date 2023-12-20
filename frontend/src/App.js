import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AppBar from "./components/AppBar";
import Signup from "./components/Signup";
import Allphotos from "./components/Allphotos";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
function App() {
  return (
    <BrowserRouter>
      <AppBar></AppBar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/photos" element={<Allphotos></Allphotos>}></Route>
        <Route path="/error" element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
