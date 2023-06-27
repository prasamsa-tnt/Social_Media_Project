import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  // const user=false;

  // const navigate = useNavigate();
  return (
    <div className="App">
      {/* <Login/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          {/* <Route path="/" element={ <Home />} /> */}

          <Route path="/login"
            element={
              user ?
                <Navigate to="/" replace={true} />
                : <Login />} />

          <Route path="/messenger"
            element={
              !user ?
                <Navigate to="/" replace={true} />
                : <Messenger />} />

          <Route path="/register"
            element={
              user ?
                <Navigate to="/" replace={true} />
                : <Register />} />
          <Route path="/profile/:username" element={user ? <Profile /> : <Navigate to="/" replace={true} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
