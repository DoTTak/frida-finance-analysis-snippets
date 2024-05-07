/**
 * [output]
[*] Custom CModule Information
{
    "hello": "0x72228bc000",
    "log": "0x72228c6048",
    "_etext": "0x72228bc04c",
    "_edata": "0x72228bc099",
    "_end": "0x72228bc0a0",
    "__preinit_array_start": "0x72228bc0a0",
    "__preinit_array_end": "0x72228bc0a0",
    "__init_array_start": "0x72228bc0a0",
    "__init_array_end": "0x72228bc0a0",
    "__fini_array_start": "0x72228bc0a0",
    "__fini_array_end": "0x72228bc0a0",
    "_GLOBAL_OFFSET_TABLE_": "0x72228bc0a0",
    "log@plt": "0x72228bc070"
}
[*] Code->log(Hello World from CModule)
 */

const code = `
#include <gum/guminterceptor.h>

extern void log (const gchar * message);

void hello(void) {
    log("Hello World from CModule");
}
`
const cm = new CModule(code,{
    log: new NativeCallback(function(msg){
        console.warn("[*] Code->log("+msg.readUtf8String()+")");
    }, "void", ["pointer"])
});

const hello = new NativeFunction(cm.hello, 'void', []);
console.log("[*] Custom CModule Information")
console.log(JSON.stringify(cm, null, 4))
hello();