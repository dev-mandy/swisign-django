/**
 * 3자리 콤마
 * @param value
 * @returns {string}
 */
function priceComma(value) {
    const price = typeof value === "string" ? value : String(value)
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 금액을 한글로
 * @param value
 * @param addString
 * 전달받은 수만큼 뒤에 0을 추가
 * ex) value = 10, addString = 3
 * result = 10000
 * @returns {string}
 */
function priceToKorean(value, addString = 0) {
    const price = value.padStart(value.length + addString, '0');
    let result = '';
    let digits = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    let units = ['', '십', '백', '천', '만', '십만', '백만', '천만', '억', '십억', '백억', '천억', '조', '십조', '백조', '천조'];

    let numStr = price.toString(); // 문자열로 변환
    let numLen = numStr.length; // 문자열의 길이

    for (let i = 0; i < numLen; i++) {
        let digit = parseInt(numStr.charAt(i)); // i번째 자릿수 숫자
        let unit = units[numLen - i - 1]; // i번째 자릿수 단위

        // 일의 자리인 경우에는 숫자를 그대로 한글로 변환
        if (i === numLen - 1 && digit === 1 && numLen !== 1) {
            result += '일';
        } else if (digit !== 0) { // 일의 자리가 아니거나 숫자가 0이 아닐 경우
            result += digits[digit] + unit;
        } else if (i === numLen - 5) { // 십만 단위에서는 '만'을 붙이지 않습니다.
            result += '만';
        }
    }

    return result;
}

export {priceComma, priceToKorean}