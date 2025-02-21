@echo off
echo.
echo [信息] 打包Web工程，生成dist文件。
echo.

cd ..

docker rm -f web-volunteer-1
docker rmi volunteer:1.0
docker build -f Dockerfile -t volunteer:1.0 .
pause