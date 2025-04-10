-- auto-generated definition
create table common_code
(
    CC_seq         bigint auto_increment comment 'CommonCode 시퀀스'
        primary key,
    CC_parentCode  varchar(10)                            null comment 'CommonCode 부모코드',
    CC_code        varchar(10)                            not null comment 'CommonCode 코드',
    CC_name        varchar(50)                            not null comment 'CommonCode 코드명',
    CC_description varchar(100)                           not null comment 'CommonCode 설명',
    CC_useYn       tinyint(1) default 1                   not null comment 'CommonCode 사용여부
0: 미사용
1: 사용',
    CC_deleteYn    tinyint(1) default 0                   not null comment 'CommonCode 삭제여부
0: 미삭제
1: 삭제',
    CC_created     timestamp  default current_timestamp() not null comment 'CommonCode 생성일시',
    CC_updated     timestamp  default current_timestamp() not null comment 'CommonCode 수정일시',
    constraint common_code_CC_seq_uindex
        unique (CC_seq)
)
    collate = utf8mb3_unicode_ci;

