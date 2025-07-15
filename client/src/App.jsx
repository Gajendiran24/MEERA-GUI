import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RegisterStepper from "./components/RegisterStepper";
import Login from "./components/Login";
import UserDashboard from "./components/Dashboards/UserDashboard";
import CaretakerDashboard from "./components/Dashboards/CaretakerDashboard";
import DoctorDashboard from "./components/Dashboards/DoctorDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterStepper />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboards */}
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/caretaker" element={<CaretakerDashboard />} />
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;