Write-Host "=== Iniciando Expo con USB + localhost ==="

# 1. Reiniciar ADB
adb kill-server
adb start-server

# 2. Limpiar y aplicar reglas revers
adb reverse --remove-all
adb reverse tcp:8081 tcp:8081
adb reverse tcp:19000 tcp:19000
adb reverse tcp:19001 tcp:19001
Write-Host "Puertos redirigidos:"
adb reverse --list

# 3. Arrancar Metro Bundler con host=localhost
Write-Host "Iniciando Metro Bundler en modo USB..."
npx expo start -c --host localhost 
