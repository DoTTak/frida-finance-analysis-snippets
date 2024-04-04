Interceptor.attach(Module.findExportByName(null, "open"), {
    onEnter: function (args) {
        var path = Memory.readUtf8String(args[0])
        console.log("[*] open("+path+")")
    },
    onLeave: function (retval) {}
});

Interceptor.attach(Module.findExportByName(null, "access"), {
    onEnter: function (args) {
        var path = Memory.readUtf8String(args[0])
        console.log("[*] access("+path+")")
    },
    onLeave: function (retval) {}
});
