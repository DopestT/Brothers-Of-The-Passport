import { StrictMode, Component, ErrorInfo, ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Error Boundary to catch any rendering errors
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('React Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f0f0f',
          color: '#f0ead2',
          padding: '20px',
          fontFamily: 'sans-serif'
        }}>
          <div style={{ maxWidth: '600px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#c9a14a' }}>⚠️ Error</h1>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>Something went wrong:</p>
            <pre style={{
              background: '#1a1a1a',
              padding: '15px',
              borderRadius: '8px',
              overflow: 'auto',
              textAlign: 'left',
              fontSize: '14px'
            }}>
              {this.state.error?.toString()}
            </pre>
            <button 
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                background: '#c9a14a',
                color: '#0f0f0f',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Debug Banner Component
const DebugBanner = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: '#c9a14a',
    color: '#0f0f0f',
    padding: '8px 16px',
    textAlign: 'center',
    fontWeight: 'bold',
    zIndex: 99999,
    fontSize: '14px'
  }}>
    ✓ RENDER OK - React is mounted and running
  </div>
);

const rootElement = document.getElementById('root');
if (!rootElement) {
  document.body.innerHTML = '<div style="padding:20px;color:red;font-size:20px;">ERROR: #root element not found in DOM</div>';
  throw new Error('#root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <DebugBanner />
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
