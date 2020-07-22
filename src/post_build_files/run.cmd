CD ./db
start cmd.exe /k  CALL "db.bat"
CD ../
angular-http-server -p 9000 --open --path app
