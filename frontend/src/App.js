import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SelectRole from './pages/auth/SelectRole';

// Dashboards
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path='/login'
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />

        <Route
          path='/register'
          element={
            <MainLayout>
              <Register />
            </MainLayout>
          }
        />

        <Route
          path='/select-role'
          element={
            <MainLayout>
              <SelectRole />
            </MainLayout>
          }
        />

        {/* Dashboards */}
        <Route
          path='/farmer/dashboard'
          element={
            <DashboardLayout role='Farmer'>
              <FarmerDashboard />
            </DashboardLayout>
          }
        />

        <Route
          path='/buyer/dashboard'
          element={
            <DashboardLayout role='Buyer'>
              <BuyerDashboard />
            </DashboardLayout>
          }
        />

        <Route
          path='/admin/dashboard'
          element={
            <DashboardLayout role='Admin'>
              <AdminDashboard />
            </DashboardLayout>
          }
        />

        {/* Fallback route */}
        <Route
          path='*'
          element={
            <MainLayout>
              <h2>Welcome to FarmConnect</h2>
              <p>Select login or register above.</p>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
