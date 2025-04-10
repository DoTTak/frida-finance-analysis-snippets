/**
 * Dump memory from a given address to a file.
 * 
 * @param {NativePointer|String} addr      - The base address to start dumping from (e.g., '0x77070a3000').
 * @param {Number} length                  - Number of bytes to dump.
 * @param {String} dumpPath                - File path to save the dump (must be writable by the app).
 * @param {Boolean} isHex [default=false]  - If true, output as hex string (hexdump), else write raw binary.
 *
 * Notes:
 * - When isHex is true, the memory content is written as a formatted hex string.
 * - When isHex is false, raw binary data is written.
 * - If memory cannot be read, the function logs an error and exits.
 * 
 * Usage examples:
 * dumpMemory('0x77070a3000', 0x100, '/data/data/<package_name>/files/dump.bin', false);
 * dumpMemory('0x77070a3000', 0x100, '/data/data/<package_name>/files/dump.txt', true);
 */
function dumpMemory(addr, length, dumpPath, isHex = false) {
    try {
        let data = "";
        let mode = "wb"
        
        if (isHex){
            data = hexdump(addr, {
                offset: 0,
                length: length,
                header: true,
                ansi: false
            })
            mode = "wt"
        } else {
            data = Memory.readByteArray(addr, length);
            if (data === null) {
                console.log("[*] Failed Read Memory");
                return;
            }
        }

        const file = new File(dumpPath, mode);
        file.write(data);
        file.flush();
        file.close();
        console.log(`[*] Memory dumped to ${dumpPath}`);

    } catch (e) {
        console.error("[*] Error:", e);
    }
}
