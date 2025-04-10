-- auto-generated definition
-- codef.io https://developer.codef.io/products/public/each/mw/building-register-set
create table building_register_set
(
    BRS_seq                     bigint auto_increment comment 'Building Register Set 시퀀스'
        primary key,
    BRS_resUserAddr             varchar(1000)                         not null comment 'Building Register Set 주소 [대지위치]',
    BRS_resOriGinalData         longtext                              null comment 'Building Register Set 원문 DATA [PDF파일 Base64값
* originDataYN="1"인 경우 포함]',
    BRS_resIssueDate            varchar(10)                           not null comment 'Building Register Set 발급일자 [YYYYMMDD]',
    BRS_resIssueOgzNm           varchar(100)                          not null comment 'Building Register Set 발급기관',
    BRS_resNote                 varchar(1000)                         not null comment 'Building Register Set 비고 [그 밖의 기재사항]',
    BRS_resDocNo                longtext                              not null comment 'Building Register Set 문서확인번호',
    BRS_resReceiptNo            longtext                              not null comment 'Building Register Set 접수번호 [정부24접수번호]',
    BRS_resNumber               varchar(100)                          not null comment 'Building Register Set 호수 [호수/가구수/세대수]',
    BRS_commUniqueNo            longtext                              not null comment 'Building Register Set 고유번호',
    BRS_commAddrRoadName        varchar(1000)                         not null comment 'Building Register Set 도로명주소',
    BRS_commAddrLotNumber       varchar(1000)                         not null comment 'Building Register Set 지번주소',
    BRS_resAddrDong             varchar(100)                          null comment 'Building Register Set 동 명칭',
    BRS_resLicenseClassList     longtext                              null comment 'Building Register Set 면허종별 List',
    BRS_resDetailList           longtext                              null comment 'Building Register Set 상세내역 List',
    BRS_resChangeList           longtext                              null comment 'Building Register Set 변동사항 List',
    BRS_resBuildingStatusList   longtext                              null comment 'Building Register Set 건축물 현황 List',
    BRS_resParkingLotStatusList longtext                              null comment 'Building Register Set 주차장 현황 List',
    BRS_resAuthStatusList       longtext                              null comment 'Building Register Set 인증 현황 List',
    BRS_resViolationStatus      varchar(10)                           null comment 'Building Register Set 위반 상태 [위반건축물일 경우 "위반건축물"]',
    BRS_created                 timestamp default current_timestamp() not null comment 'Building Register Set 등록일시',
    BRS_updated                 timestamp default current_timestamp() not null comment 'Building Register Set 수정일시',
    constraint building_register_set_BRS_seq_uindex
        unique (BRS_seq),
    constraint BRS_resAuthStatusList
        check (json_valid(`BRS_resAuthStatusList`)),
    constraint BRS_resBuildingStatusList
        check (json_valid(`BRS_resBuildingStatusList`)),
    constraint BRS_resChangeList
        check (json_valid(`BRS_resChangeList`)),
    constraint BRS_resDetailList
        check (json_valid(`BRS_resDetailList`)),
    constraint BRS_resLicenseClassList
        check (json_valid(`BRS_resLicenseClassList`)),
    constraint BRS_resParkingLotStatusList
        check (json_valid(`BRS_resParkingLotStatusList`))
)
    comment '집합건축물대장 표제부 API' collate = utf8mb3_unicode_ci;

