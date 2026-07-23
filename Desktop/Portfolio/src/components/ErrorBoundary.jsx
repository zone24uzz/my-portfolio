import { Component } from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          style={{
            minHeight: "100dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
            backgroundColor: "var(--color-bg-primary)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(3rem, 10vw, 6rem)",
                fontWeight: 800,
                background: "linear-gradient(135deg, var(--color-accent-400), var(--color-accent-500))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1,
                marginBottom: "1rem",
              }}
            >
              Oops!
            </div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              Something went wrong
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--color-text-secondary)",
                maxWidth: "440px",
                margin: "0 auto 2rem",
                lineHeight: 1.7,
              }}
            >
              An unexpected error occurred. Try refreshing the page or go back to the homepage.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="btn-primary"
              >
                Refresh Page
              </button>
              <Link to="/" className="btn-secondary" onClick={() => this.setState({ hasError: false, error: null })}>
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
