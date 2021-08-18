# Getting Started

docker-compose up

# Generate infrastructure diagram

yarn diagram

# Infrastructure design

![](./diagram/web_service.png)

# database migration

1. edit or create entity
1. generate migration
   yarn typeorm migration:generate -n EntityClassName
1. run migration

- yarn typeorm migration:run

# 複合主キー(複合主カラム) - composite primary columns

https://typeorm.io/#:~:text=You%20can%20have%20composite%20primary%20columns%20as%20well%3A

# task

- [ ] 真似して綺麗にする
      https://github.com/typeorm/typescript-express-example/blob/master/src/controller/PostGetAllAction.ts
