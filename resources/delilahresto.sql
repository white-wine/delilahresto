create table Products
(
    id            int auto_increment
        primary key,
    product_name  varchar(255)                           null,
    product_price decimal(10, 2)                         null,
    product_photo varchar(255)                           null,
    createdAt     datetime default '2020-05-19 14:31:04' not null,
    updatedAt     datetime default '2020-05-19 14:31:04' not null,
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
    createdAt    datetime default '2020-05-19 14:31:04' not null,
    updatedAt    datetime default '2020-05-19 14:31:04' not null,
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
    order_status      varchar(15)                            not null,
    order_time        datetime default '2020-05-19 14:31:04' not null,
    order_description varchar(100)                           not null,
    order_amount      varchar(255)                           not null,
    payment_method    varchar(15)                            not null,
    createdAt         datetime default '2020-05-19 14:31:04' not null,
    updatedAt         datetime default '2020-05-19 14:31:04' not null,
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