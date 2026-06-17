import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Episode1Page from "./pages/Episode1Page";
import Episode2Page from "./pages/Episode2Page";
import Episode3Page from "./pages/Episode3Page";
import Episode4Page from "./pages/Episode4Page";
import Episode5Page from "./pages/Episode5Page";
import Episode6Page from "./pages/Episode6Page";
import GenericEpisodePage from "./pages/GenericEpisodePage";
import TopPickProudPage from "./pages/TopPickProudPage";
import TopPickPrayPage from "./pages/TopPickPrayPage";
import TopPickSpecialPage from "./pages/TopPickSpecialPage";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/top-pick/proud" element={<TopPickProudPage />} />
          <Route path="/top-pick/pray" element={<TopPickPrayPage />} />
          <Route path="/top-pick/special" element={<TopPickSpecialPage />} />
          <Route path="/episode/1" element={<Episode2Page />} />
          <Route path="/episode/2" element={<Episode1Page />} />
          <Route path="/episode/3" element={<Episode3Page />} />
          <Route path="/episode/4" element={<Episode4Page />} />
          <Route path="/episode/5" element={<Episode5Page />} />
          <Route path="/episode/6" element={<Episode6Page />} />
          <Route path="/episode/:number" element={<GenericEpisodePage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
