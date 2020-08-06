!macro customInstall
  ${If} ${RunningX64}
    ExecWait '"$INSTDIR\resources\Driver\HardwareV1.0.0\Win10\CP210xVCPInstaller_x64.exe"'
  ${Else}
    MessageBox MB_OK 'else'
    ExecWait '"$INSTDIR\resources\HardwareV1.0.0\Win10\CP210xVCPInstaller_x86.exe"'
  ${EndIf}
!macroend