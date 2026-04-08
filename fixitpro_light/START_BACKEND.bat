@echo off
echo ================================================
echo   FixItPro - Starting Backend (Python/Flask)
echo ================================================
echo.
cd /d "%~dp0backend"
echo [1/3] Creating virtual environment...
python -m venv venv
echo.
echo [2/3] Activating virtual environment...
call venv\Scripts\activate
echo.
echo [3/3] Installing Python dependencies...
pip install -r requirements.txt
echo.
echo  Starting Flask server on: http://localhost:5000
echo  Press Ctrl+C to stop
echo.
python app.py
pause
