-- auto-generated definition
create table api_log
(
    AL_seq          bigint auto_increment
        primary key,
    AL_tableName    varchar(50)                           not null comment 'API Log 테이블 명',
    AL_apiName      varchar(100)                          not null comment 'API Log API 명',
    AL_successCount bigint    default 0                   not null comment 'API Log 성공데이터수',
    AL_failCount    bigint    default 0                   not null comment 'API Log 실패데이터수',
    AL_memo         varchar(500)                          null comment 'API Log 비고',
    AL_created      timestamp default current_timestamp() not null comment 'API Log 생성일',
    AL_updated      timestamp default current_timestamp() not null comment 'API Log 수정일',
    constraint api_log_AL_seq_uindex
        unique (AL_seq)
)
    comment 'API Log' collate = utf8mb3_unicode_ci;

