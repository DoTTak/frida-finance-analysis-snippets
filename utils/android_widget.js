Java.use("android.widget.EditText").setText.implementation = function(text, type){
    console.log("[*] EditText.setText("+text+", "+type+")")
    /* If you want to change arguments, use the code below. */
    // var text = "FAKE"
    this.setText(text, type)
}

const TextView = Java.use("android.widget.TextView")
TextView.setText.overloads.forEach(function(d, i){
    TextView.setText.overloads[i].implementation = function(){
        console.log("[*] TextView.setText.overloads["+i+"]("+arguments[0]+", ...)")
        /* If you want to change arguments, use the code below. */
        // var text = "FAKE"
        // arguments[0] = Java.use('java.lang.String').$new(text)
        return this.setText.apply(this, arguments)
    }
})