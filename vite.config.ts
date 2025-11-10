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
        // This script MUST run immediately and synchronously to redirect before any resources load
        const basePathForScript = basePath === '/' ? '' : basePath.replace(/\/$/, '');
        const redirectScript = `
    <script>
      // GitHub Pages SPA redirect handler - MUST run synchronously
      (function() {
        var segmentCount = ${segmentCount};
        var basePath = '${basePathForScript}';
        var l = window.location;
        var pathname = l.pathname;
        var search = l.search;
        var hash = l.hash;
        
        // Parse current path
        var pathSegments = pathname.split('/').filter(function(s) { return s.length > 0; });
        var hasRedirectParam = search.indexOf('redirect=') !== -1;
        
        // If we're viewing 404.html directly (e.g., /ossetian-peaks-tours/404.html), redirect to base
        if (pathname.endsWith('/404.html') || pathname.endsWith('404.html')) {
          var targetPath = basePath || '/';
          if (hasRedirectParam) {
            // Extract redirect param and use it
            var params = new URLSearchParams(search);
            var redirectValue = params.get('redirect');
            if (redirectValue) {
              l.replace(l.origin + targetPath + '?redirect=' + encodeURIComponent(redirectValue));
              return;
            }
          }
          l.replace(l.origin + targetPath);
          return;
        }
        
        // If we're at the base path without redirect param, we're good
        if (segmentCount === 0 && pathname === '/' && !hasRedirectParam && !hash) {
          return;
        }
        if (segmentCount > 0 && pathSegments.length === segmentCount && 
            pathname.startsWith(basePath) && !hasRedirectParam && !hash) {
          return;
        }
        
        // Need to redirect
        var segmentsToKeep = pathSegments.slice(0, segmentCount);
        var segmentsToRedirect = pathSegments.slice(segmentCount);
        var redirectPath = segmentsToRedirect.join('/');
        
        // Build target URL
        var targetBase = basePath || '/';
        var fullRedirect = redirectPath + (search && !hasRedirectParam ? search : '') + hash;
        var redirectUrl = l.origin + targetBase + (targetBase === '/' ? '' : '') + 
                         '?redirect=' + encodeURIComponent(fullRedirect);
        
        // Immediate redirect - don't wait
        l.replace(redirectUrl);
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
