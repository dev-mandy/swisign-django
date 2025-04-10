-- auto-generated definition
create table special_terms
(
    st_seq       bigint auto_increment comment 'Special Terms 시퀀스'
        primary key,
    st_content   varchar(500)                         not null comment 'Special Terms 특약사항 내용',
    st_use_count int      default 0                   not null comment 'Special Terms 사용 횟수',
    st_is_public tinyint  default 1                   not null comment 'Special Terms 특약사항 공유 여부
0: 공유안함 (개인만 사용)
1: 공유 (모두 사용 가능)',
    st_created   datetime default current_timestamp() not null comment 'Special Terms 생성일시',
    st_updated   datetime default current_timestamp() not null comment 'Special Terms 수정일시',
    constraint special_terms_st_seq_uindex
        unique (st_seq)
)
    comment '특약사항 리스트';

