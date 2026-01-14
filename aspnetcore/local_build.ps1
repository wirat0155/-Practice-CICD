# Local Build Script
# This script demonstrates the basic steps of a CI/CD pipeline running locally.

$ErrorActionPreference = "Stop"

Write-Host "----------------------------------------------------------------"
Write-Host "Step 1: Clean - Removing old build artifacts..."
Write-Host "----------------------------------------------------------------"
dotnet clean
if ($LASTEXITCODE -ne 0) { Write-Error "Clean failed!"; exit 1 }

Write-Host "`n----------------------------------------------------------------"
Write-Host "Step 2: Build - Compiling the code..."
Write-Host "----------------------------------------------------------------"
dotnet build
if ($LASTEXITCODE -ne 0) { Write-Error "Build failed!"; exit 1 }

Write-Host "`n----------------------------------------------------------------"
Write-Host "Step 3: Publish - Creating release artifacts..."
Write-Host "----------------------------------------------------------------"
dotnet publish -c Release -o ./publish
if ($LASTEXITCODE -ne 0) { Write-Error "Publish failed!"; exit 1 }

Write-Host "`n----------------------------------------------------------------"
Write-Host "SUCCESS: Application published to ./publish"
Write-Host "----------------------------------------------------------------"
