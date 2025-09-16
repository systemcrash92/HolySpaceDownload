// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSMgdvfOX6NwueluGkOx06R9jS1BwN4yU",
  authDomain: "holyspace-60ec1.firebaseapp.com",
  projectId: "holyspace-60ec1",
  storageBucket: "holyspace-60ec1.firebasestorage.app",
  messagingSenderId: "1095731378645",
  appId: "1:1095731378645:web:c43f64b944a9aecf02a55c",
  measurementId: "G-RS2B3W4587"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

// Download URLs (these will be updated when files are uploaded to Firebase Storage)
let downloadUrls = {
  windows: null,
  mac: null
};

// Function to get download URL from Firebase Storage
async function getDownloadUrl(fileName) {
  try {
    const fileRef = ref(storage, `downloads/${fileName}`);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error('Error getting download URL:', error);
    return null;
  }
}

// Function to track download
function trackDownload(platform) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'download', {
      'platform': platform,
      'app_name': 'HolySpace'
    });
  }
  
  // Also track with Firebase Analytics
  if (analytics) {
    analytics.logEvent('download', {
      platform: platform,
      app_name: 'HolySpace'
    });
  }
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

// Initialize download URLs when the page loads
async function initializeDownloadUrls() {
  try {
    // Use GitHub Releases for download links
    downloadUrls.windows = 'https://github.com/systemcrash92/HolySpaceDownload/releases/download/v1.0.0/HolySpace-Setup-1.0.0.exe';
    downloadUrls.mac = 'https://github.com/systemcrash92/HolySpaceDownload/releases/download/v1.0.0/HolySpace-1.0.0-mac.dmg';
    
    console.log('Download URLs initialized:', downloadUrls);
    console.log('Note: Using GitHub releases as download source');
  } catch (error) {
    console.error('Error initializing download URLs:', error);
    // Fallback to local files
    downloadUrls.windows = 'downloads/HolySpace-Setup-1.0.0.exe';
    downloadUrls.mac = 'downloads/HolySpace-1.0.0-mac.dmg';
  }
}

// Export functions for use in other files
export { 
  analytics, 
  downloadUrls, 
  getDownloadUrl, 
  trackDownload, 
  trackPageView, 
  initializeDownloadUrls 
};
