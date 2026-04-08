@echo off
echo ================================================
echo   FixItPro - Starting Frontend (React.js)
echo ================================================
echo.
cd /d "%~dp0frontend"
echo [1/2] Installing dependencies (first time only)...
npm install
echo.
echo [2/2] Starting React development server...
echo.
echo  App will open at: http://localhost:3000
echo  Press Ctrl+C to stop
echo.
npm start
pause
