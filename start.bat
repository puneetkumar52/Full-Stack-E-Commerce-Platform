@echo off
echo ==========================================
echo   ShopNow E-Commerce - Starting...
echo ==========================================

echo.
echo [1/2] Starting Backend (port 5000)...
start "ShopNow Backend" cmd /k "cd /d "%~dp0" && npm run dev"

timeout /t 3 /nobreak > nul

echo [2/2] Starting Frontend (port 5173)...
start "ShopNow Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Both servers started!
echo Backend:  http://localhost:5000/api/health
echo Frontend: http://localhost:5173
echo.
timeout /t 5 /nobreak > nul
start http://localhost:5173
