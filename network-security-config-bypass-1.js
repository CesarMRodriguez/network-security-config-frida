// frida -U -l network-security-config-bypass-1.js --no-pause -f com.example.bypassnsc3 
Java.perform(function(){
    NetworkSecurityConfig_Builder =Java.use("android.security.net.config.NetworkSecurityConfig$Builder");
	console.log("NetworkSecurityConfig_Builder: " + NetworkSecurityConfig_Builder);
    CertificatesEntryRef = Java.use("android.security.net.config.CertificatesEntryRef");
	console.log("CertificatesEntryRef: " + CertificatesEntryRef);
    CertificateSource = Java.use("android.security.net.config.CertificateSource");
	console.log("CertificateSource: " + CertificateSource);
    UserCertificateSource = Java.use("android.security.net.config.UserCertificateSource");
	console.log("UserCertificateSource: " + UserCertificateSource);

    NetworkSecurityConfig_Builder.getEffectiveCertificatesEntryRefs.implementation = function(){
	    
        var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
        console.log("\nBacktrace - builder:\n" + bt);
        
        origin = this.getEffectiveCertificatesEntryRefs()
        
        source = UserCertificateSource.getInstance()
        userCert = CertificatesEntryRef.$new(source,true)
        origin.add(userCert)

	return origin
    }

    NetworkSecurityTrustManager = Java.use("android.security.net.config.NetworkSecurityTrustManager");

    System = Java.use("java.lang.System");

    NetworkSecurityTrustManager.checkPins.implementation = function (pins) {
        var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
        console.log("\nBacktrace:\n" + bt);
        pinSet = this.mNetworkSecurityConfig.value.getPins();
        console.log("pinSet.pins.value.isEmpty: " +pinSet.pins.value.isEmpty());
        console.log("isPinningEnforced: " +this.isPinningEnforced(pins));
        console.log("pins.isEmpty: " +pins.isEmpty());
        console.log(System.currentTimeMillis())
        console.log(pinSet.expirationTime.value);
        console.log(System.currentTimeMillis() > pinSet.expirationTime.value);
        this.checkPins(pins); 
    }    

    var Set = Java.use("java.util.Set");
    Set.contains.implementation = function (elem) {
        var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
        console.log("\nBacktrace:\n" + bt);
        return this.contains(elem);
    }

    var PinSet = Java.use("android.security.net.config.PinSet");
    PinSet.getPinAlgorithms.implementation = function () {
        var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
        console.log("\nBacktrace:\n" + bt);
        return this.getPinAlgorithms();
    }

    var Pin = Java.use("android.security.net.config.Pin");
    Pin.$init.implementation = function (digestAlg, digest) {
        var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
        console.log("\nBacktrace:\n" + bt);
        console.log(digestAlg);
        return this.$init(digestAlg,digest);
    }
})
