// Modify the code below
var PACKAGE_NAME = "com.example.app"
var LIB_NAME = "libDetect.so"

Java.perform(function () {
    const aFile = Java.use('java.io.File');
    const FileReader = Java.use('java.io.FileReader');
    const BufferedReader = Java.use('java.io.BufferedReader');

    var sourceFile = aFile.$new.overload('java.lang.String').call(aFile, '/proc/self/maps');
    var fileReader = FileReader.$new.call(FileReader, sourceFile);
    var reader = BufferedReader.$new.call(BufferedReader, fileReader);

    var data = null;
    var is_save = false;
    var file_path = "/data/data/"+PACKAGE_NAME+"/dump_" + LIB_NAME; // recommend creating a folder in advance to store files in the app directory.
    while ((data = reader.readLine()) != null) {
        if (data.indexOf(PACKAGE_NAME) > -1 && data.indexOf(LIB_NAME) > -1) {
            console.log("[*] dumping...", data);
            var addr = data.split(" ")[0].split("-");
            var start = parseInt("0x" + addr[0], 16);
            var end = parseInt("0x" + addr[1], 16);
            
            var file = new File(file_path, "ab");
            file.write(Memory.readByteArray(ptr(start), end - start));
            file.flush();
            file.close();

            is_save = true
        };
    };
    if(is_save){
        console.log("[*] Save Complete >> " + file_path)
    }
});