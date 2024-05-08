Interceptor.attach(Module.findExportByName(null, "dlopen"), {
    onEnter: function(args){
        let lib = Memory.readUtf8String(args[0]);
        this.lib = lib.split("/")[lib.split("/").length - 1];
    },
    onLeave: function(retval){
        let lib_base = Module.findBaseAddress(this.lib);
        console.log("[*] dlopen("+this.lib+":"+lib_base+")");
        
        // Use the following code when hooking at a specific offset of the loaded library.
        // Interceptor.attach(ptr(lib_base).add(0x1234), {
        //     onEnter: function (args) {
        //     },
        //     onLeave: function (retval) {
        //     }
        // })
    }
});

Interceptor.attach(Module.findExportByName(null, "android_dlopen_ext"), {
    onEnter: function(args){
        let lib = Memory.readUtf8String(args[0]);
        this.lib = lib.split("/")[lib.split("/").length - 1];
    },
    onLeave: function(retval){
        let lib_base = Module.findBaseAddress(this.lib);
        console.log("[*] android_dlopen_ext("+this.lib+":"+lib_base+")");

        // Use the following code when hooking at a specific offset of the loaded library.
        // Interceptor.attach(ptr(lib_base).add(0x1234), {
        //     onEnter: function (args) {
        //     },
        //     onLeave: function (retval) {
        //     }
        // })
    }
});