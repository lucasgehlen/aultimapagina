# tbd-showscase

## Backend

Runing backend application: npm start

### Version tools

Node v14.18.0 (https://nodejs.org/)

npm 6.14.15 (https://www.npmjs.com/)

MySQL 5.7 (https://www.mysql.com/)

### Local Configs
Create mysql database

```
mysql -uroot -proot
```
```mysql
CREATE DATABASE aultimapagina;
DROP USER 'root'@'localhost';
CREATE USER 'root'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;
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
