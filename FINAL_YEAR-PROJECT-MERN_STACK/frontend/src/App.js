// App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ImageUploadForm from "./components/Emptypage";
import ImageList from "./components/viewpage";
import Warenty from "./components/war";
import UserD from "./components/useinfo";
import UserDetail from "./components/profile";
import LogTable from "./components/loginfo";
import UpdateWorkoutForm from "./components/up";
import AlertPage from "./components/alert";
import WorkoutForm from "./components/WorkoutForm";
import Carousel from "./components/Carousel";
import About from "./components/About";
import Desk from "./pages/Desk";
import DisplayData from "./components/Scrap";
import Dis from "./components/totalstock";

function App() {
  const { user } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar setSearchQuery={setSearchQuery} />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={user ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="/Emptypage" element={<ImageUploadForm />} />
            <Route path="/viewpage" element={<ImageList />} />
            <Route path="/war" element={<Warenty />} />
            <Route path="/userinfo" element={<UserD />} />
            <Route path="/pro" element={<UserDetail />} />
            <Route path="/loginfo" element={<LogTable />} />
            <Route path="/update/:id" element={<UpdateWorkoutForm />} />
            <Route path="/alert" element={<AlertPage />} />
            <Route path="/productform" element={<WorkoutForm />} />
            <Route
              path="/products"
              element={<Home searchQuery={searchQuery} />}
            />

            <Route path="/desk" element={<Carousel />} />
            <Route path="/about" element={<About />} />
            <Route path="/desk" element={<Desk />} />
            <Route path="/scrap" element={<DisplayData />} />
            <Route path="/totstock" element={<Dis />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
