/**
 * Usage
 * 1. Create the Directory in /data/data/<PACKAGE_NAME>/dumps
 * 2. set permision ex) chmod 777 /data/data/<PACKAGE_NAME>/dumps
 * 
 * Ref. https://github.com/dstmath/frida-unpack
 */
const PACKAGE_NAME = "";
var count = 0;
var openmemory = Module.findExportByName("libart.so", "_ZN3art16ArtDexFileLoader10OpenCommonEPKhmS2_mRKNSt3__112basic_stringIcNS3_11char_traitsIcEENS3_9allocatorIcEEEEjPKNS_10OatDexFileEbbPS9_NS3_10unique_ptrINS_16DexFileContainerENS3_14default_deleteISH_EEEEPNS_13DexFileLoader12VerifyResultE");
console.log("openmemory addr: " + openmemory);
Interceptor.attach(openmemory, {
    onEnter: function (args) {
        var begin = this.context.x0
        console.log("[*] dex dump(magic: " + Memory.readUtf8String(begin) + ")");
        var address = parseInt(begin, 16) + 0x20;
        var dex_size = Memory.readInt(ptr(address));
        console.log("[*] index :" + count)
        console.log("[*] dex_size :" + dex_size)
        var file = new File("/data/data/" + PACKAGE_NAME + "/dumps/" + count + "_" + dex_size + ".dex", "wb")
        file.write(Memory.readByteArray(begin, dex_size));
        file.flush();
        file.close();
        count++;
    },
    onLeave: function (retval) {
    }
});