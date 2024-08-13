import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Login } from "../pages/login";
import { AuthContext } from "../shared/contexts/auth";
import { Task } from "../pages/Task";
import { useContext, useEffect } from "react";

export const AppRoutes = () => {
  const context = useContext(AuthContext)

  const ProtectedRoute = () => {
    if (context.token === "") return <Navigate to='/' replace />

    return <Outlet />
  }

  useEffect(() => {
    if(context.token) ProtectedRoute()
  }, [context.token])
  
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
