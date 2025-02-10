@echo off
echo.
echo [信息] 开始拉取代码，构建项目，重建Docker镜像并运行。
echo.

REM 设置工作目录为批处理文件所在目录
cd /d %~dp0

REM 拉取最新代码
echo [信息] 正在拉取最新代码...
git pull || (echo [错误] git pull 失败！ && exit /b)

REM 执行构建命令
echo [信息] 正在构建项目...
npm run build || (echo [错误] npm run build 失败！ && exit /b)

REM 检查是否存在旧的 Docker 镜像，并删除它（如果存在）
echo [信息] 正在检查并删除旧的Docker镜像（如果存在）...
docker images -q volunteer:1.0 > nul
if %errorlevel% equ 0 (
    echo [信息] 找到旧镜像，正在删除...
    docker image rm -f volunteer:1.0 || echo [警告] 删除镜像失败！
) else (
    echo [信息] 未找到旧镜像，跳过删除步骤。
)

REM 构建新的docker镜像
echo [信息] 正在构建新的Docker镜像...
docker build -t volunteer:1.0 Dockerfile . || (echo [错误] Docker镜像构建失败！ && exit /b)

REM 使用docker-compose启动服务
echo [信息] 正在使用docker-compose启动volunteer服务...
docker-compose up -d volunteer || (echo [错误] 使用docker-compose启动Docker容器失败！ && exit /b)

echo.
echo [信息] 操作完成！
pause
