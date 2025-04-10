-- auto-generated definition
-- django 기본 테이블 - 250410 mandy
create table django_migrations
(
    id      bigint auto_increment
        primary key,
    app     varchar(255) not null,
    name    varchar(255) not null,
    applied datetime(6)  not null
)
    collate = utf8mb3_unicode_ci;

