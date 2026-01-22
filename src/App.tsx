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
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Preloader onLoadComplete={() => setIsLoaded(true)} />
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
  );
};

export default App;