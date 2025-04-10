-- auto-generated definition
-- django 기본 테이블 - 250410 mandy
create table django_session
(
    session_key  varchar(40) not null
        primary key,
    session_data longtext    not null,
    expire_date  datetime(6) not null
)
    collate = utf8mb3_unicode_ci;

create index django_session_expire_date_a5c62663
    on django_session (expire_date);

