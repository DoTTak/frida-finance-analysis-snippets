Java.performNow(function(){
    Java.use("java.lang.String").toString.implementation = function(){
        var retval = this.toString();
        console.log("[*] java.lang.String.toString() >> " + retval);
        /* If you want to change result, use the code below. */
        // retval = "FAKE"
        return retval;
    }

    Java.use("java.lang.StringFactory").newStringFromCodePoints.implementation = function(a, b, c){
        var retval = this.newStringFromCodePoints(a, b, c)
        console.log("[*] java.lang.StringFactory.newStringFromCodePoints() >> " + retval);
        /* If you want to change result, use the code below. */
        // retval = "FAKE"
        return retval
    }
    
    Java.use("java.util.regex.Pattern").matches.implementation = function (regex, input) {
        var retval = this.matches(regex, input)
        console.log("[*] java.util.regex.Pattern.matches("+ regex +", "+ input +") >> " + retval);
        /* If you want to change result, use the code below. */
        // retval = false // or true
        return retval
    }

    Java.use("java.lang.System").getenv.overload().implementation = function(){
        var retval = this.getenv()
        console.log("[*] System.getenv() >> ")
        var iterator = retval.keySet().iterator()
        while(iterator.hasNext()){
            var key = iterator.next();
            console.log(key + "=" + retval.get(key))
        }
        /* If you want to change result, use the code below. */
        // var HashMap = Java.use('java.util.HashMap').$new();
        // var Object = Java.use("java.lang.Object");
        // var String = Java.use("java.lang.String")
        // HashMap.put("FAKE_KEY_1", Java.cast(String.$new("FAKE_VALUE_1"), Object))
        // HashMap.put("FAKE_KEY_2", Java.cast(String.$new("FAKE_VALUE_2"), Object))
        // retval = HashMap
        return retval
    }
    
    Java.use("java.lang.Runtime").exec.overload('java.lang.String').implementation = function(command){
        /* If you want to change arguments, use the code below. */
        // command = "fake"
        var retval = this.exec(command)
        console.log("[*] Runtime.exec("+command+")")
        return retval
    }

    Java.use("java.lang.String").split.overload('java.lang.String').implementation = function(regex){
        /* If you want to change arguments, use the code below. */
        // regex = " "
        var retval = this.split(regex)
        console.log("[*] java.lang.split("+regex+") >> " + retval)
        return retval
    }

    Java.use("java.io.BufferedReader").readLine.overload().implementation = function(){
        var retval = this.readLine()
        console.log("[*] java.io.BufferedReader.readLine() >> " + retval);
        /* If you want to change result, use the code below. */
        // retval = "Fake"
        return retval
    }

    Java.use("java.lang.String").format.overload('java.lang.String', '[Ljava.lang.Object;').implementation = function(format, args){
        var retval = this.format(format, args)
        console.log("[*] String.format("+format+", "+args.join(", ")+")")
        /* If you want to change result, use the code below. */
        // retval = "Fake"
        return retval
    }
});