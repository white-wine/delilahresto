## DelilahResto

Pasos requeridos:

1- clonar repo:

```
git clone https://github.com/white-wine/delilahresto
```

2- Entrar a la carpeta

```
cd delilahresto
```

3- Ejecutar

```
npm i
```

4- Crear una base de datos en el servidor local ej: delilahresto_development

5- Queries de creación de base de datos e inicialización

Se adicionó los queries para crear la base de datos e inicializarla en el archivo resources/dbCreators.sql

Otra forma de crear las tablas es a través de las migraciones de la siguiente manera-

Ejecutar la migración para crear las tablas

```
npx sequelize-cli db:migrate
```

Ejecutar seeders para inicializar las tablas con datos dummy

```
npx sequelize-cli db:seed:all
```

7- La configución de la base de datos se encuentra en el archivo config/config.json y se debe configurar los parametros correspondientes a la base de datos ej:

    "username": "root",
    "password": "secret",
    "database": "delilahresto_development",
    "host": "localhost"

8- El proyecto se encuentra deployado en heroku en la siguiente url

https://delilahresto2020.herokuapp.com/

## Documentación de los endpoints:

Publicado en: https://documenter.getpostman.com/view/10614879/SztA7Udb?version=latest
y se adiciono el archivo resources/delilahresto_development.postman_collection.json para importar en el postman
