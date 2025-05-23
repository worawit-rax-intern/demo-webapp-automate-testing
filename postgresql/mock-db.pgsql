create table role (
    id serial primary key,
    name varchar(100)
);

create table "user" (
    email varchar(255) primary key,
    name varchar(100),
    lastname varchar(100),
    password varchar(100)
    role int References role(id)
);

create table artical (
    id serial primary key,
    title varchar(255),
    description text
    published_at timestamp
    publisher varchar(255) References user(email) on delete cascade
);