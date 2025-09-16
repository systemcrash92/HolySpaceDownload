@echo off
echo ========================================
echo    HolySpace Website Deployment
echo ========================================
echo.

echo [1/4] Installing dependencies...
call npm install

echo.
echo [2/4] Starting local server for testing...
echo Server will start at http://localhost:8000
echo Press Ctrl+C to stop the server and continue deployment
echo.
pause

echo.
echo [3/4] Deploying to Firebase Storage...
firebase deploy --only storage

echo.
echo [4/4] Deploying website to Firebase Hosting...
firebase deploy --only hosting

echo.
echo ========================================
echo    Deployment Complete!
echo ========================================
echo.
echo Your website is now live at:
echo https://holyspace-60ec1.web.app
echo.
pause
