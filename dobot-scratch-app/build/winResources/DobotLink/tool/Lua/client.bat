cd %~dp0
Lua.exe -e "require('mobdebug').start('127.0.0.1')" "//127.0.0.1/project/test.lua"
pause