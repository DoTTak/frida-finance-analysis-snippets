/**
 * Set proxy without 'Settings' Application.
 * However, if SSL Pinning is in place, communication through the proxy server may not be possible.
 */

/**  Change the HOST and PORT addresses */
var PROXY_HOST = "127.0.0.1";
var PROXY_PORT = "8080"; 

Java.use("java.lang.System").getProperty.overloads[1].implementation = function (key, def){
    var retval = this.getProperty(key, def);
    
    if(key.toLowerCase().indexOf("proxyhost") > -1 ){
        retval = PROXY_HOST;
        console.log("[*] System.getProperty("+key+", "+def+") >> " + retval)
    } else if (key.toLowerCase().indexOf("proxyport")){
        retval = PROXY_PORT;
        console.log("[*] System.getProperty("+key+", "+def+") >> " + retval)
    }

    return retval;
}
