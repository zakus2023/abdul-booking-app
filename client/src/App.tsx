
import ThemeProvider from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/private/home";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ProfilePage from "./pages/private/profile";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLaout from "./layouts/PrivateLaout";
import Events from "./pages/private/admin/events";
import EditEventsPage from "./pages/private/admin/events/edit";
import CreateEventsPage from "./pages/private/admin/events/create";
import EventInfoPage from "./pages/private/admin/event";
import UserBookings from "./pages/private/profile/bookings/user-bookings";
import AdminBookings from "./pages/private/admin/allbookings";
import UsersPage from "./pages/private/admin/allusers";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicLayout>
                <LoginPage />
              </PublicLayout>
            }
          />
          <Route
            path="/register"
            element={
              <PublicLayout>
                <RegisterPage />
              </PublicLayout>
            }
          />
          <Route
            path="/"
            element={
              <PrivateLaout>
                <HomePage />
              </PrivateLaout>
            }
          />
          <Route
            path="/event/:id"
            element={
              <PrivateLaout>
                <EventInfoPage />
              </PrivateLaout>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateLaout>
                <ProfilePage />
              </PrivateLaout>
            }
          />
          <Route
            path="/profile/bookings"
            element={
              <PrivateLaout>
                <UserBookings />
              </PrivateLaout>
            }
          />
           <Route
            path="/admin/bookings"
            element={
              <PrivateLaout>
                <AdminBookings />
              </PrivateLaout>
            }
          />
          <Route
            path="/admin/events"
            element={
              <PrivateLaout>
                <Events />
              </PrivateLaout>
            }
          />
          <Route
            path="/admin/events/edit/:id"
            element={
              <PrivateLaout>
                <EditEventsPage />
              </PrivateLaout>
            }
          />
          <Route
            path="/admin/events/create"
            element={
              <PrivateLaout>
                <CreateEventsPage />
              </PrivateLaout>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateLaout>
                <UsersPage />
              </PrivateLaout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
