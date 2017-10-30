

create database student;

CREATE TABLE student.movie (
    title varchar(255) not null,
    name varchar(255) not null,
    category varchar(255),
    place varchar(255) not null,
    date Date not null
);

CREATE TABLE student.login (
    userName varchar(255) not null,
    pass varchar(255) not null
);

CREATE TABLE student.user (
    uid varchar(255) not null,
    name varchar(255) not null,
    email varchar(255),
	 address varchar(255)     
);

insert into student.movie (title, name, category, place, date) VALUES ('Kennedy', 'Kennedy', 'Family', 'City Cinema', '2017-11-01');
insert into student.movie (title, name, category, place, date) VALUES ('Day Out', 'Day Out', 'Family', 'Station Cinema', '2017-11-03');
insert into student.movie (title, name, category, place, date) VALUES ('The Blue', 'The Blue', 'Adventure', 'City Cinema', '2017-11-05');
insert into student.movie (title, name, category, place, date) VALUES ('Solitire', 'Solitire', 'Comedy', 'Bern Cinema', '2017-11-04');
insert into student.movie (title, name, category, place, date) VALUES ('Night sky', 'Night sky', 'Family', 'Uni Cinema', '2017-11-04');
insert into student.movie (title, name, category, place, date) VALUES ('Magician', 'Magician', 'Adventure', 'City Cinema', '2017-11-02');


insert into student.user (uid, name, email, address) VALUES ('1', 'webeng1', 'webeng1@fribourg.ch', 'Fribourg street 1, 4028');
insert into student.user (uid, name, email, address) VALUES ('2', 'webeng2', 'webeng2@fribourg.ch', 'Fribourg street 2, 4029');

insert into student.login (userName, pass) VALUES ('webeng1', 'password1');
insert into student.login (userName, pass) VALUES ('webeng2', 'password2');





