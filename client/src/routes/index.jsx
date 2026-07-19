import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../context/AuthContext';
import { SettingsProvider } from '../context/SettingsContext';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import AppLayout from '../components/layout/AppLayout';

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import DashboardPage from '../pages/DashboardPage';
import InquiriesPage from '../pages/InquiriesPage';
import CreateInquiryPage from '../pages/CreateInquiryPage';
import EditInquiryPage from '../pages/EditInquiryPage';
import InquiryDetailPage from '../pages/InquiryDetailPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import SettingsPage from '../pages/SettingsPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1f1f21',
              color: '#f1f1f1',
              border: '1px solid rgba(255,255,255,0.08)',
              fontSize: '13px',
              borderRadius: '8px',
            },
            success: { iconTheme: { primary: '#22c55e', secondary: '#1f1f21' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#1f1f21' } },
          }}
        />

        <Routes>
          {/* Public (Guest Only) */}
          <Route element={<PublicRoute><Outlet /></PublicRoute>}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route path="/inquiries/create" element={<CreateInquiryPage />} />

          {/* Protected */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/inquiries" element={<InquiriesPage />} />
            <Route path="/inquiries/:id" element={<InquiryDetailPage />} />
            <Route path="/inquiries/:id/edit" element={<EditInquiryPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
