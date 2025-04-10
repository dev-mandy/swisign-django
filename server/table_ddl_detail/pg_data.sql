-- auto-generated definition
-- nicepay https://developers.nicepay.co.kr/manual-auth.php#parameter-api-response
create table pg_data
(
    PD_seq              bigint auto_increment comment 'PG Data 시퀀스'
        primary key,
    PD_resultCode       varchar(4)                            not null comment 'PG Data 성공코드',
    PD_resultMsg        varchar(100)                          not null comment 'PG Data 결과메세지 (euc-kr)',
    PD_amt              varchar(12)                           not null comment 'PG Data 금액 12자리',
    PD_mid              varchar(10)                           not null comment 'PG Data 상점 ID',
    PD_moid             varchar(64)                           not null comment 'PG Data 상점주문번호',
    PD_signature        varchar(500)                          not null comment 'PG Data hex(sha256(TID+MID+Amt+MerchantKey)), 위변조 검증 데이터',
    PD_buyerEmail       varchar(60)                           null comment 'PG Data 구매자 메일주소',
    PD_buyerTel         varchar(20)                           not null comment 'PG Data 구매자 연락처',
    PD_buyerName        varchar(30)                           null comment 'PG Data 구매자 이름',
    PD_goodsName        varchar(40)                           not null comment 'PG Data 상품명',
    PD_tid              varchar(30)                           not null comment 'PG Data 거래ID',
    PD_authCode         varchar(30)                           not null comment 'PG Data 승인 번호',
    PD_authDate         varchar(12)                           not null comment 'PG Data 승인 날짜(YYYYMMDDHHMMSS)',
    PD_payMethod        varchar(10)                           null comment 'PG Data 결제수단',
    PD_mallReserved     varchar(500)                          null comment 'PG Data 가맹점 여분 필드',
    PD_cardCode         varchar(3)                            null comment 'PG Data 결제 카드사 코드',
    PD_cardName         varchar(20)                           null comment 'PG Data 결제 카드사 이름',
    PD_cardNo           varchar(20)                           null comment 'PG Data 카드번호',
    PD_cardQuota        varchar(2)                            null comment 'PG Data 할부개월',
    PD_cardInterest     varchar(1)                            null comment 'PG Data 상점분담 무이자 적용 여부
0: 미적용
1: 적용',
    PD_AcquCardCode     varchar(3)                            null comment 'PG Data 매입 카드사 코드',
    PD_AcquCardName     varchar(100)                          null comment 'PG Data 매입 카드사 이름',
    PD_cardCl           varchar(1)                            null comment 'PG Data 카드 구분
0: 신용
1: 체크',
    PD_ccPartCl         varchar(2)                            null comment 'PG Data 부분취소 가능 여부
0: 불가능
1: 가능',
    PD_cardType         varchar(2)                            null comment 'PG Data 카드 형태
01: 개인
02: 법인
03: 해외',
    PD_clickplayCl      varchar(2)                            null comment 'PG Data 간편결제구분
6: SKPAY
7: SSGPAY
8: SAMSUNGPAY(구버전)
15: PAYCO
16: KAKAOPLAY
18: LPAY
20: NAVERPAY
21: SAMSUNGPAY
22: APPLEPAY',
    PD_couponAmt        varchar(12)                           null comment 'PG Data 쿠폰 금액',
    PD_couponMinAmt     varchar(12)                           null comment 'PG Data 쿠폰 최소금액',
    PD_pointAppAmt      varchar(12)                           null comment 'PG Data 포인트 승인금액',
    PD_multiCl          varchar(1)                            null comment 'PG Data 복합결제 여부
0: 복합결제 미사용
1: 복합결제 사용',
    PD_multiCardAcquAmt varchar(12)                           null comment 'PG Data 복합결제 신용카드 금액',
    PD_multiPointAmt    varchar(12)                           null comment 'PG Data 복합결제 포인트 금액',
    PD_multiCouponAmt   varchar(12)                           null comment 'PG Data 복합결제 쿠폰 금액',
    PD_multiRcptAmt     varchar(12)                           null comment 'PG Data 페이코 머니 거래건 현금영수증 발급 대상 금액',
    PD_rcptType         varchar(1)                            null comment 'PG Data 현금영수증 타입
1: 소득공제
2: 지출증빙
이외 발행안함',
    PD_rcptTID          varchar(30)                           null comment 'PG Data 현금영수증TID',
    PD_rcptAuthCode     varchar(30)                           null comment 'PG Data 현금영수증 승인번호',
    PD_vbankBankCode    varchar(3)                            null comment 'PG Data 결제은행코드 (가상계좌)',
    PD_vbankBankName    varchar(20)                           null comment 'PG Data 결제은행명 (euc-kr) (가상계좌)',
    PD_vbankNum         varchar(20)                           null comment 'PG Data 가상계좌번호 (가상계좌)',
    PD_vbankExpDate     varchar(8)                            null comment 'PG Data 가상계좌 입금만료일 (yyyyMMdd) (가상계좌)',
    PD_vbankExpTime     varchar(6)                            null comment 'PG Data 가상계좌 입금만료시간(HHmmss) (가상계좌)',
    PD_bankCode         varchar(3)                            null comment 'PG Data 결제은행코드 (계좌이체)',
    PD_bankName         varchar(20)                           null comment 'PG Data 결제은행명 (euc-kr) (계좌이체)',
    PD_created          timestamp default current_timestamp() not null comment 'PG Data 생성일',
    PD_updated          timestamp default current_timestamp() not null comment 'PG Data 수정일',
    constraint pg_data_PD_seq_uindex
        unique (PD_seq)
)
    comment 'PG Data' collate = utf8mb3_unicode_ci;

