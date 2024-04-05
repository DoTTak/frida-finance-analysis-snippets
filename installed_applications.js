const ROOTING_PACKAGES = [
    "com.topjohnwu.magisk"
];

var ArrayList = Java.use("java.util.ArrayList").$new();
var PackageManager = Java.use("android.app.ApplicationPackageManager");
var ApplicationInfo = Java.use("android.content.pm.ApplicationInfo");
PackageManager.getInstalledApplications.implementation = function (a) {
    var Apps = this.getInstalledApplications(a);
    for (var i = 0; i < Apps.size(); i++) {
        var target = Apps.get(i);
        var packageName = ApplicationInfo.$new(target).packageName.value;
        if (ROOTING_PACKAGES.indexOf(packageName) == -1) {
            ArrayList.add(target);
        }
    }
    return ArrayList;
};

PackageManager.getPackageInfo.overloads[1].implementation = function (a, b) {
    if (ROOTING_PACKAGES.indexOf(a) > -1) {
        a = "HAS_NO_PACKASGE";
    }
    return this.getPackageInfo(a, b)
};

PackageManager.getApplicationInfo.overloads[0].implementation = function (a, b) {
    if (ROOTING_PACKAGES.indexOf(a) > -1) {
        a = "HAS_NO_PACKASGE";
    }
    var retval = this.getApplicationInfo(a, b);
    return retval
};