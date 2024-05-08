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
/**
 * Example)
 * bin2HexArr(string2Bin("Hello"))
 * >> ['48','65','6C','6C','6F']
 */
function bin2HexArr(array) {
    var result = [];
    for (var i = 0; i < array.length; ++i) {
        result.push((array[i] & 0xFF).toString(16).padStart(2, "0").toUpperCase());
    }
    return result;
}
/**
 * Example)
 * HexArr2String(['48','65','6C','6C','6F'])
 * >> Hello
 */
function HexArr2String(array) {
    return String.fromCharCode.apply(String, array.map(function(d){
        return parseInt(d, 16)
    }))
}