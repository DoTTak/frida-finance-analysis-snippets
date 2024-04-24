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
| `java.lang.Runtime` |	`exec(String command)` | `String command` | Bypass	Executes the specified system command. |

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