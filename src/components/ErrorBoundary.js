import React from 'react';
import {setAppErrored} from "../redux/store";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    setAppErrored();
    localStorage.removeItem('redux');
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={{paddingTop: 25, textAlign: 'center'}}>
        Something went wrong, previous state stored in localStorage removed in case was corrupted, try refreshing the page.
      </h1>;
    }

    return this.props.children;
  }
}
