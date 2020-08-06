

echo "prepare to install libusb, author:liuyufei"
echo "1. tar -xjvf"
dirname='libusb-1.0.23'

tar -xjvf ${dirname}.tar.bz2

cd ${dirname}

echo "2. configure"
./configure

echo "3. make"
make

echo "4. install"
sudo make install

echo "5. clean"
cd ..
rm -rf ${dirname}

echo "6. finish"

