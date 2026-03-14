import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";

import Landing from "./Pages/Landing";
import Marketplace from "./Pages/MarketPlace";
import PropertyDetails from "./Pages/PropertyDetails";
import Dashboard from "./Pages/Dashboard";
import Auth from "./Pages/Auth";
import FundedProjects from "./Pages/FundedProjects";
import Login from "./Pages/Login";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>

          {/* Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Marketplace */}
          <Route path="/marketplace" element={<Marketplace />} />

          {/* Property Details */}
          <Route path="/property/:id" element={<PropertyDetails />} />

          {/* Authentication */}
          <Route path="/auth" element={<Auth />} />

           {/* FundedProjects */}
           <Route path="funded-projects" element={<FundedProjects />} />

           {/* Dashboard */}
           <Route path="dashboard" element={<Dashboard />} />

           {/* Login */}
           <Route path="login" element={<Login />} />

         
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;