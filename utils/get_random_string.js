function getRandomString(num, elements="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"){
    let result = '';
    for (let i = 0; i < num; i++) {
        result += elements.charAt(Math.floor(Math.random() * elements.length));
    }
    return result;
}