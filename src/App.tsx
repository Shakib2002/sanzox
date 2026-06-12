import { BrowserRouter } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { AnimatedRoutes } from "@/components/AnimatedRoutes";
import { CursorFollower } from "@/components/ui/CursorFollower";
import { Preloader } from "@/components/ui/Preloader";
import { SupportWidgets } from "@/components/support/SupportWidgets";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { NewPreloader } from "./components/ui/NewPreloader";
import ScrollToTop from "./components/ui/ScrollToTop";

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <TooltipProvider>
          {/* <CursorFollower /> */}
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <NewPreloader />
            <ScrollToTop />
            <AnimatedRoutes />
            <SupportWidgets
              whatsappNumber="8801516522978"
              whatsappMessage="Hi! I'm interested in your services."
            />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;