-- auto-generated definition
create table realty_listings
(
    rl_seq                  bigint auto_increment comment 'Realty Listings 시퀀스'
        primary key,
    rl_status               varchar(10) collate utf8mb4_unicode_ci default 'request'           not null comment 'Realty Listings 매물 진행 상태
request: 요청
post: 등록
ing: 진행
done: 완료
cancel: 취소',
    rl_document_num         varchar(25) collate utf8mb4_unicode_ci                             not null comment 'Realty Listings 문서확인번호',
    rl_unique_num           varchar(25) collate utf8mb4_unicode_ci                             not null comment 'Realty Listings 고유번호',
    rl_address              varchar(50) collate utf8mb4_unicode_ci                             not null comment 'Realty Listings 주소',
    rl_jibun                varchar(10) collate utf8mb4_unicode_ci                             not null comment 'Realty Listings 지번',
    rl_road_address         varchar(50) collate utf8mb4_unicode_ci                             not null comment 'Realty Listings 도로명주소',
    rl_building_type        varchar(10) collate utf8mb4_unicode_ci                             not null comment 'Realty Listings 건물 유형 *choices*',
    rl_total_floor          tinyint                                default 0                   not null comment 'Realty Listings 총 층수',
    rl_total_household      smallint                               default 0                   not null comment 'Realty Listings 총 세대수',
    rl_total_ho             smallint                               default 0                   not null comment 'Realty Listings 총 호수',
    rl_floor                tinyint                                default 0                   not null comment 'Realty Listings 해당 매물 층',
    rl_ho                   varchar(10) collate utf8mb4_unicode_ci                             not null comment 'Realty Listings 해당 매물 호',
    rl_area                 decimal(6, 2)                                                      not null comment 'Realty Listings 면적 (총 6자리 중 2자리 소수점)',
    rl_common_area          decimal(6, 2)                                                      not null comment 'Realty Listings 공용 면적 (총 6자리 중 2자리 소수점)',
    rl_issue_date           datetime                                                           not null comment 'Realty Listings 문서 발급일',
    rl_issuer               varchar(20) collate utf8mb4_unicode_ci                             not null comment 'Realty Listings 발급기관',
    rl_contract_type        varchar(10) collate utf8mb4_unicode_ci                             not null comment 'Realty Listings 전세/월세 *choices*',
    rl_deposit              int                                    default 0                   not null comment 'Realty Listings 보증금',
    rl_rent                 int                                    default 0                   not null comment 'Realty Listings 월세',
    rl_maintenance_is_fixed tinyint(1)                             default 1                   not null comment 'Realty Listings 관리비 고정 여부
0: 가변
1: 고정',
    rl_maintenance_fee      varchar(500) collate utf8mb4_bin       default '0'                 not null comment 'Realty Listings 관리비 고정 시 Number치환필요',
    rl_parking_yn           tinyint(1)                             default 1                   not null comment 'Realty Listings 주차가능여부
0: 불가능
1: 가능',
    rl_parking_fee          int                                    default 0                   not null comment 'Realty Listings 주차비',
    rl_loan_yn              tinyint(1)                             default 1                   not null comment 'Realty Listings 대출가능여부
0: 불가능
1: 가능',
    rl_move_in_now_yn       tinyint(1)                             default 0                   not null comment 'Realty Listings 즉시 입주 가능 여부
0: 불가능 (날짜선택)
1: 가능',
    rl_move_in_date         datetime                               default current_timestamp() not null comment 'Realty Listings 입주 가능 날짜 (즉시 가능은 Now())',
    rl_etc                  varchar(500) collate utf8mb4_unicode_ci                            null comment 'Realty Listings 비고',
    c_seq_landlord          bigint                                                             not null comment 'Property Listings 임대인 회원 번호',
    c_seq_agent             bigint                                                             not null comment 'Property Listings 중개인 회원 번호',
    rl_created              datetime                               default current_timestamp() not null comment 'Realty Listings 등록일',
    rl_updated              datetime                               default current_timestamp() not null comment 'Realty Listings 수정일',
    rl_views                int                                    default 0                   not null comment 'Realty Listings 조회수',
    rl_view_yn              tinyint(1)                             default 1                   not null comment 'Realty Listings 노출 여부
0: 숨김
1: 노출',
    rl_deleted_yn           tinyint(1)                             default 0                   not null comment 'Realty Listings 삭제 여부
0: 삭제안됨
1: 삭제됨',
    rl_deleted              datetime                               default current_timestamp() not null comment 'Realty Listings 삭제일',
    constraint property_listings_pl_seq_uindex
        unique (rl_seq)
)
    comment '매물 리스트' collate = utf8mb3_unicode_ci;

