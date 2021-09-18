
alter table tbl add column clmn int;
alter table tbl drop column clmn;
alter table tbl rename clmn1 to clmn2;
alter table tbl alter column clmn set data type int;
alter table tbl alter column clmn set default 'value';
alter table tbl alter column clnn set not null;
alter table tbl alter column clnn drop not null;
alter table tbl1 rename to tbl2;
select * from tbl where clmn like 'value';
select * from tbl where clmn like 'val%';
select * from tbl where clmn like '%lue';
select * from tbl where clmn > -10 and clmn < 10;
select * from tbl where clmn < -10 or clmn > 10;
select distinct clmn from tbl;
select clmn, count(clmn) from tbl group by clmn having count(clmn) > 3;

create database book_shop;

\connect book_shop

create extension if not exists "uuid-ossp";

create type order_status as enum ('cart', 'fulfil', 'history');

create table users (
    id              uuid            not null unique default uuid_generate_v4(),
    login           varchar (100)   not null unique,
    password        varchar (100)   not null,
    last_name       varchar (100)   not null,
    first_name      varchar (100)   not null,
    middle_name     varchar (100),
    phone_number    numeric (11),
    email_address   varchar (100),
    street_address  varchar (100),
    sign_up_date    timestamp with time zone not null default now(),
    primary key (id)
);

create table authors (
    id              uuid            not null unique default uuid_generate_v4(),
    first_name      varchar (100)   not null,
    last_name       varchar (100)   not null,
    biography       varchar (5000)  not null,
    primary key (id)
);

create table categories (
    id              uuid            not null unique default uuid_generate_v4(),
    title           varchar (100)   not null,
    description     varchar (5000)  not null,
    primary key (id)
);

create table books (
    isbn            varchar (13)    not null unique,
    author_id       uuid            not null,
    category_id     uuid            not null,
    title           varchar (100)   not null,
    year            numeric (4)     not null,
    price           numeric (7, 2)  not null,
    count           integer         not null,
    star            numeric (9, 8),
    reviews         integer         not null default 0,
    annotation      varchar (5000)  not null,
    primary key (isbn),
    foreign key (author_id) references authors (id),
    foreign key (category_id) references categories (id)
);

create table reviews (
    book_isbn       varchar (13)    not null,
    user_id         uuid            not null,
    star            numeric (2, 1)  not null,
    content         varchar (5000),
    review_date     timestamp with time zone not null default now(),
    primary key (book_isbn, user_id),
    foreign key (book_isbn) references books (isbn),
    foreign key (user_id) references users (id)
);

create table user_orders (
    id              uuid            not null unique default uuid_generate_v4(),
    user_id         uuid            not null,
    status          order_status    not null,
    total_price     numeric (7, 2)  not null,
    deliv_address   varchar (100)   not null,
    order_date      timestamp with time zone not null default now(),
    primary key (id),
    foreign key (user_id) references users (id)
);

create table book_orders (
    id              uuid            not null unique default uuid_generate_v4(),
    order_id        uuid            not null,
    book_isbn       varchar (13)    not null,
    price           numeric (7, 2)  not null,
    count           integer         not null,
    primary key (id),
    foreign key (order_id) references user_orders (id),
    foreign key (book_isbn) references books (isbn)
);
