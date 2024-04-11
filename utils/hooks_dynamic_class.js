/**
 * Hooking can be applied not only to dynamically loaded classes but also to application classes.
 */

// Modify the code below
var target = "com.example.DynamicApplication"

Java.use("dalvik.system.DexClassLoader").loadClass.overload('java.lang.String').implementation = function (name) {
    var Class = this.loadClass(name);
    if(Class == "class " + target){
        Java.classFactory.loader = Java.cast(Class, Java.use("java.lang.Class")).getClassLoader();

        // Modify the code below
        Java.use(target).onCreate.implementation = function(){
            console.warn("Call onCreate()")
            return this.onCreate()
        }
        
    }
    return Class;
};