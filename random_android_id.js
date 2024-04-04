Java.performNow(function () {
    var rand_1 = Math.random().toString(16).substring(2, 10);
    var rand_2 = Math.random().toString(16).substring(2, 10);
    const RANDOM_ANDROID_ID = rand_1 + rand_2;

    Java.use("android.provider.Settings$Secure").getString.overload("android.content.ContentResolver", "java.lang.String").implementation = function(context, param) {
        if (param == Java.use("android.provider.Settings$Secure").ANDROID_ID.value) {
            return RANDOM_ANDROID_ID;
        } else {
            return this.getString(context, param);
        }
    }

    Java.use("android.provider.Settings$Secure").getStringForUser.implementation = function (a, b, c) {
        return RANDOM_ANDROID_ID;
    }
});