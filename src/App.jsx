import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MatchOtp from "./pages/MatchOtp";
import ResetPassword from "./pages/ResetPassword";
import UserVerification from "./pages/UserVerification";
import NotFound from "./pages/NotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/matchOtp" element={<MatchOtp />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/verify" element={<UserVerification />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Route>,
    ),
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
