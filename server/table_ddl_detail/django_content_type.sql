-- auto-generated definition
-- django 기본 테이블 - 250410 mandy
create table django_content_type
(
    id        int auto_increment
        primary key,
    app_label varchar(100) not null,
    model     varchar(100) not null,
    constraint django_content_type_app_label_model_76bd3d3b_uniq
        unique (app_label, model)
)
    collate = utf8mb3_unicode_ci;

