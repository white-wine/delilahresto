
--  Create database
CREATE DATABASE  IF NOT EXISTS `delilahresto_development`;
USE `delilahresto_development`;

create table Products
(
    id            int auto_increment primary key,
    product_name  varchar(255)                           null,
    product_price decimal(10, 2)                         null,
    product_photo varchar(255)                           null,
    createdAt     datetime                               not null,
    updatedAt     datetime                               not null,
    deletedAt     datetime                               null
);

create table SequelizeMeta
(
    name varchar(255) not null,
    constraint name
        unique (name)
);

alter table SequelizeMeta
    add primary key (name);

create table Users
(
    id           int auto_increment
        primary key,
    username     varchar(10)                            not null,
    firstname    varchar(30)                            not null,
    lastname     varchar(30)                            not null,
    password     varchar(100)                           not null,
    email        varchar(100)                           not null,
    address      varchar(200)                           not null,
    phone_number varchar(20)                            not null,
    is_admin     int      default 0                     null,
    createdAt    datetime                                not null,
    updatedAt    datetime                                not null,
    deletedAt    datetime                               null,
    constraint email
        unique (email),
    constraint username
        unique (username)
);

create table Orders
(
    id                int auto_increment
        primary key,
    UserId            int                                    not null,
    order_status enum('new','confirmed','preparing','delivering','delivered') NOT NULL DEFAULT 'new',
    order_time        datetime not null,
    order_description varchar(100) not null,
    order_amount      varchar(255) not null,
    payment_method    varchar(15)  not null,
    createdAt         datetime not null,
    updatedAt         datetime not null,
    deletedAt         datetime                               null,
    constraint fk_orders_userId
        foreign key (UserId) references Users (id)
            on update cascade on delete cascade
);

create table ProductOrders
(
    id               int auto_increment
        primary key,
    ProductId        int      not null,
    OrderId          int      not null,
    product_quantity int      not null,
    createdAt        datetime not null,
    updatedAt        datetime not null,
    deletedAt        datetime null,
    constraint fk_productOrders_orderId
        foreign key (OrderId) references Orders (id),
    constraint fk_productOrders_productId
        foreign key (ProductId) references Products (id)
);


insert into Users (id, username, firstname, lastname, password, email, address, phone_number, is_admin, createdAt, updatedAt, deletedAt) values (1, 'sescobar', 'Sol', 'Escobar', '$2a$10$3OSdnlcbj8n1KJ1aLZeI2.E.XrfVG8MwAtRzf.3M.kaiI5elDQVXO', 'sescobar@gmail.com', 'direccion 202', 2223333, 1, '2020-05-19 18:27:41', '2020-05-19 18:27:41', null);
insert into Users (id, username, firstname, lastname, password, email, address, phone_number, is_admin, createdAt, updatedAt, deletedAt) values (2, 'dogglover', 'Bret', 'Leanne', '$2a$10$.h.ZKcUmhhdjxeheBJyTDukFneu7aOKFo7Zh6nBGH2tE5lWJwKrbC', 'bret@yahoo.com', 'Kulas Light Apt. 556', 2223333, 0, '2020-05-19 18:27:41', '2020-05-19 18:27:41', null);
insert into Users (id, username, firstname, lastname, password, email, address, phone_number, is_admin, createdAt, updatedAt, deletedAt) values (3, 'ironman', 'Tony', 'Stark', '$2a$10$1ccM51tfiHES6GsUv9T36e5zTxha7dbQh5rTKdasBw39JeUJIWThq', 'tony@strarkindustries.com', '9 de julio 222', 333939393, 1, '2020-05-19 18:27:30', '2020-05-19 18:27:30', null);

insert into Products (id, product_name, product_price, product_photo, createdAt, updatedAt, deletedAt) values (1, 'Hamburguer Double XL', 290.00, 'https://www.themealdb.com/images/media/meals/qpqtuu1511386216.jpg', '2020-05-19 18:27:41', '2020-05-19 18:27:30', null);
insert into Products (id, product_name, product_price, product_photo, createdAt, updatedAt, deletedAt) values (2, 'Dona', 100.00, 'https://www.themealdb.com/images/media/meals/4i5cnx1587672171.jpg', '2020-05-19 18:27:41', '2020-05-19 18:27:41', null);
insert into Products (id, product_name, product_price, product_photo, createdAt, updatedAt, deletedAt) values (4, 'Hamburguer XL', 260.00, 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2006&q=80', '2020-05-19 18:27:30', '2020-05-19 18:27:30', null);


