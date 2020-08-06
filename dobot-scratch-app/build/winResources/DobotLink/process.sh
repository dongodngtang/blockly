#!/bin/bash

echo "confige qt environment."
export PATH=$PATH:"/Users/liuyufei/Qt/5.12.8/clang_64/bin"
export PATH=$PATH:"/Users/liuyufei/Qt/5.12.8/clang_64/lib"
echo $PATH
# source .bash_profile

echo "[1]start macdeployqt ..."

macdeployqt DobotLink.app

echo "[2.1] cp lib* ./DobotLink.app/Contents/Frameworks"
cp lib*.1.0.0.dylib ./DobotLink.app/Contents/Frameworks
cp libcurl.4.dylib ./DobotLink.app/Contents/Frameworks

echo "[2.2] cp -r readme/WebHelp ./DobotLink.app/Contents/readme/WebHelp"
mkdir ./DobotLink.app/Contents/readme
cp -r readme/WebHelp ./DobotLink.app/Contents/readme/WebHelp

echo "[2.3] cp -r firmware ./DobotLink.app/Resources/firmware"
cp -r firmware/ ./DobotLink.app/Contents/Resources/firmware

echo "[2.4] cp -r tool/dfu-util/ ./DobotLink.app/Contents/Resources/tool/dfu-util"
mkdir ./DobotLink.app/Contents/Resources/tool
cp -r tool/dfu-util/ ./DobotLink.app/Contents/Resources/tool/dfu-util

cd ./DobotLink.app/Contents/Frameworks
ln -s libArduinoPlugin.1.0.0.dylib libArduinoPlugin.1.0.dylib
ln -s libArduinoPlugin.1.0.0.dylib libArduinoPlugin.1.dylib
ln -s libArduinoPlugin.1.0.0.dylib libArduinoPlugin.dylib

ln -s libDPluginInterface.1.0.0.dylib libDPluginInterface.1.0.dylib
ln -s libDPluginInterface.1.0.0.dylib libDPluginInterface.1.dylib
ln -s libDPluginInterface.1.0.0.dylib libDPluginInterface.dylib

ln -s libDownloadPlugin.1.0.0.dylib libDownloadPlugin.1.0.dylib
ln -s libDownloadPlugin.1.0.0.dylib libDownloadPlugin.1.dylib
ln -s libDownloadPlugin.1.0.0.dylib libDownloadPlugin.dylib

ln -s libIndustrialRobotPlugin.1.0.0.dylib libIndustrialRobotPlugin.1.0.dylib
ln -s libIndustrialRobotPlugin.1.0.0.dylib libIndustrialRobotPlugin.1.dylib
ln -s libIndustrialRobotPlugin.1.0.0.dylib libIndustrialRobotPlugin.dylib

ln -s libMagicDevicePlugin.1.0.0.dylib libMagicDevicePlugin.1.0.dylib
ln -s libMagicDevicePlugin.1.0.0.dylib libMagicDevicePlugin.1.dylib
ln -s libMagicDevicePlugin.1.0.0.dylib libMagicDevicePlugin.dylib

ln -s libMagicDevice.1.0.0.dylib libMagicDevice.1.0.dylib
ln -s libMagicDevice.1.0.0.dylib libMagicDevice.1.dylib
ln -s libMagicDevice.1.0.0.dylib libMagicDevice.dylib

ln -s libcurl.4.dylib libcurl.dylib

cd ../../../

echo "[3.1] check DobotLink dependence.."
# otool -L ./DobotLink.app/Contents/MacOS/DobotLink

echo "[3.2] change PATH"
install_name_tool -change "libDPluginInterface.1.dylib" "@rpath/libDPluginInterface.1.dylib" DobotLink.app/Contents/MacOS/DobotLink

echo "[3.3] check plugins dependence.."
# otool -L ./DobotLink.app/Contents/Frameworks/libMagicDevicePlugin.1.0.0.dylib
install_name_tool -change "libDPluginInterface.1.dylib" "@rpath/libDPluginInterface.1.dylib" DobotLink.app/Contents/Frameworks/libMagicDevicePlugin.1.0.0.dylib
install_name_tool -change "libMagicDevice.1.dylib" "@rpath/libMagicDevice.1.dylib" DobotLink.app/Contents/Frameworks/libMagicDevicePlugin.1.0.0.dylib

# otool -L ./DobotLink.app/Contents/Frameworks/libDownloadPlugin.1.0.0.dylib
install_name_tool -change "libDPluginInterface.1.dylib" "@rpath/libDPluginInterface.1.dylib" DobotLink.app/Contents/Frameworks/libDownloadPlugin.1.0.0.dylib

# otool -L ./DobotLink.app/Contents/Frameworks/libArduinoPlugin.1.0.0.dylib
install_name_tool -change "libDPluginInterface.1.dylib" "@rpath/libDPluginInterface.1.dylib" DobotLink.app/Contents/Frameworks/libArduinoPlugin.1.0.0.dylib

# otool -L ./DobotLink.app/Contents/Frameworks/libIndustrialRobotPlugin.1.0.0.dylib
install_name_tool -change "libDPluginInterface.1.dylib" "@rpath/libDPluginInterface.1.dylib" DobotLink.app/Contents/Frameworks/libIndustrialRobotPlugin.1.0.0.dylib
install_name_tool -change "/usr/local/lib/libcurl.4.dylib" "@rpath/libcurl.4.dylib" DobotLink.app/Contents/Frameworks/libIndustrialRobotPlugin.1.0.0.dylib


echo "[4] create dmg..."
macdeployqt DobotLink.app -dmg
