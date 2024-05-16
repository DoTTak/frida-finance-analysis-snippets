Java.use("java.lang.System").exit.implementation = function () {
    console.log("[*] System.exit()")
    this.exit()
}

Java.use("android.app.Activity").finish.overload().implementation = function () {
    console.log("[*] Activity.finish()")
    this.finish()
}

Java.use("android.os.Process").killProcess.implementation = function (pid) {
    console.log("[*] Process.killProcess(" + pid + ")")
    this.killProcess(pid)
}

Interceptor.attach(Module.findExportByName(null, "exit"), function(args){
    var status = Memory.readInt(args[0])
    console.log("[*] exit("+status+")")
})

Interceptor.attach(Module.findExportByName(null, "kill"), function(args){
    var pid = parseInt(args[0], 16)
    var sig = args[1]
    console.log("[*] kill("+pid+", "+ sig +")")
})