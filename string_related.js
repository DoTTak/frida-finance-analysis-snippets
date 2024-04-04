Java.performNow(function(){
    Java.use("java.lang.String").toString.implementation = function(){
        var retval = this.toString();
        console.log("[*] java.lang.String.toString() >> " + retval);
        return retval;
    }
});

Interceptor.attach(Module.findExportByName(null, "strstr"), {
    onEnter: function (args) {
        var haystack = Memory.readUtf8String(args[0])
        var needle = Memory.readUtf8String(args[1])
        console.log("[*] strstr("+haystack+", "+needle+")")
    },
    onLeave: function (retval) {}
});

Interceptor.attach(Module.findExportByName(null, "memmem"), {
    onEnter: function (args) {
        var haystack = Memory.readUtf8String(args[0])
        var haystacklen = args[1]
        var needle = Memory.readUtf8String(args[2])
        var needlelen = args[3]
        console.log("[*] memmem("+haystack+", "+haystacklen+", "+needle+", "+needlelen+")")
    },
    onLeave: function (retval) {}
});