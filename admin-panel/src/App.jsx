import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import DashboardLayout from "./layout/DashboardLayout";
import { AuthProvider } from "./context/AuthContext";
import Services from "./pages/Services";
import PrivateRoute from "./components/PrivateRoute";
import User from "./pages/User";
import Technicians from "./pages/Technicians";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/services"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Services />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <User />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/technicians"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Technicians />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}