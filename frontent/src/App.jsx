import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import Home from "./pages/Home";
//mport Profile from "./pages/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";

function App() {
  const { user } = useContext(AuthContext);
  const allowNavbar = ["/", "/create"];
  const location = useLocation();

  return (
    <>
      {allowNavbar.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route path="/create" element={user ? <CreatePost /> : <Login />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/edit/:id" element={user ? <EditPost /> : <Login />} />
        {/* <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/login" />}
      /> */}
      </Routes>
    </>
  );
}

export default App;
