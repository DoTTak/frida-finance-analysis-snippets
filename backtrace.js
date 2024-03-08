function java_backtrace(){
	var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
	console.log("Backtrace:\n" + bt);
}

function native_backtrace(ctx){
	var backtrace = Thread.backtrace(ctx.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n\t");
	console.log("Backtrace:\n" + backtrace);
}