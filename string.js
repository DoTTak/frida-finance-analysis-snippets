Java.performNow(function(){
    Java.use("java.lang.String").toString.implementation = function(){
        var retval = this.toString()
        return retval
    }
})