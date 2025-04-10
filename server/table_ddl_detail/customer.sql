-- auto-generated definition
create table customer
(
    c_seq                   bigint auto_increment comment 'Customer 시퀀스 넘버'
        primary key,
    c_name                  varchar(100)                           null,
    c_id                    varchar(100)                           not null comment 'Customer ID (암호화)',
    c_sns_id                varchar(100)                           null comment 'Customer SNS 회원가입 시 넘겨받은 ID',
    c_phone                 varchar(100)                           not null comment 'Customer 핸드폰 번호 (암호화)',
    c_ci                    varchar(500)                           not null comment 'Customer 핸드폰 인증 CI',
    c_di                    varchar(500)                           not null comment 'Customer 핸드폰 인증 DI',
    c_password              varchar(500)                           not null comment 'Customer 비밀번호 (암호화)',
    c_account_type          tinyint(1) default 1                   not null comment 'Customer 계정 유형
1: 일반
2: 카카오
3: 네이버
4: 구글
5: 애플',
    c_road_address          varchar(500)                           null comment 'Customer 도로명 주소',
    c_bunji_address         varchar(500)                           null comment 'Customer 구주소',
    c_detail_address        varchar(500)                           null comment 'Customer 상세주소',
    c_post_code             varchar(10)                            null comment 'Customer 우편번호',
    c_email                 varchar(100)                           null comment 'Customer 이메일 (암호화)',
    c_gender                char                                   null comment 'Customer 성별
M:남성
W:여성',
    c_swisign_bit           smallint   default 0                   not null comment 'Customer 전자계약 이용 설정
0: 선택안함
1: 임차인
2: 임대인
4: 중개인
8: 기타',
    c_house_bit             smallint   default 0                   not null comment 'Customer 주택 유형
0: 선택안함
1: 자가
2: 전세
4: 월세
8: 기타',
    c_use_term_agree        tinyint(1) default 1                   not null comment 'Customer 이용 약관 동의 여부
0: 미동의
1: 동의',
    c_privacy_term_agree    tinyint(1) default 1                   not null comment 'Customer 개인정보 수집 및 이용동의 여부
0: 미동의
1: 동의',
    c_promotion_agree       tinyint(1) default 1                   not null comment 'Customer 프로모션 정보 수신 동의 여부
0: 미동의
1: 동의',
    c_created               timestamp  default current_timestamp() not null comment 'Customer 생성일시',
    c_updated               timestamp  default current_timestamp() not null comment 'Customer 수정일시',
    c_last_logged_in        timestamp  default current_timestamp() not null comment 'Customer 마지막 로그인일시',
    c_last_password_changed timestamp  default current_timestamp() not null comment 'Customer 마지막 비밀번호 변경일시',
    c_delete_yn             tinyint(1) default 0                   not null comment 'Customer 삭제여부 (soft delete 방식 사용 시)
0: 정상회원
1: 삭제회원',
    c_sleep_yn              tinyint(1) default 0                   not null comment 'Customer 휴면 여부
0: 정상회원
1: 휴면회원',
    constraint customer_C_seq_uindex
        unique (c_seq)
)
    comment '고객 테이블' collate = utf8mb3_unicode_ci;

