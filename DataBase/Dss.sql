--====================== Uncomment 'create schema DSS Blog;' (next line) on first run!!!!!!!!!!!================
-- create schema DSS Blog;

set schema 'DSS Blog';

--====================================== DDL - Begin =======================================================

CREATE TABLE users (
    c_no SERIAL PRIMARY KEY,
    c_name VARCHAR(80) NOT NULL,
    c_tag VARCHAR UNIQUE NOT NULL,
    c_email VARCHAR(60) UNIQUE NOT NULL,
    c_password VARCHAR(100) NOT NULL CHECK (
        c_password ~ '^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$'
    ),
    c_phoneno VARCHAR(15) UNIQUE CHECK (c_phoneno ~ '^\+?[0-9]{11,15}$'),
    c_secret_key_otp VARCHAR(50) NOT NULL
);


-- Posts table (tweets and comments)
create table posts (
    post_id serial primary key,
    parent_post_id integer, -- For comments, reference the ID of the parent tweet
    c_tag varchar references users(c_tag),
    post_time timestamp default current_timestamp,
    post_msg varchar(280) not null
);


--====================================== Drop Stuff =======================================================
--if recreating the database, need to drop tables in this order to avoid constraint violations
-- drop table posts;
-- drop table users;

--====================================== Delete Stuff =======================================================
--if recreating the database, need to drop tables in this order to avoid constraint violations
-- delete from users
-- delete from posts

--====================================== Select Stuff =======================================================
-- select * from users;
-- select * from posts;

--====================================== Useful Queries =======================================================
-- select u.c_name, u.c_tag, p.post_msg from users u, posts p
-- where u.c_no = p.c_no
-- order by p.post_time asc


-- select u.c_name, u.c_tag, p.post_id, p.post_msg from users u, posts p WHERE u.c_tag = p.c_tag and 
--                 p.post_msg LIKE 'www.netflix.com'