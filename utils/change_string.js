/**
 * Example) 
 * var target = "/data/local/tmp/re.frida.server/frida-agent-64.so"
 * var result = changeString(target , ["/data/local/tmp", "frida"], "FAKE")
 * console.log(result) // FAKE/re.FAKE.server/FAKE-agent-64.so
 */
function changeString(string, search_arr, change) {
    var before = string;
    for (var i = 0; i < search_arr.length; i++) {
        var search = search_arr[i];
        while (true) {
            if (before.indexOf(search) > -1) {
                var after = "";
                var sub = before.indexOf(search);
                after = before.substring(0, sub) + change + before.substring(sub + search.length);
                before = after;
            } else {
                break;
            }
        }
    }
    return before
}