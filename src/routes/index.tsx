import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Login } from "../pages/login";
import { AuthContext } from "../shared/contexts/auth";
import { Task } from "../pages/Task";
import { useContext } from "react";

const ProtectedRoute = () => {
    const context = useContext(AuthContext)

    if (!context.authenticated) return <Navigate to='/' replace />

    return <Outlet />
}

export const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/task" element={<Task />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
};
