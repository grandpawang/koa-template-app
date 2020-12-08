# 构建脚本
docker-compose -f docker/docker-compose.yml up -d
docker-compose -f docker/docker-compose.yml ps
# 复制配置文件到容器
docker cp docker/init/mongo.sh mongo:/

