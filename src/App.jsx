import { Routes, Route, Navigate } from "react-router-dom";
import "./css/Normalize.css";
import "./css/Style.css";
import Home from "./screens/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";  

function App() {
  return (
    <>
      {/* <Header /> */} {/* dev */}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/footer" element={<Footer />} /> {/* dev */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      {/* <Footer /> */} {/* dev */}
    </>
  );
}

export default App;
