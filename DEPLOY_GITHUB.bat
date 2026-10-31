@echo off
title Push Queen Bloom to GitHub (Private for Her)
echo ========================================================
echo  Queen Bloom - 1-Click GitHub Deploy Helper
echo ========================================================
echo.
echo Step 1: Create a repository on https://github.com/new
echo         Name it e.g. "queen-haven"
echo         (You can choose Public or Private)
echo.
echo Step 2: Paste your GitHub repository URL below:
echo         (e.g., https://github.com/YourUsername/queen-haven.git)
echo.
set /p REPO_URL="Enter GitHub Repo URL: "
if "%REPO_URL%"=="" goto end

git init
git config user.email "queen@bloom.app"
git config user.name "QueenBloomUser"
git add .
git commit -m "Queen Bloom with White & Cream theme and PIN 2461" >nul 2>&1
git branch -M main
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git push -u origin main

echo.
echo ========================================================
echo Success! Files pushed to your GitHub repository.
echo.
echo --------------------------------------------------------
echo HOW TO ACTIVATE 100%% FREE 24/7 ONLINE HOSTING:
echo --------------------------------------------------------
echo.
echo OPTION A (Fastest - GitHub Pages with PIN 2461):
echo 1. Open your repo on GitHub.
echo 2. Go to Settings -> Pages.
echo 3. Under Branch, select 'main' and click 'Save'.
echo 4. Your app link will be: https://YourUsername.github.io/YourRepo/
echo.
echo OPTION B (100%% Private GitHub Repo + Free Vercel Link):
echo 1. Open https://vercel.com and sign in with GitHub (Free).
echo 2. Click "Add New Project" and choose your Private repo.
echo 3. Click "Deploy" (takes 15 seconds).
echo 4. You get an HTTPS link that works 24/7 anywhere in the world!
echo.
echo * Note: PIN 2461 is pre-activated on all pages for her privacy.
echo ========================================================
pause
:end
