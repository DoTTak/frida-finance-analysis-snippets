/**
 * Hooking can be applied not only to dynamically loaded classes but also to application classes.
 */

// Modify the code below
var target = "com.example.DynamicApplication"

Java.use("dalvik.system.DexClassLoader").loadClass.overload('java.lang.String').implementation = function (name) {
    var Class = this.loadClass(name);
    if(Class == "class " + target){
        Java.classFactory.loader = Java.cast(Class, Java.use("java.lang.Class")).getClassLoader();

        /**
         * If the Application class defined in AndroidManifest.xml inherits 
         * from a user-defined class rather than Android's default class, 
         * please modify it to the user-defined class.
         * 
         * Example) If there is an Application class in the following form,
         *          it is changed to the inherited class 'CustomApplication'.
         * 
         * ------------------<DynamicApplication.java>-----------------------
         * package com.example;
         * public class DynamicApplication extends CustomApplication {
         * -------------------<Modify the code below>------------------------
         * <hooks_dynamic_class.js>
         * Java.use("com.example.CustomApplication").onCreate.implementation = function(){
         *      console.warn("Call onCreate()")
         *      return this.onCreate()
         *  }
         */
        Java.use(target).onCreate.implementation = function(){
            console.warn("Call onCreate()")
            return this.onCreate()
        }
        
    }
    return Class;
};