import HomePage from "./components/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import Particle from "./components/HomePage/Particles";
import Signup from "./components/Signup/Signup";
import SignupSuccess from "./components/Signup/SignupSuccess";
import Dashboard from "./components/userPages/dashboard";
import Playlists from "./components/Playlists/Playlists";
import TMLInfo from "./components/TMLInfo/TMLInfo";
import FriendsGroup from "./components/FriendGroups/FriendsGroup";
import axios from "axios";
import { AuthProvider } from "./config/AuthContext";
import GroupPage from "./components/FriendGroups/GroupPage";
axios.defaults.baseURL = "http://localhost:3500";
axios.defaults.withCredentials = true;

function AppContent() {
  return (
    <div className="App">
      <div className="z-0">
        <Particle />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/SignupSuccess" element={<SignupSuccess />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Playlists" element={<Playlists />} />
        <Route path="/groups" element={<FriendsGroup />} />
        <Route path="/group/:groupName" element={<GroupPage />} />
        <Route path="/TMLInfo" element={<TMLInfo />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
