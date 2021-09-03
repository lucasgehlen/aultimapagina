# tbd-showscase

## Backend

Runing backend application: npm start

### Version tools

Node v14.17.0 (https://nodejs.org/)

npm 6.14.13 (https://www.npmjs.com/)

MySQL 5.7 (https://www.mysql.com/)

### Local Configs
Running docker to MySQL

```
docker pull mysql:5.7
docker run --name showcase-mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:5.7
docker exec -it showcase-mysql bash
```

Then, create mysql database

```
mysql -uroot -proot
```
```mysql
CREATE DATABASE showscase;
exit;
```

### Dependencies

#### Web Application & Routing
Express (https://www.npmjs.com/package/express)

Cors (https://www.npmjs.com/package/cor)s

#### Dev tools
Nodemon (https://www.npmjs.com/package/nodemon)

#### Database & Migrations
Mysql (https://www.npmjs.com/package/mysql)

Knex (https://www.npmjs.com/package/knex)
