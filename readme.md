
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
https://www.youtube.com/watch?v=dw1y7qwNb4E

1- Instalar el toolkit heroku
2- $ heroku login
3- Crear una app 
   $ heroku create

4- Renombrar
   $ heroku apps:rename --app [nombreviejo] [nombrenuevo] 
5- git remote -v
   ver si esta el repo de heroku

6- git push heroku master
7- heroku logs --tail 
8- abrir otra terminal y ejecutar el addon
   heroku addons:create cleardb:ignite

   heroku addons:create heroku-postgresql o heroku addons:add heroku-postgresql 

   Si no tengo tarjeta de credito hay que configurarla
   no se va a cobrar nada

      Creating cleardb:ignite on ⬢ delilahresto... !
      ▸    Please verify your account to install this add-on plan (please enter a credit card) For more
      ▸    information, see https://devcenter.heroku.com/categories/billing Verify now at https://heroku.com/verify

9- heroku config | grep CLEARDB_DATABASE_URL  #en mysqk
9- heroku config | grep DATABASE_URL  #en postgres
10- configurar la cadena de conexion mysql devuelta
11- heroku config: set DATABASE_URL='cadena_de_conexion_mysql_devuelta' 
12- configurar la cadena de conexion en mi aplicacion

13- heroku run bash
npx sequelize-cli db:seed:all
14- heroku open