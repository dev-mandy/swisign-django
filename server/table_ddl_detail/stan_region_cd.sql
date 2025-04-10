-- auto-generated definition
-- data.go.kr https://www.data.go.kr/data/15077871/openapi.do
create table stan_region_cd
(
    SRC_seq             bigint auto_increment
        primary key,
    SRC_regionCd        varchar(10)                           not null comment 'Standard Region Code 지역코드',
    SRC_sidoeCd         varchar(2)                            not null comment 'Standard Region Code 시도코드',
    SRC_sggCd           varchar(3)                            not null comment 'Standard Region Code 시군구코드',
    SRC_umdCd           varchar(3)                            not null comment 'Standard Region Code 읍면동코드',
    SRC_riCd            varchar(2)                            null comment 'Standard Region Code 리코드',
    SRC_locationjuminCd varchar(10)                           null comment 'Standard Region Code 지역코드-주민',
    SRC_locationjijukCd varchar(10)                           not null comment 'Standard Region Code 지역코드-지적',
    SRC_locataddNm      varchar(50)                           not null comment 'Standard Region Code 지역주소명',
    SRC_locatOrder      varchar(3)                            null comment 'Standard Region Code 서열',
    SRC_locatRm         varchar(200)                          null comment 'Standard Region Code 비고',
    SRC_locathighCd     varchar(10)                           null comment 'Standard Region Code 상위지역코드',
    SRC_locallowNm      varchar(20)                           null comment 'Standard Region Code 최하위지역명',
    SRC_adptDe          varchar(8)                            null comment 'Standard Region Code 생성일',
    SRC_created         timestamp default current_timestamp() not null comment 'Standard Region Code 생성일',
    SRC_updated         timestamp default current_timestamp() not null comment 'Standard Region Code 수정일'
)
    comment '법정동코드' collate = utf8mb3_unicode_ci;

