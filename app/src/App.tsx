import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { BilingualHomePage } from "./pages/BilingualHomePage";
import { BilingualLoginPage } from "./pages/BilingualLoginPage";
import { LandingPage } from "./pages/LandingPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { BilingualProjectDetailPage } from "./pages/BilingualProjectDetailPage";
export default function App() { return <BrowserRouter><AppShell><Routes><Route path="/" element={<LandingPage />} /><Route path="/projects" element={<BilingualHomePage />} /><Route path="/projects/:id" element={<BilingualProjectDetailPage />} /><Route path="/login" element={<BilingualLoginPage />} /><Route path="/register" element={<RegistrationPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></AppShell></BrowserRouter>; }
