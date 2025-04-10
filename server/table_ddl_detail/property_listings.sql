-- auto-generated definition
create table property_listings
(
    pl_seq                bigint auto_increment comment 'Property Listings 시퀀스'
        primary key,
    pl_status             varchar(10) collate utf8mb4_unicode_ci default 'request'           not null comment 'Property Listings 매물 진행 상태
request: 요청
post: 등록
ing: 진행
done: 완료
cancel: 취소',
    pl_document_num       varchar(25) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 문서확인번호',
    pl_unique_num         varchar(25) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 고유번호',
    pl_address            varchar(50) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 주소',
    pl_jibun              varchar(10) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 지번',
    pl_road_address       varchar(50) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 도로명주소',
    pl_building_type      varchar(10) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 건물 유형 *choices*',
    pl_total_floor        tinyint                                default 0                   not null comment 'Property Listings 총 층수',
    pl_total_ho           smallint                               default 0                   not null comment 'Property Listings 총 호수',
    pl_total_household    smallint                               default 0                   not null comment 'Property Listings 총 세대수',
    pl_floor              tinyint                                default 0                   not null comment 'Property Listings 해당 매물 층',
    pl_ho                 varchar(10) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 해당 매물 호',
    pl_area               decimal(6, 2)                                                      not null comment 'Property Listings 면적 (총 6자리 중 2자리 소수점)',
    pl_common_area        decimal(6, 2)                                                      not null comment 'Property Listings 공용 면적 (총 6자리 중 2자리 소수점)',
    pl_issue_date         datetime                                                           not null comment 'Property Listings 문서 발급일',
    pl_issuer             varchar(20) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 발급기관',
    pl_contract_type      varchar(10) collate utf8mb4_unicode_ci                             not null comment 'Property Listings 전세/월세 *choices*',
    pl_deposit            int                                    default 0                   not null comment 'Property Listings 보증금',
    pl_monthly_rent       int                                    default 0                   not null comment 'Property Listings 월세',
    pl_maintenance_fee_yn tinyint(1)                             default 1                   not null comment 'Property Listings 관리비 여부
0: 불가능
1: 가능',
    pl_maintenance_fee    longtext collate utf8mb4_bin           default 0                   not null comment 'Property Listings 관리비 (항목별로 입력해야 할 것 같아 json)',
    pl_parking_yn         tinyint(1)                             default 1                   not null comment 'Property Listings 주차가능여부
0: 불가능
1: 가능',
    pl_parking_fee        int                                    default 0                   not null comment 'Property Listings 주차비',
    pl_loan_yn            tinyint(1)                             default 1                   not null comment 'Property Listings 대출가능여부
0: 불가능
1: 가능',
    pl_loan               int                                    default 0                   not null comment 'Property Listings 대출가능상품
예시
0: 가능상품없음
1: 카카오전세대출
2: hug
4: ...',
    pl_move_in_now_yn     tinyint(1)                             default 0                   not null comment 'Property Listings 즉시 입주 가능 여부
0: 불가능 (날짜선택)
1: 가능',
    pl_move_in_date       datetime                               default current_timestamp() not null comment 'Property Listings 입주 가능 날짜 (즉시 가능은 Now())',
    pl_etc                varchar(500) collate utf8mb4_unicode_ci                            null comment 'Property Listings 비고',
    c_seq_landlord        bigint                                                             not null comment 'Property Listings 임대인 회원 번호',
    c_seq_agent           bigint                                                             not null comment 'Property Listings 중개인 회원 번호',
    pl_created            datetime                               default current_timestamp() not null comment 'Property Listings 등록일',
    pl_updated            datetime                               default current_timestamp() not null comment 'Property Listings 수정일',
    pl_views              int                                    default 0                   not null comment 'Property Listings 조회수',
    pl_view_yn            tinyint(1)                             default 1                   not null comment 'Property Listings 노출 여부
0: 숨김
1: 노출',
    pl_deleted_yn         tinyint(1)                             default 0                   not null comment 'Property Listings 삭제 여부
0: 삭제안됨
1: 삭제됨',
    pl_deleted            datetime                               default current_timestamp() not null comment 'Property Listings 삭제일',
    constraint property_listings_pl_seq_uindex
        unique (pl_seq),
    constraint pl_maintenance_fee
        check (json_valid(`pl_maintenance_fee`))
)
    comment '매물 리스트' collate = utf8mb3_unicode_ci;

