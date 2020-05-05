
## Iniciar proyecto con sequelize

npm i -D -E sequelize-cli

```
sequelize init
```



## crear migraciones

```
sequelize migration:generate --name create-users
```


## ejecutar migraciones

```
sequelize db:migrate
npx sequelize-cli db:migrate --url 'mysql://root:password@mysql_host.com/database_name'

```

## Ejecutar rollback en migraciones

```
node_modules/.bin/sequelize db:migrate:undo:all
node_modules/.bin/sequelize db:migrate:undo
```

## crear seeder

```
npx sequelize-cli seed:generate --name user
npx sequelize-cli seed:generate --name product
```

## Ejecutar o deshacer un solo seed en especial

```
npx sequelize-cli db:seed --seed name-of-seed-as-in-data
npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
```

## Ejecutar todos los seeders
```
npx sequelize-cli db:seed:all
```

## Deshacer todos los seed ejecutados
```
npx sequelize-cli db:seed:undo:all
```



## Crear modelos
```
  npx sequelize-cli model:generate --name Product --attributes product_name:string,product_price:string,product_photo:string
  node_modules/.bin/sequelize model:create --name User --attributes 'firstname:string lastname:string'
```

## Fuentes

documentacion de sequelize ver mas acerca de lo que se puede hacer con las migraciones
https://sequelize.org/master/manual/migrations.html

## Crear docker

docker run --name mysql1 -e MYSQL_ROOT_PASSWORD=secretpass -d mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci MYSQL_DATABASE='delilahresto_development'

docker exec -ti mysql1 bash 

mysql -uroot -psecretpass

CREATE DATABASE delilahresto_development;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'secretpass';

CREATE USER 'delilahresto'@'localhost' IDENTIFIED BY 'secretpass';
GRANT ALL PRIVILEGES ON *.* TO 'delilahresto'@'localhost';


## Heroku

1- Instalar el toolkit heroku
2- $ heroku login
3- Crear una app 
   $ heroku create

4- Renombrar
   $ heroku apps:rename --app [nombreviejo] [nombrenuevo] 
5- git remote -v
   ver si esta el repo de heroku
   
     