import { useState, useEffect } from 'react';
import CustomerListPage from './pages/CustomerListPage'; // Make sure the path is correct

function App() {
  const [apiStatus, setApiStatus] = useState('Checking...');

  useEffect(() => {
    // This function checks if the API is running
    const checkApiStatus = async () => {
      try {
        const response = await fetch('http://localhost:5001/'); // The URL of your backend API
        if (response.ok) {
          setApiStatus('API is running');
        } else {
          setApiStatus('API is not running');
        }
      } catch (error) {
        setApiStatus('API is not running');
        console.error('Error checking API status:', error);
      }
    };
    
    checkApiStatus();
  }, []);

  return (
    <div className="App">
      <h1>Customer Management App</h1>
      <p>API Status: {apiStatus}</p>
      
      {/* Conditionally render the customer list if the API is running */}
      {apiStatus === 'API is running' ? (
        <CustomerListPage />
      ) : (
        <p>Waiting for the API to start...</p>
      )}
    </div>
  );
}

export default App;
