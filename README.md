# Frida-Snippets

Frida snippets for bypassing or analyzing anti-detection of Android financial applications

# Description

To bypass or analyze anti-detection on Android, typically, you should consider the following situations:

- File check
- String check
- ETC
    - PackageManager
    - command execute

Because, I think that anti-detection is a comparison of files or strings. However, there may be exceptions depending on the situation.

Anyway, this repository is a collection of scripts that include the functions I use to bypass or analyze detection in financial applications.

# Functions

> plan to continue updating.
> 

## Type: Strings

### Java [🔗source](/java_string_related.js)

| Package | Function | point | Type | Description |
| --- | --- | --- | --- | --- |
| `java.lang.String` | `toString()` | return | Analysis | Returns the representation of the string. |
| `java.lang.StringFactory` | `newStringFromCodePoints(int[] codePoints, int offset, int count)` | return | Analysis | Creates a string from the code point array. |
| `java.util.regex.Pattern` | `matches(String regex, CharSequence input)` | return | Bypass | Checks if the input matches the given regular expression. |
| `java.lang.System` | `getenv()` | return | Bypass | Retrieves the value of an environment variable. |
| `java.lang.Runtime` |	`exec(String command)` | `String command` | Bypass | Executes the specified system command. |
| `java.lang.String` |	`split(String regex)` | `String regex` | Analysis | Splits this string around matches of the given regular expression. |
| `java.io.BufferedReader` | `readLine()` | return | Bypass, Analysis | Reads a line of text from the input stream. |
### Native(C Library) [🔗source](/native_string_related.js)

| Function | point | Type | Description |
| --- | --- | --- | --- |
| `char *strstr(const char *haystack, const char *needle);` | `char *needle` | Bypass, Analysis | Searches for the needle string in haystack and returns its location. |
| `void *memmem(const void *haystack, size_t haystacklen, const void *needle, size_t needlelen);` | `void *needle` | Bypass, Analysis | Searches for the needle string in haystack and returns its location. |
| `char *fgets(char *str, int n, FILE *stream);` | `char *str` | Bypass, Analysis | Reads a line from the specified stream and stores it into the string pointed to by str. |
| `int snprintf(char *str, size_t size, const char *format, ...);` | `char *str` | Analysis | Writes formatted output to a string. |

## Type: File

### Native(C Library) [🔗source](/native_file_related.js)

| Function | point | Type | Description |
| --- | --- | --- | --- |
| `int open(const char *pathname, int flags);` | `char *pathname` | Bypass | Opens a file at the specified pathname. |
| `int access(const char *pathname, int mode);` | `char *pathname` | Bypass | Checks the file's accessibility at the specified pathname. |
| `FILE *fopen(const char *pathname, const char *mode);` | `char *pathname` | Bypass | Opens a file at the specified pathname with the specified mode. |
| `int stat(const char *pathname, struct stat *statbuf);` | `char *pathname` | Bypass | Retrieves the file status at the specified pathname. |
| `int lstat(const char *pathname, struct stat *statbuf);` | `char *pathname` | Bypass | Retrieves the file status at the specified pathname, without following symbolic links. |

## Type: Package [🔗source](/java_package_related.js)

| Package | Function | point | Type | Description |
| --- | --- | --- | --- | --- |
| `android.app.ApplicationPackageManager` | `getInstalledApplications(int falgs)` | return | Bypass | Retrieves all installed applications on the device. |
| `android.app.ApplicationPackageManager` | `getPackageInfo(String packageName, int flags)` | return | Bypass | Retrieves detailed information about the specified package. |
| `android.app.ApplicationPackageManager` | `getApplicationInfo(String packageName, int flags)` | return | Bypass | Retrieves detailed data about a single app. |

## Type: Reflection [🔗source](/java_reflect_related.js)

| Package | Function | point | Type | Description |
| --- | --- | --- | --- | --- |
| `java.lang.Class` | `getDeclaredField(String name)` | `name` | Analysis | Retrieves a Field object that reflects the specified declared field of the class or interface. |
| `java.lang.Class` | `forName(String className)` | `className` | Analysis | Returns the Class object associated with the class or interface with the given string name. |

# Utils

## android_terminate.js [🔗source](/utils/android_terminate.js)
In case the app is terminated due to anti-detection (for instance, rooting or Frida) after executing the app, scripts that have hooked app termination-related functions
<details>
<summary>Example Code</summary>

```sh
# Try it yourself.
```

</details>

## backtrace.js [🔗source](/utils/backtrace.js)
Frida provides a feature to print the backtrace of Java and Native code.
- `backtraceJava()` function: This function retrieves the current stack trace using Java's `android.util.Log.getStackTraceString` method. This information is used as input by creating a new `java.lang.Exception`. Then this function prints the backtrace information to the console.
- `backtraceNative()` function: This function uses Frida's `Thread.backtrace` method to print the backtrace of native code in the given context. `Backtracer.ACCURATE` is an option that improves the accuracy of the backtrace. After converting the address to a symbol using `DebugSymbol.fromAddress`, this is printed to the console.
<details>
<summary>Example Code</summary>

### Javascript
```js
Java.use("java.lang.String").toString.implementation = function(){
    var retval = this.toString()
    if(retval == "ko_KR"){
        console.warn("[*] toString() >> " + retval)
        backtraceJava() // Here
    }
    return retval
}

Interceptor.attach(Module.findExportByName(null, "open"), {
    onEnter: function(args){
        var path = Memory.readUtf8String(args[0])
        if(path == "/proc/meminfo"){
            console.warn("[*] open("+path+")")
            backtraceNative(this) // Here
        }
    }
})
```

### Console
```sh

# ...

[*] toString() >> ko_KR
Backtrace:
java.lang.Exception
        at java.lang.String.toString(Native Method)
        at org.json.JSONStringer.value(JSONStringer.java:252)
        at org.json.JSONObject.writeTo(JSONObject.java:723)
        at org.json.JSONObject.toString(JSONObject.java:692)
        at intermax.android.b.g.if(Unknown Source:30)
        at intermax.android.b.b$10.run(Unknown Source:53)
        at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1167)
        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:641)
        at java.lang.Thread.run(Thread.java:764)

# ...

[*] open(/proc/meminfo)
Backtrace:
0x7196a62dd4 libopenjdk.so!handleOpen+0x44
        0x7196a62dd4 libopenjdk.so!handleOpen+0x44
        0x7196a62f14 libopenjdk.so!fileOpen+0x8c
        0x70b7a97c boot.oat!0x11697c
        0x70b7a97c boot.oat!0x11697c
# ...
```

</details>

## c_module_example.js [🔗source](/utils/c_module_example.js)
This is an example script written in C code for hooking logic at the call and termination points of the function using Frida `CModule` API, attaching an interceptor to the open function.
<details>
<summary>Example Code</summary> 

### Javascript
```js
// Copy the script as it is and run the app with Frida.
```

### Console
```sh
# ...
onMessage: open() path="/proc/19887/status"
onMessage: => fd=147
onMessage: open() path="/proc/19887/statm"
onMessage: => fd=149
# ...
```

</details>

## c_module_helloworld.js [🔗source](/utils/c_module_helloworld.js)
You can write Frida hooking code using Frida `CModule` API. Here is an example to output the input value (`Hello World from CModule`) to the console where the Frida script is executed from the C code.
<details>
<summary>Example Code</summary> 

### Javascript
```js
// Copy the script as it is and run the app with Frida.
```

### Console
```sh
[*] Custom CModule Information
{
    "hello": "0x72228bc000",
    "log": "0x7222944010",
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
```

</details>

## change_string.js [🔗source](/utils/change_string.js)
This function replaces all strings included in the search array (`search_arr`) with a replacement string (`change`) in a specific string (`string`). This function repeatedly finds and replaces each string in the search array within the string, repeating this process until there are no more such strings. When completed, it returns the final modified string.
<details>
<summary>Example Code</summary> 

### Javascript
```js
var str = "/data/local/tmp/frida/frida-server.so"
var newStr = chnageString(str, ["frida", "local"], "fake")
console.log(newStr)
```

### Console
```
/data/fake/tmp/fake/fake-server.so
```

</details>

## check_address_in_maps.js [🔗source](/utils/check_address_in_maps.js)
It performs the function of checking whether the transmitted address value is included in a certain memory area.
<details>
<summary>Example Code</summary> 

### Javascript
```js
check_address_in_maps(Module.findExportByName(null, "open"))
check_address_in_maps(ptr(0x7ff7ad8a60))
```

### Console
```
[*] The address(0x721da6fbd0) is included in the address range of the line below.
721da69000-721da72000 r-xp 00025000 103:01 3436                          /system/lib64/libc.so
[*] The address(0x7ff7ad8a60) is included in the address range of the line below.
7ff72df000-7ff7ade000 rw-p 00000000 00:00 0                              [stack]
```

</details>

## converter.js [🔗source](/utils/converter.js)
A script that includes functions for converting strings to arrays in binary form, converting to arrays in hexadecimal form, or the reverse.
- `string2Bin(str)`: This function converts the given string (`str`) into an array in binary form. Each character in the string is converted to the ASCII code value of that character.
- `bin2String(array)`: This function converts an array in binary form into a string. Each binary in the array is converted to the ASCII character corresponding to that binary.
- `bin2HexArr(array)`: This function converts an array in binary form into an array in hexadecimal form. Each binary in the array is converted to the hexadecimal corresponding to that binary.
- `HexArr2String(array)`: This function converts an array in hexadecimal form into a string. Each hexadecimal in the array is converted to the ASCII character corresponding to that hexadecimal.
<details>
<summary>Example Code</summary> 

### Javascript
```js
var str1 = string2Bin("Hello");
console.log(str1);
var str2 = bin2String([72,101,108,108,111]);
console.log(str2);
var str3 = bin2HexArr(string2Bin("Hello"))
console.log(str3);
var str4 = HexArr2String(['48','65','6C','6C','6F']);
console.log(str4);
```

### Console
```
72,101,108,108,111
Hello
48,65,6C,6C,6F
Hello
```

</details>

## dump_dex.js [🔗source](/utils/dump_dex.js)
[dstmath/frida-unpack](https://github.com/dstmath/frida-unpack) ← Please check the link.
<details>
<summary>Example Code</summary> 

```sh
# Try it yourself.
```

</details>

## get_random_string.js [🔗source](/utils/get_random_string.js)
This function is used to generate a random string through a given length (`num`) and string elements (`elements`). By default, `elements` includes all uppercase and lowercase alphabets and numbers, which can optionally be changed. The function returns a random string of `num` length.

I mainly use it in the following cases:
- Changing the `ANDROID_ID` value of the `Settings.Secure` class randomly
- Changing the return value (mobile phone number) of the `getLine1Number` function of the `TelephonyManager` class randomly
- In addition, when wanting to overwrite with arbitrary strings
<details>
<summary>Example Code</summary> 

### Javascript
```js
var rand_str = getRandomString(10)
console.log(rand_str)
```

### Console
```sh
Qkt3LfZW65
```

</details>

## hooks_dynamic_class.js [🔗source](/utils/hooks_dynamic_class.js)
This is the script code used when hooking the Application class or dynamically loaded classes in Frida.

Since the instance of the Application class already exists and the corresponding method has already been executed at the point when the Frida script is run, it is generally difficult to perform hooking on the Application class in Frida. Therefore, the method of hooking `loadClass` of `DexClassLoader` when a specific class (Application class or dynamically loaded class) is loaded is used.
<details>
<summary>Example Code</summary> 

### Javascript
```js
// Copy the script as it is and run the app with Frida.
```

### Console
```sh
Call onCreate()
```

</details>

## maps_get_library.js [🔗source](/utils/maps_get_library.js)
Read the `/proc/self/maps` file, and if the line read contains the string defined in the `LIB_NAME` variable, dump that memory.
<details>
<summary>Example Code</summary> 

### Javascript
```js
// Copy the script as it is and run the app with Frida.
```

### Console
```sh
[*] dumping... 717c548000-717c56e000 r-xp 00000000 103:08 393799                        /data/app/com.example.app-cgJyzUCbesSzepvBSAV6OA==/lib/arm64/libDetect.so
[*] dumping... 717c57d000-717c57e000 r--p 00025000 103:08 393799                        /data/app/com.example.app-cgJyzUCbesSzepvBSAV6OA==/lib/arm64/libDetect.so
[*] dumping... 717c57e000-717c57f000 rw-p 00026000 103:08 393799                        /data/app/com.example.app-cgJyzUCbesSzepvBSAV6OA==/lib/arm64/libDetect.so
[*] Save Complete >> /data/data/com.example.app/dump_libDetect.so

$ adb shell su -c ls -al /data/data/com.example.app/dump_libDetect.so
-rw------- 1 u0_a331 u0_a331 491520 2024-05-08 13:54 /data/data/com.example.app/dump_libDetect.so
```

</details>

## native_library_attach.js [🔗source](/utils/native_library_attach.js)
This is a script that hooks functions (dlopen, android_dlopen_ext) used when dynamically loading library files. Through this script, you can attach an Interceptor to a specific offset or symbol targeting dynamically loaded libraries.
<details>
<summary>Example Code</summary> 

### Javascript
```js
// Copy the script as it is and run the app with Frida.
```

### Console
```sh
[*] android_dlopen_ext(org.apache.http.legacy.boot.odex:0x717efdb000)
[*] android_dlopen_ext(base.odex:0x717c884000)
[*] android_dlopen_ext(libDetect.so:0x717c600000)
[*] android_dlopen_ext(.odex:0x717c24e000)
[*] android_dlopen_ext(DynamiteLoader.uncompressed.odex:0x717b581000)
[*] android_dlopen_ext(MeasurementDynamite.uncompressed.odex:0x717a68c000)
[*] dlopen(libGLES_mali.so:0x7176883000)
[*] dlopen(libEGL.so:0x7221fca000)
[*] dlopen(libGLESv2.so:0x721f848000)
[*] dlopen(libGLESv1_CM.so:0x7220848000)
[*] dlopen(libSEC_EGL.so:0x721f991000)
[*] android_dlopen_ext(base.odex:0x717c884000)
[*] android_dlopen_ext(libmonochrome.so:0x7181789000)
[*] android_dlopen_ext(libmonochrome.so:0x7181789000)
[*] android_dlopen_ext(libwebviewchromium_plat_support.so:0x71982ca000)
[*] dlopen(libandroid.so:0x7198c00000)
[*] dlopen(android.hardware.graphics.mapper@2.0-impl.so:0x7192f58000)
[*] dlopen(gralloc.exynos5.so:0x716fdcb000)
```

</details>

## send_request.js [🔗source](/utils/send_request.js)
This is a script that sends HTTP/S POST requests in an Android app using Frida script.

The process of simply testing the script is as follows:

1. Connect the test terminal and local PC to the same network.
    - (Example) Test terminal: 192.168.0.2, Local PC: 192.168.0.3
2. Enter the command `nc -l 80` on your local PC.
3. When calling the `sendRequest` function in the script, enter the host address of your local PC('[http://192.168.0.3](http://192.168.0.3/)') as the first argument, and then run the app.
    
    ```
    sendRequest("<http://192.168.0.3>", {"key1":"value1", "key2":"value2"})
    
    ```
    
4. The local PC receives the following HTTP request message.
    
    ```
    POST / HTTP/1.1
    Content-Type: application/json; utf-8
    User-Agent: Dalvik/2.1.0 (Linux; U; Android 9; SM-G950N Build/PPR1.180610.011)
    Host: 192.168.0.3
    Connection: Keep-Alive
    Accept-Encoding: gzip
    Content-Length: 33
    
    {"key1":"value1","key2":"value2"}
    
    ```
    
5. Afterwards, the local PC sends the response message below and terminates the `nc` program in the Listen state with `ctrl + c`.
    
    ```
    HTTP/1.1 200 OK
    
    {"result": true}
    
    ```
<details>
<summary>Example Code</summary> 

### Javascript
```js
sendRequest("http://192.168.2.176", {"key1":"value1", "key2":"value2"})
```

### Console(local)
```sh
[*] Response:
{"result": true}
```

### Console(server)
```sh
$ nc -l 80
POST / HTTP/1.1
Content-Type: application/json; utf-8
User-Agent: Dalvik/2.1.0 (Linux; U; Android 9; SM-G950N Build/PPR1.180610.011)
Host: 192.168.2.176
Connection: Keep-Alive
Accept-Encoding: gzip
Content-Length: 33

{"key1":"value1","key2":"value2"}HTTP/1.1 200 OK

{"result": true}
```
</details>

## set_android_id.js [🔗source](/utils/set_android_id.js)
The script used when changing the `ANDROID_ID` value of the `Settings.Secure` class when querying that value.
<details>
<summary>Example Code</summary> 

```sh
# Try it yourself.
```

</details>

## shell_exec.js [🔗source](/utils/shell_exec.js)
This is a function that executes OS commands (Shell) using the Frida script. When you run an OS command through the `shell_exec()` function, the command is executed with app permissions.
<details>
<summary>Example Code</summary> 

### Javascript
```js
Java.perform(function(){
    shell_exec("id")
})
```

### Console
```sh
uid=10331(u0_a331) gid=10331(u0_a331) groups=10331(u0_a331),3003(inet),9997(everybody),20331(u0_a331_cache),50331(all_a331) context=u:r:untrusted_app:s0:c75,c257,c512,c768
```

</details>

## trace.js [🔗source](/utils/trace.js)
[0xdea/frida-scripts](https://github.com/0xdea/frida-scripts) ← Please check the link.
<details>
<summary>Example Code</summary> 

```sh
# Try it yourself.
```

</details>