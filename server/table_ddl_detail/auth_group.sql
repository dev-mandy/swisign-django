-- auto-generated definition
-- django 기본 테이블 - 250410 mandy
create table auth_group
(
    id   int auto_increment
        primary key,
    name varchar(150) not null,
    constraint name
        unique (name)
)
    collate = utf8mb3_unicode_ci;

