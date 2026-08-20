import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Airbnb clone render error:', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <main style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
          <h1>Application could not load</h1>
          <p>Open the browser console to see the full error.</p>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#f7f7f7', padding: '16px', borderRadius: '12px' }}>
            {String(this.state.error.message || this.state.error)}
          </pre>
        </main>
      );
    }

    return this.props.children;
  }
}
