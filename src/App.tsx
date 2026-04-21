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
import { useState } from "react";
import { NewPreloader } from "./components/ui/NewPreloader";

const queryClient = new QueryClient();

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <NewPreloader onLoadComplete={() => setIsLoaded(true)} />
            {isLoaded && (
              <>
                <CursorFollower />
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <AnimatedRoutes />
                  <SupportWidgets 
                    whatsappNumber="8801516522978"
                    whatsappMessage="Hi! I'm interested in your services."
                  />
                </BrowserRouter>
              </>
            )}
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;