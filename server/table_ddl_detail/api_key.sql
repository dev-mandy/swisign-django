-- auto-generated definition
create table api_key
(
    AK_seq      bigint auto_increment comment 'APIKey 시퀀스'
        primary key,
    CC_code     varchar(10)                            not null comment 'APIKey 유형 코드
ex) kakao',
    AK_key      varchar(100)                           not null comment 'APIKey API Key',
    AK_useYn    tinyint(1) default 1                   not null comment 'APIKey 사용 여부
0: 미사용
1: 사용',
    AK_deleteYn tinyint(1) default 0                   not null comment 'APIKey 삭제 여부
0: 미삭제
1: 삭제',
    AK_created  timestamp  default current_timestamp() not null comment 'APIKey 생성일시',
    AK_updated  timestamp  default current_timestamp() not null comment 'APIKey 수정일시',
    constraint api_key_AK_seq_uindex
        unique (AK_seq)
)
    comment 'API Key Data' collate = utf8mb3_unicode_ci;