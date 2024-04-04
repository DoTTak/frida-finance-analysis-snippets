Interceptor.attach(Module.findExportByName(null, "open"), {
    onEnter: function (args) {
        var path = Memory.readUtf8String(args[0]);
        console.log("[*] open("+path+")");
    },
    onLeave: function (retval) {}
});

Interceptor.attach(Module.findExportByName(null, "access"), {
    onEnter: function (args) {
        var path = Memory.readUtf8String(args[0]);
        console.log("[*] access("+path+")");
    },
    onLeave: function (retval) {}
});

Interceptor.attach(Module.findExportByName(null, "fopen"), {
    onEnter: function (args) {
        var path = Memory.readUtf8String(args[0]);
        var perm = Memory.readUtf8String(args[1]);
        console.log("[*] fopen("+path+", "+perm+")");
    },
    onLeave: function (retval) {}
});

Interceptor.attach(Module.findExportByName(null, "stat"), {
    onEnter: function (args) {
        var path = Memory.readUtf8String(args[0]);
        console.log("[*] stat("+path+")");
    },
    onLeave: function (retval) {}
});

Interceptor.attach(Module.findExportByName(null, "lstat"), {
    onEnter: function (args) {
        var path = Memory.readUtf8String(args[0]);
        console.log("[*] lstat("+path+")");
    },
    onLeave: function (retval) {}
});