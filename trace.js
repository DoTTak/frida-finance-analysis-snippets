// generic trace
function trace(pattern) {
    var type = (pattern.toString().indexOf("!") === -1) ? "java" : "module";

    if (type === "module") {

        // trace Module
        var res = new ApiResolver("module");
        var matches = res.enumerateMatchesSync(pattern);
        var targets = uniqBy(matches, JSON.stringify);
        targets.forEach(function (target) {
            traceModule(target.address, target.name);
        });

    } else if (type === "java") {

        // trace Java Class
        var found = false;
        Java.enumerateLoadedClasses({
            onMatch: function (aClass) {
                if (aClass.match(pattern)) {
                    found = true;
                    traceClass(aClass);
                }
            },
            onComplete: function () {}
        });

        // trace Java Method
        if (!found) {
            try {
                traceMethod(pattern);
            } catch (err) { // catch non existing classes/methods
                // console.error(err);
            }
        }
    }
}

// find and trace all methods declared in a Java Class
function traceClass(targetClass) {
    var hook = Java.use(targetClass);
    var methods = hook.class.getDeclaredMethods();
    hook.$dispose;

    var parsedMethods = [];
    methods.forEach(function (method) {
        parsedMethods.push(method.toString().replace(targetClass + ".", "TOKEN").match(/\sTOKEN(.*)\(/)[1]);
    });

    var targets = uniqBy(parsedMethods, JSON.stringify);
    targets.forEach(function (targetMethod) {
        traceMethod(targetClass + "." + targetMethod);
    });
}

// trace a specific Java Method
function traceMethod(targetClassMethod) {
    var delim = targetClassMethod.lastIndexOf(".");
    if (delim === -1) return;

    var targetClass = targetClassMethod.slice(0, delim)
    var targetMethod = targetClassMethod.slice(delim + 1, targetClassMethod.length)

    var hook = Java.use(targetClass);
    console.log(hook[targetMethod].toString)
    var overloadCount = hook[targetMethod].overloads.length;

    console.log("Tracing " + targetClassMethod + " [" + overloadCount + " overload(s)]");

    for (var i = 0; i < overloadCount; i++) {

        hook[targetMethod].overloads[i].implementation = function () {
            console.warn("\n***[" + targetMethod + "] entered " + targetClassMethod);

            // print backtrace
            // Java.perform(function () {
            // 	var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
            // 	console.log("\n[" + targetMethod + "] Backtrace:\n" + bt);
            // });

            // print args
            if (arguments.length) console.log();
            for (var j = 0; j < arguments.length; j++) {
                console.log("[" + targetMethod + "] arg[" + j + "]: " + arguments[j]);
            }

            // print retval
            var retval = this[targetMethod].apply(this, arguments); // rare crash (Frida bug?)
            console.log("\n[" + targetMethod + "] retval: " + retval);
            console.warn("\n***[" + targetMethod + "] exiting " + targetClassMethod);
            return retval;
        }
    }
}

// trace Module functions
function traceModule(impl, name) {
    console.log("Tracing " + name);

    Interceptor.attach(impl, {

        onEnter: function (args) {

            // debug only the intended calls
            this.flag = false;
            var filename = Memory.readCString(ptr(args[0]));
            if (filename.indexOf("XYZ") === -1 && filename.indexOf("ZYX") === -1) // exclusion list
                if (filename.indexOf("my.interesting.file") !== -1) // inclusion list
                    this.flag = true;

            if (this.flag) {
                // console.warn("\n*** entered " + name);

                // // print backtrace
                // console.log("\nBacktrace:\n" + Thread.backtrace(this.context, Backtracer.ACCURATE)
                // 	.map(DebugSymbol.fromAddress).join("\n"));
            }
        },

        onLeave: function (retval) {

            if (this.flag) {
                // print retval
                console.log("\nretval: " + retval);
                console.warn("\n*** exiting " + name);
            }
        }

    });
}

// remove duplicates from array
function uniqBy(array, key) {
    var seen = {};
    return array.filter(function (item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
}
