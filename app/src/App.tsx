import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
export default function App() { return <BrowserRouter><AppShell><Routes><Route path="/" element={<HomePage />} /><Route path="/projects/:id" element={<ProjectDetailPage />} /><Route path="/login" element={<LoginPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></AppShell></BrowserRouter>; }
