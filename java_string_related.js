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
});