import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to handle GitHub Pages redirect
const RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a redirect parameter from GitHub Pages 404.html
    const queryParams = new URLSearchParams(location.search);
    const redirectParam = queryParams.get("redirect");
    
    if (redirectParam) {
      try {
        // Decode the redirect path and restore & symbols
        const decodedPath = decodeURIComponent(redirectParam).replace(/~and~/g, "&");
        
        // Navigate to the decoded path (React Router will handle it)
        navigate(decodedPath, { replace: true });
      } catch (e) {
        console.error("Error processing redirect:", e);
        // Fallback to home if redirect fails
        navigate("/", { replace: true });
      }
    }
  }, [location, navigate]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RedirectHandler />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
