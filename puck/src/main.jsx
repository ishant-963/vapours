import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import { LibraryProvider, SearchProvider } from "./dataStore.jsx";
import "./index.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "#0d0f12",
          color: "#f1f5f9",
          fontFamily: "system-ui, -apple-system, sans-serif",
          textAlign: "center"
        }}>
          <div style={{
            maxWidth: "600px",
            background: "#161922",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "12px",
            padding: "2.5rem 2rem",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚠️</div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.5rem", color: "#f87171" }}>
              Application Render Error
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
              An unexpected error interrupted rendering. Details are provided below:
            </p>
            <div style={{
              background: "#090a0f",
              padding: "1rem",
              borderRadius: "8px",
              fontFamily: "monospace",
              fontSize: "0.825rem",
              color: "#fb7185",
              textAlign: "left",
              overflowX: "auto",
              marginBottom: "1.5rem",
              whiteSpace: "pre-wrap"
            }}>
              {this.state.error?.stack || this.state.error?.message || String(this.state.error)}
            </div>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => window.location.reload()}
                style={{
                  background: "#38bdf8",
                  color: "#0f172a",
                  border: "none",
                  padding: "0.625rem 1.25rem",
                  borderRadius: "6px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Reload Page
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/";
                }}
                style={{
                  background: "transparent",
                  color: "#cbd5e1",
                  border: "1px solid #334155",
                  padding: "0.625rem 1.25rem",
                  borderRadius: "6px",
                  fontWeight: "500",
                  cursor: "pointer"
                }}
              >
                Return to Loreverse Home
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <LibraryProvider>
          <SearchProvider>
            <RouterProvider router={router} />
          </SearchProvider>
        </LibraryProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
