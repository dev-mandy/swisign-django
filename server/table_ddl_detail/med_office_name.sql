-- auto-generated definition
-- data.go.kr https://www.data.go.kr/data/15107745/standard.do#tab_layer_open
create table med_office_name
(
    MON_seq             bigint auto_increment comment 'Med Office Name 시퀀스'
        primary key,
    MON_medOfficeNm     varchar(100)                          not null comment 'Med Office Name 중개사무소명',
    MON_estblRegNo      varchar(100)                          not null comment 'Med Office Name 개설등록번호',
    MON_opbizLreaClscSe varchar(100)                          null comment 'Med Office Name 개업공인중개사종별구분',
    MON_lctnRoadNmAddr  varchar(1000)                         null comment 'Med Office Name 소재지도로명주소',
    MON_lctnLotnoAddr   varchar(1000)                         null comment 'Med Office Name 소재지지번주소',
    MON_telno           varchar(15)                           null comment 'Med Office Name 전화번호',
    MON_estblRegYmd     varchar(11)                           null comment 'Med Office Name 개설등록일자',
    MON_ddcJoinYn       varchar(1)                            null comment 'Med Office Name 공제가입유무 [Y,N]',
    MON_rprsvNm         varchar(10)                           null comment 'Med Office Name 대표자명',
    MON_latitude        varchar(100)                          null comment 'Med Office Name 위도',
    MON_longitude       varchar(100)                          not null comment 'Med Office Name 경도',
    MON_medSpmbrCnt     varchar(100)                          not null comment 'Med Office Name 중개보조원수',
    MON_ogdpLreaCnt     varchar(100)                          null comment 'Med Office Name 소속공인중개사수',
    MON_hmpgAddr        varchar(100)                          null comment 'Med Office Name 홈페이지주소',
    MON_crtrYmd         varchar(11)                           null comment 'Med Office Name 데이터기준일자',
    MON_insttCode       varchar(15)                           null comment 'Med Office Name 제공기관코드',
    MON_insttNm         varchar(20)                           null comment 'Med Office Name 제공기관기관명',
    MON_created         timestamp default current_timestamp() not null comment 'Med Office Name 생성일시',
    MON_updated         timestamp default current_timestamp() not null comment 'Med Office Name 수정일시',
    constraint med_office_name_MON_seq_uindex
        unique (MON_seq)
)
    comment '전국공인중개사 사무소 표준 데이터 API' collate = utf8mb3_unicode_ci;

