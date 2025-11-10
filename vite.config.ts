import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { readFileSync, writeFileSync } from "fs";

// Plugin to create 404.html from index.html after build
const create404Html = () => {
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
        
        // Create 404.html with redirect script
        const redirectScript = `
    <script>
      // GitHub Pages SPA redirect handler
      (function() {
        var segmentCount = 0; // Set to 1 if your site is in a subdirectory (e.g., /repo-name)
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
        console.log("✓ Created 404.html for GitHub Pages");
      } catch (error) {
        console.error("Error creating 404.html:", error);
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    create404Html(), // Always create 404.html on build
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
