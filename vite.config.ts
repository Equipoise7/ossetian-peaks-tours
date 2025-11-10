import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { readFileSync, writeFileSync } from "fs";

// Plugin to create 404.html from index.html after build
const create404Html = (basePath: string) => {
  return {
    name: "create-404-html",
    closeBundle() {
      // Only run in build mode (not in dev server)
      if (process.env.NODE_ENV === "development") {
        return;
      }
      
      try {
        // Read the built index.html
        const indexHtmlPath = path.resolve(__dirname, "dist/index.html");
        const indexHtml = readFileSync(indexHtmlPath, "utf-8");
        
        // Calculate segment count based on base path
        // If base is '/', segmentCount is 0 (root)
        // If base is '/repo-name/', segmentCount is 1
        const segmentCount = basePath === '/' ? 0 : basePath.split('/').filter(s => s).length;
        
        // Create 404.html with redirect script
        // This script runs immediately to redirect 404 pages to index.html with the correct route
        const redirectScript = `
    <script>
      // GitHub Pages SPA redirect handler
      // Run immediately before page load to avoid loading resources from wrong paths
      (function() {
        var segmentCount = ${segmentCount};
        var l = window.location;
        var pathname = l.pathname;
        var search = l.search;
        var hash = l.hash;
        
        // Only redirect if we're not already at the base path or if we have a redirect parameter
        var pathSegments = pathname.split('/').filter(function(segment) {
          return segment.length > 0;
        });
        
        // Check if we have a redirect parameter (from previous redirect)
        var hasRedirectParam = search.indexOf('redirect=') !== -1;
        
        // If we're at the base path and don't have a redirect parameter, don't redirect
        if (pathSegments.length === segmentCount && !hasRedirectParam && !hash) {
          return; // We're already at the correct location
        }
        
        var segmentsToKeep = pathSegments.slice(0, segmentCount);
        var segmentsToRedirect = pathSegments.slice(segmentCount);
        
        // Build base path
        var basePath = '';
        if (segmentCount > 0 && segmentsToKeep.length > 0) {
          basePath = '/' + segmentsToKeep.join('/');
        }
        
        // Build redirect URL
        if (segmentsToRedirect.length > 0 || hasRedirectParam || hash) {
          var redirectPath = segmentsToRedirect.join('/');
          var fullRedirect = redirectPath + search + hash;
          var redirectUrl = l.origin + basePath + (basePath ? '' : '/') + '?redirect=' + encodeURIComponent(fullRedirect);
          l.replace(redirectUrl);
        }
      })();
    </script>`;
        
        // Insert the redirect script at the very beginning of <head> to run before other scripts
        // This ensures the redirect happens before resources are loaded
        const htmlWithRedirect = indexHtml.replace("<head>", "<head>" + redirectScript);
        
        // Write 404.html
        writeFileSync(path.resolve(__dirname, "dist/404.html"), htmlWithRedirect, "utf-8");
        console.log(`✓ Created 404.html for GitHub Pages (base: ${basePath})`);
      } catch (error) {
        console.error("Error creating 404.html:", error);
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Base path for GitHub Pages
  // IMPORTANT: Set this based on your GitHub Pages URL:
  // - If your site is at https://username.github.io/repo-name/, set base to '/repo-name/'
  // - If your site is at https://username.github.io/ (root repo named username.github.io), set base to '/'
  // You can override this via environment variable: VITE_BASE_PATH
  // 
  // Default: '/ossetian-peaks-tours/' (for project repos, which is the most common case)
  // Change to '/' only if you're using a root GitHub Pages repo (username.github.io)
  const basePath = process.env.VITE_BASE_PATH || '/ossetian-peaks-tours/';
  
  return {
    base: basePath,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(), 
      mode === "development" && componentTagger(),
      create404Html(basePath), // Always create 404.html on build
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
