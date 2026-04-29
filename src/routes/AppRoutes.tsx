import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Profile from '@/pages/Profile';
import TicketHistory from '@/pages/TicketHistory';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsAndConditions from '@/pages/TermsAndConditions';
import FAQ from '@/pages/FAQ';
import Login from '@/pages/Login';
import ForgotPassword from '@/pages/ForgotPassword';
import ProtectedRoute from '@/components/ProtectedRoute';
import Unauthorized from '@/pages/Unauthorized';
import MonthWisePhasing from '@/pages/MonthWisePhasing';
import MonthWisePhasingView from '@/pages/MonthWisePhasingView';
import CPAppointment from '@/pages/CPAppointment';
import CPWiseBudgeting from '@/pages/CPWiseBudgeting';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route
          path="/month-wise-phasing"
          element={<MonthWisePhasing />}
        ></Route>
        <Route
          path="/month-wise-phasing-view"
          element={<MonthWisePhasingView />}
        ></Route>
        <Route path="/cp-appointment" element={<CPAppointment />}></Route>
        <Route path="/cp-wise-budgeting" element={<CPWiseBudgeting />}></Route>

        <Route path="/profile" element={<Profile />} />

        <Route path="/ticket-history" element={<TicketHistory />} />

        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<FAQ />} />
      </Route>

      <Route path="*" element={<NotFound />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default AppRoutes;
