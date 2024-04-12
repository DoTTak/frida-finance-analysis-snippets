const ROOTING_PACKAGES = [
    "com.topjohnwu.magisk"
];
const PackageManager = Java.use("android.app.ApplicationPackageManager");

PackageManager.getInstalledApplications.implementation = function (flags) {
    var apps = this.getInstalledApplications(flags);
    console.log("[*] android.app.ApplicationPackageManager.getInstalledApplications("+flags+") >> ", apps);
    return apps;
    /* If you want to change result, use the code below. */
    // var ArrayList = Java.use("java.util.ArrayList").$new();
    // for (var i = 0; i < apps.size(); i++) {
    //     var target = apps.get(i);
    //     var packageName = Java.use("android.content.pm.ApplicationInfo").$new(target).packageName.value;
    //     if(ROOTING_PACKAGES.indexOf(packageName) == -1){
    //         ArrayList.add(target);
    //     }
    // }
    // return ArrayList;
};

PackageManager.getPackageInfo.overloads[1].implementation = function (packageName, flags) {
    /* If you want to change result, use the code below. */
    // if (ROOTING_PACKAGES.indexOf(packageName) > -1) {
    //     packageName = "com.android.fake";
    // }
    return this.getPackageInfo(packageName, flags)
};

PackageManager.getApplicationInfo.overloads[0].implementation = function (packageName, flags) {
    /* If you want to change result, use the code below. */
    // if (ROOTING_PACKAGES.indexOf(packageName) > -1) {
    //     packageName = "com.android.fake";
    // }
    var retval = this.getApplicationInfo(packageName, flags);
    return retval
};