Java.use("java.lang.Class").getDeclaredField.implementation = function(name){
    console.log("[getDeclaredField] " + this.toString() + "." + name)    
    return this.getDeclaredField(name)
}

Java.use("java.lang.Class").forName.overload('java.lang.String').implementation = function(className){
    console.log("[forName] " + className)    
    return this.forName(className)
}