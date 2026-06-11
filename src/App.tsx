import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
<<<<<<< HEAD
            <NewPreloader onLoadComplete={() => setIsLoaded(true)} />
            {isLoaded && (
              <>
                {/* <CursorFollower /> */}
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <ScrollToTop/>
                  <AnimatedRoutes />
                  <SupportWidgets 
                    whatsappNumber="8801516522978"
                    whatsappMessage="Hi! I'm interested in your services."
                  />
                </BrowserRouter>
              </>
            )}
=======
            <NewPreloader />
            <CursorFollower />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop/>
              <AnimatedRoutes />
              <SupportWidgets 
                whatsappNumber="8801516522978"
                whatsappMessage="Hi! I'm interested in your services."
              />
            </BrowserRouter>
>>>>>>> c19233a4a0b29057bb23f0336e6ae91cff2f59dd
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;