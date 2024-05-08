/**
 * Example)
 * check_address_in_maps(Module.findExportByName(null, "open"))
 * check_address_in_maps(ptr(0x7ff7ad8a60))
 * 
 * [*] The address(0x721da6fbd0) is included in the address range of the line below.
 * 721da69000-721da72000 r-xp 00025000 103:01 3436                          /system/lib64/libc.so
 * [*] The address(0x7ff7ad8a60) is included in the address range of the line below.
 * 7ff72df000-7ff7ade000 rw-p 00000000 00:00 0                              [stack]
 */
function check_address_in_maps(address){
    Java.performNow(function () {
        const aFile = Java.use('java.io.File');
        const FileReader = Java.use('java.io.FileReader');
        const BufferedReader = Java.use('java.io.BufferedReader');

        var sourceFile = aFile.$new.overload('java.lang.String').call(aFile, '/proc/self/maps');
        var fileReader = FileReader.$new.call(FileReader, sourceFile);
        var reader = BufferedReader.$new.call(BufferedReader, fileReader);

        var data = null;
        var is_save = false;
        while ((data = reader.readLine()) != null) {
            var addr = data.split(" ")[0].split("-");
            var start = parseInt("0x" + addr[0], 16);
            var end = parseInt("0x" + addr[1], 16);
            if((BigInt(start) < BigInt(parseInt(address, 16))) && (BigInt(parseInt(address, 16)) < BigInt(end))){
                console.log("[*] The address("+address+") is included in the address range of the line below.")
                console.log(data)
            }
        };
    });
}

