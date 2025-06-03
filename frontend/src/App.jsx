import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import UploadSection from "./components/fileUpload";
import UserProfile from "./pages/profile";
import AdvancedAnalytics from "./pages/AdvancedAnalytics/advancedAnalytics";
import RecommendationSystem from "./pages/AdvancedAnalytics/recommendation";
import Contact from "./pages/contact"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/fileUpload" element={<UploadSection/>} />
      <Route path="/dashboard/profile" element={<UserProfile/>} />
      <Route path="/dashboard/advanced-analytics" element={<AdvancedAnalytics/>} />
      <Route path="/dashboard/advanced-analytics/recommendation" element={<RecommendationSystem/>} />
      <Route path="/contact" element={<Contact/>} />
    </Routes>
  );
}
