// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSMgdvfOX6NwueluGkOx06R9jS1BwN4yU",
  authDomain: "holyspace-60ec1.firebaseapp.com",
  projectId: "holyspace-60ec1",
  storageBucket: "holyspace-60ec1.firebasestorage.app",
  messagingSenderId: "1095731378645",
  appId: "1:1095731378645:web:c43f64b944a9aecf02a55c",
};

// Initialize Firebase (solo para hosting)
const app = initializeApp(firebaseConfig);

// Direct GitHub download URLs - no Firebase Storage needed
const downloadUrls = {
  windows: 'https://github.com/systemcrash92/HolySpaceDownload/releases/download/v1.0.0/HolySpace-Setup-1.0.0.exe',
  mac: 'https://github.com/systemcrash92/HolySpaceDownload/releases/download/v1.0.0/HolySpace-1.0.0-mac.dmg'
};

// Function to track download
function trackDownload(platform) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'download', {
      'platform': platform,
      'app_name': 'HolySpace'
    });
  }
  
  // Solo con Google Analytics si está disponible
}

// Function to track page view
function trackPageView(pageName) {
  if (typeof gtag !== 'undefined') {
    gtag('config', 'G-RS2B3W4587', {
      page_title: pageName,
      page_location: window.location.href
    });
  }
}


// Export functions for use in other files
export { 
  downloadUrls, 
  trackDownload, 
  trackPageView
};
