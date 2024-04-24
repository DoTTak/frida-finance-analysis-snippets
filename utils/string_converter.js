/**
 * Example)
 * string2Bin("Hello");
 * >> [72,101,108,108,111]
 */
/* Ref. https://hacksms.tistory.com/14 */
function string2Bin(str) {
    var result = [];
    for (var i = 0; i < str.length; i++) {
        result.push(str.charCodeAt(i));
    }
    return result;
}
/**
 * Example)
 * bin2String([72,101,108,108,111]);
 * >> "Hello"
 */
/* Ref. https://hacksms.tistory.com/14 */
function bin2String(array) {
    return String.fromCharCode.apply(String, array);
}