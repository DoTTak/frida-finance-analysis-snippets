var ANDROID_ID = "";

Java.performNow(function () {
    Java.use("android.provider.Settings$Secure").getString.overload("android.content.ContentResolver", "java.lang.String").implementation = function(context, param) {
        if (param == Java.use("android.provider.Settings$Secure").ANDROID_ID.value) {
            return ANDROID_ID;
        } else {
            return this.getString(context, param);
        }
    }

    Java.use("android.provider.Settings$Secure").getStringForUser.implementation = function (a, b, c) {
        return ANDROID_ID;
    }
});