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
        const redirectScript = `
    <script>
      // GitHub Pages SPA redirect handler
      (function() {
        var segmentCount = ${segmentCount}; // Automatically set based on base path
        var l = window.location;
        var pathname = l.pathname;
        var search = l.search;
        var hash = l.hash;
        
        var pathSegments = pathname.split('/').filter(function(segment) {
          return segment.length > 0;
        });
        
        var segmentsToKeep = pathSegments.slice(0, segmentCount);
        var segmentsToRedirect = pathSegments.slice(segmentCount);
        
        if (segmentsToRedirect.length > 0 || search || hash) {
          var basePath = segmentsToKeep.length > 0 ? '/' + segmentsToKeep.join('/') : '';
          var redirectPath = segmentsToRedirect.join('/');
          var fullRedirect = redirectPath + search + hash;
          var redirectUrl = l.origin + basePath + '/?redirect=' + encodeURIComponent(fullRedirect);
          l.replace(redirectUrl);
        }
      })();
    </script>`;
        
        // Insert the redirect script before the closing </head> tag
        const htmlWithRedirect = indexHtml.replace("</head>", redirectScript + "\n  </head>");
        
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
  // - If your site is at https://username.github.io/ (root repo), set base to '/'
  // - If your site is at https://username.github.io/repo-name/, set base to '/repo-name/'
  // You can override this via environment variable: VITE_BASE_PATH
  // 
  // Based on the error URL (equipoise7.github.io), the site is in the root, so base is '/'
  // If your site is in a subdirectory, change this to '/ossetian-peaks-tours/'
  const basePath = process.env.VITE_BASE_PATH || '/';
  
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
