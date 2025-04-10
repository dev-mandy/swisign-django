-- auto-generated definition
-- nicepay https://developers.nicepay.co.kr/manual-auth.php#parameter-cancel-response
create table pg_cancel_data
(
    PCD_seq          bigint auto_increment comment 'PG Cancel Data 시퀀스'
        primary key,
    PCD_resultCode   varchar(4)                            not null comment 'PG Cancel Data 결제결과코드',
    PCD_resultMsg    varchar(100)                          not null comment 'PG Cancel Data 결제결과메세지',
    PCD_cancelAmt    varchar(12)                           not null comment 'PG Cancel Data 취소 금액',
    PCD_mid          varchar(10)                           not null comment 'PG Cancel Data 상점 ID',
    PCD_moid         varchar(64)                           null comment 'PG Cancel Data 상점 주문번호',
    PCD_signature    varchar(500)                          null comment 'PG Cancel Data hex(sha256(TID+MID+CacelAmt+MerchantKey)), 위변조 검증 데이터',
    PCD_payMethod    varchar(10)                           null comment 'PG Cancel Data 결제수단',
    PCD_tid          varchar(30)                           null comment 'PG Cancel Data 거래ID',
    PCD_cancelDate   varchar(8)                            null comment 'PG Cancel Data 취소일자 (YYYYMMDD)',
    PCD_cancelTime   varchar(6)                            null comment 'PG Cancel Data 취소시간 (HHmmss)',
    PCD_cancelNum    varchar(8)                            null comment 'PG Cancel Data 취소번호',
    PCD_remainAmt    varchar(12)                           null comment 'PG Cancel Data 취소 후 잔액',
    PCD_mallReserved varchar(500)                          null comment 'PG Cancel Data 가맹점 여분 필드',
    PCD_created      timestamp default current_timestamp() not null comment 'PG Cancel Data 생성일',
    PCD_updated      timestamp default current_timestamp() null comment 'PG Cancel Data 수정일',
    constraint pg_cancel_data_PCD_seq_uindex
        unique (PCD_seq)
)
    comment 'PG Cancel Data 테이블' collate = utf8mb3_unicode_ci;

