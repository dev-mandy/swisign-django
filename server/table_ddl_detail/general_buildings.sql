-- auto-generated definition
-- 임시 - 250410 mandy
create table general_buildings
(
    resDocNo bigint auto_increment comment 'General Buildings ResDocNo'
        primary key,
    constraint general_buildings_resDocNo_uindex
        unique (resDocNo)
)
    collate = utf8mb3_unicode_ci;

