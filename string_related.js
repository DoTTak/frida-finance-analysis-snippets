Java.performNow(function(){
    Java.use("java.lang.String").toString.implementation = function(){
        var retval = this.toString();
        console.log("[*] java.lang.String.toString() >> " + retval);
        return retval;
    }
});