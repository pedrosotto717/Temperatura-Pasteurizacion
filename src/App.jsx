import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import LoginLogout from "./components/LoginLogout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/style.css";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./components/Dashboard";


function App() {
  
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<LoginLogout />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </div>
  );
}

export default App
