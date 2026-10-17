import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Dashboard from './Pages/Dashboard';
import MyTokens from './Pages/MyTokens';
import ServiceQueue from './Pages/ServiceQueue';
import AdminDashboard from './Pages/AdminDashboard';
import StaffDashboard from './Pages/StaffDashboard';
import './styles/globals.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tokens" element={<MyTokens />} />
          <Route path="/service/:id" element={<ServiceQueue />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/staff" element={<StaffDashboard />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
