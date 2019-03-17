REM Enter the csproj name here
set APP_FOLDER=Files
set CSPROJ=%~dp0%APP_FOLDER%\Files.csproj

pushd "%~dp0"

pushd "GitPublish" || exit /b
git pull || exit /b
powershell -Command "Get-ChildItem .\* -exclude .git | Remove-Item -Recurse" || exit /b
popd || exit /b

pushd "%APP_FOLDER%" || exit /b
call npm run yarn-install || exit /b
call npm run clean || exit /b
call npm run build || exit /b
popd

pushd "%APP_FOLDER%" || exit /b
dotnet publish -c Release -o ..\GitPublish
popd

popd