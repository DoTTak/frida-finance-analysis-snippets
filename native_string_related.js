Interceptor.attach(Module.findExportByName(null, "strstr"), {
    onEnter: function (args) {
        var haystack = Memory.readUtf8String(args[0])
        var needle = Memory.readUtf8String(args[1])
        console.log("[*] strstr("+haystack+", "+needle+")")
        /* If you want to change result, use the code below. */
        // this.sw = true
    },
    onLeave: function (retval) {
        if(this.sw){
            retval.replace(0x0)
        }
    }
});

Interceptor.attach(Module.findExportByName(null, "memmem"), {
    onEnter: function (args) {
        var haystack = Memory.readUtf8String(args[0])
        var haystacklen = args[1]
        var needle = Memory.readUtf8String(args[2])
        var needlelen = args[3]
        console.log("[*] memmem("+haystack+", "+haystacklen+", "+needle+", "+needlelen+")")
        /* If you want to change result, use the code below. */
        // this.sw = true
    },
    onLeave: function (retval) {
        if(this.sw){
            retval.replace(0x0)
        }
    }
});