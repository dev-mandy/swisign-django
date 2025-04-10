-- auto-generated definition
create table test_data
(
    seq      bigint auto_increment
        primary key,
    testName varchar(20) null,
    age      int         null,
    email    varchar(20) null,
    gender   varchar(1)  null,
    constraint test_data_seq_uindex
        unique (seq)
)
    collate = utf8mb3_unicode_ci;

