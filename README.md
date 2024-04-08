https://github.com/DoTTak/frida-snippets

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

### Java

| Package | Function | point | Type | Description |
| --- | --- | --- | --- | --- |
| java.lang.String | toString() | return | Analysis | Returns the representation of the string. |

### Native(C Library)

| Function | point | Type | Description |
| --- | --- | --- | --- |
| char *strstr(const char *haystack, const char *needle); | char *needle | Bypass, Analysis | Searches for the needle string in haystack and returns its location. |
| void *memmem(const void *haystack, size_t haystacklen, const void *needle, size_t needlelen); | void *needle | Bypass, Analysis | Searches for the needle string in haystack and returns its location. |

## Type: File

### Native(C Library)

| Function | point | Type | Description |
| --- | --- | --- | --- |
| int open(const char *pathname, int flags); | char *pathname | Bypass | Opens a file at the specified pathname. |
| int access(const char *pathname, int mode); | char *pathname | Bypass | Checks the file's accessibility at the specified pathname. |
| FILE *fopen(const char *pathname, const char *mode); | char *pathname | Bypass | Opens a file at the specified pathname with the specified mode. |
| int stat(const char *pathname, struct stat *statbuf); | char *pathname | Bypass | Retrieves the file status at the specified pathname. |
| int lstat(const char *pathname, struct stat *statbuf); | char *pathname | Bypass | Retrieves the file status at the specified pathname, without following symbolic links. |

[data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAA/0lEQVR4AYXNMSiEcRyA4cfmGHQbCZIipkuxnJgMStlMNmeyD2dwmc8+sZgxYJd9ErIZFHUyYYD7fkr6l4/rnvmtl7+KitrqV/fq2Y5eLY3Z9S48eRLe7BmVZ9qhTLhQ0algzZWQOVKSsCF8OjAnwbxDTWFDUhPK/jMr1H6HE/IqRky2DyvCefuwItwZzodVoYRiLqMkVCXrwpJ9twZ+sgfDYEFYl8wIWxZ9uFf7zkallxlJh4YrLGsKjZRx7VGHhLqwgFUN45DGdb8MeXGpgB4ABZdeDcpZEY51A+hyLKz4S1W4MQWm3AibWtgWmk6dyISa1pSdyWTOlLXVp0+eL9D/ZPfBTNanAAAAAElFTkSuQmCC](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAA/0lEQVR4AYXNMSiEcRyA4cfmGHQbCZIipkuxnJgMStlMNmeyD2dwmc8+sZgxYJd9ErIZFHUyYYD7fkr6l4/rnvmtl7+KitrqV/fq2Y5eLY3Z9S48eRLe7BmVZ9qhTLhQ0algzZWQOVKSsCF8OjAnwbxDTWFDUhPK/jMr1H6HE/IqRky2DyvCefuwItwZzodVoYRiLqMkVCXrwpJ9twZ+sgfDYEFYl8wIWxZ9uFf7zkallxlJh4YrLGsKjZRx7VGHhLqwgFUN45DGdb8MeXGpgB4ABZdeDcpZEY51A+hyLKz4S1W4MQWm3AibWtgWmk6dyISa1pSdyWTOlLXVp0+eL9D/ZPfBTNanAAAAAElFTkSuQmCC)

## Type: Pcakge

| Package | Function | point | Type | Description |
| --- | --- | --- | --- | --- |
| android.app.ApplicationPackageManager | getInstalledApplications(int falgs) | return | Bypass | Retrieves all installed applications on the device. |
| android.app.ApplicationPackageManager | getPackageInfo(String packageName, int flags) | return | Bypass | Retrieves detailed information about the specified package. |
| android.app.ApplicationPackageManager | getApplicationInfo | return | Bypass | Retrieves detailed data about a single app. |