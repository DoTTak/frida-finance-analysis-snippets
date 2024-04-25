/**
 * Example)
 * [Client(frida)]
 * sendRequest("http://192.168.2.176", {"key1":"value1", "key2":"value2"})
 * 
 * [Server]
 * POST / HTTP/1.1
 * Content-Type: application/json; utf-8
 * User-Agent: Dalvik/2.1.0 (Linux; U; Android 9; SM-G950N Build/PPR1.180610.011)
 * Host: 192.168.2.176
 * Connection: Keep-Alive
 * Accept-Encoding: gzip
 * Content-Length: 33
 * 
 * {"key1":"value1","key2":"value2"}
 */
function sendRequest(url, data){
    Java.perform(function () {
        const Runnable = Java.use('java.lang.Runnable');
        const MyRunnable = Java.registerClass({
            name: 'DoTTak',
            implements: [Runnable],
            methods: {
                'run': function () {
                    
                    try {
                        const URL = Java.use("java.net.URL").$new(url)
                        const HttpURLConnection = Java.use("java.net.HttpURLConnection")
                        const Connect = Java.cast(URL.openConnection(), HttpURLConnection)
        
                        Connect.setRequestMethod("POST")
                        Connect.setRequestProperty("Content-Type", "application/json; utf-8");
                        Connect.setDoOutput(true);
                        Connect.setDoInput(true);
        
                        let sender = Connect.getOutputStream()
                        sender.write(Java.use("java.lang.String").$new(JSON.stringify(data)).getBytes("UTF-8"))
                        sender.flush()
        
                        try {
                            const InputStream = Connect.getInputStream();
                            const InputStreamReader = Java.use("java.io.InputStreamReader").$new(InputStream, "UTF-8")
                            const Builder = Java.use("java.lang.StringBuilder").$new()
                            const Reader = Java.use("java.io.BufferedReader").$new(InputStreamReader)
        
                            let line;
                            while ((line = Reader.readLine()) != null) {
                                Builder.append(line + "\n");
                            }
    
                            console.log("[*] Response:")
                            console.log(Builder)
    
                        } catch (error) {
                            console.error(error)
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
            }
        });
        
        var Thread = Java.use("java.lang.Thread")
        var runnable = MyRunnable.$new();
        var t = Thread.$new.overload('java.lang.Runnable').call(Java.use("java.lang.Thread"), runnable)
        t.start()
    })
}