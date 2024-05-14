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

Interceptor.attach(Module.findExportByName(null, "fgets"), {
    onEnter: function (args) {
        this.str = args[0]
        this.num = args[1]
        this.file = args[2]
    },
    onLeave: function (retval) {
        var str = Memory.readUtf8String(this.str)
        if (str != null) {
            console.log("[*] fgets() >> " + str)
            /* If you want to change result, use the code below. */
            // Memory.writeUtf8String(this.string, "FAKE")
        }
    }
});

Interceptor.attach(Module.findExportByName(null, "snprintf"), {
    onEnter: function (args) {
        this.buffer = args[0]
        this.size = args[1]
        this.format = args[2]
    },
    onLeave: function (retval) {
        var buffer = Memory.readUtf8String(this.buffer)
        if (buffer != null) {
            console.log("[*] snprintf() >> " + buffer)
            /* If you want to change result, use the code below. */
            // Memory.writeUtf8String(this.buffer, "FAKE")
        }
    }
})

Interceptor.attach(Module.findExportByName(null, "popen"), {
    onEnter: function (args) {
        var command = Memory.readUtf8String(args[0])
        var type = Memory.readUtf8String(args[1])
        console.log("[*] popen("+command+", "+type+")")
        /* If you want to change arguments, use the code below. */
        // var change_str = "FAKE"
        // var newCommand = Memory.alloc(change_str.length)
        // Memory.writeUtf8String(newCommand, change_str)
        // args[0] = newCommand
    },
    onLeave: function (retval) {
    }
})