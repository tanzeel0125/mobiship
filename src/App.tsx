import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import EnableLocation from "./pages/EnableLocation";
import Home from "./pages/Home";
import Ship from "./pages/Ship";
import UseImages from "./pages/UseImages";
import ReviewOrder from "./pages/ReviewOrder";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import AddToWallet from "./pages/AddToWallet";
import FindLocation from "./pages/FindLocation";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import RequestRefund from "./pages/RequestRefund";
import Track from "./pages/Track";
import Return from "./pages/Return";
import Account from "./pages/Account";
import Addresses from "./pages/Addresses";
import Billing from "./pages/Billing";
import Preferences from "./pages/Preferences";
import Notifications from "./pages/Notifications";
import Referrals from "./pages/Referrals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enable-location" element={<EnableLocation />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ship" element={<Ship />} />
          <Route path="/ship/use-images" element={<UseImages />} />
          <Route path="/ship/review" element={<ReviewOrder />} />
          <Route path="/ship/payment" element={<Payment />} />
          <Route path="/ship/confirmation" element={<Confirmation />} />
          <Route path="/ship/add-to-wallet" element={<AddToWallet />} />
          <Route path="/find-location" element={<FindLocation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/orders/:id/refund" element={<RequestRefund />} />
          <Route path="/track" element={<Track />} />
          <Route path="/return" element={<Return />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/addresses" element={<Addresses />} />
          <Route path="/account/billing" element={<Billing />} />
          <Route path="/account/preferences" element={<Preferences />} />
          <Route path="/account/notifications" element={<Notifications />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
