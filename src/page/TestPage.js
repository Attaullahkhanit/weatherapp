import React, { useEffect } from 'react';

function TestPage() {
  useEffect(() => {
    const checkGoogleMapsAPI = () => {
      if (window.google && window.google.maps) {
        console.log('Google Maps API loaded successfully.');
        // You can now use the Google Maps API
        // For example, create a map, marker, etc.
      } else {
        console.error('Google Maps API not loaded.');
      }
    };

    checkGoogleMapsAPI();
  }, []);

  return (
    <>
      <h2>hello Testing page</h2>
    </>
  );
}

export default TestPage;
