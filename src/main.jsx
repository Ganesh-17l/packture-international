import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#FAF6EE', minHeight: '100vh', color: '#1A1A1A' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Something went wrong loading the page</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>{this.state.error?.message || 'Unknown error'}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ padding: '10px 20px', backgroundColor: '#C5A059', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

