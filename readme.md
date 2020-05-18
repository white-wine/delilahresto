
## DelilahResto 

Pasos requeridos:

1- git clone https://github.com/hongoatomic/delilahresto

2- Entrar a la carpeta cd delilahresto

3- Ejecutar npm i

4- Crear una base de datos en el servidor local ej: delilahresto

5- Ejecutar el seeder con el comando
```
 npx sequelize-cli db:migrate
```
```
 npx sequelize-cli db:seed:all
```

Adicionalmente se creo la estructura de la base de datos en el archivo db/delilahresto.sql

6- La configución de la base de datos se encuentra en el archivo config/config.json y se debe configurar los parametros correspondientes a la base de datos ej:

    "username": "root",
    "password": "secret",
    "database": "delilahresto_development",
    "host": "172.17.0.3"



## Documentación de los endpoints:

Publicado en: https://documenter.getpostman.com/view/10614879/SzmfYcfu?version=latest

