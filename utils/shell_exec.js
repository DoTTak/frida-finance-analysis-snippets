/**
 * NOTICE:
 * - You must call the function using the Java.perform() function.
 * 
 * Example) 
 * Java.perform(function(){
 *     shell_exec("id")
 * })
 * 
 * frida $ id
 * uid=1000(system) gid=1000(system) groups=1000(system),1002(bluetooth),1007(log),1023(media_rw),1024(mtp),1065(reserved_disk),2001(cache),3001(net_bt_admin),3002(net_bt),3003(inet),3007(net_bw_acct),3010(wakelock),3011(uhid),5050(vendor_secdir),9997(everybody),9997(everybody) context=u:r:system_app:s0
 */
function shell_exec(cmd) {
    console.log("frida $ "+cmd+"")
    var proc = Java.use("java.lang.Runtime").$new().exec(cmd)
    proc.waitFor()

    var BufferedReader = Java.use("java.io.BufferedReader")
    var InputStreamReader = Java.use("java.io.InputStreamReader").$new(proc.getInputStream())
    var buffer = BufferedReader.$new(InputStreamReader)
    var line = null;
    while ((line = buffer.readLine()) != null) {
        console.log(line)
    }
}