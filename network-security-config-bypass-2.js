// frida -U -l network-security-config-bypass-2.js --no-pause -f com.example.bypassnsc 
Java.perform(function(){
      var ANDROID_VERSION_M = 23;

      var DefaultConfigSource = Java.use("android.security.net.config.ManifestConfigSource$DefaultConfigSource");
      var NetworkSecurityConfig = Java.use("android.security.net.config.NetworkSecurityConfig");

      NetworkSecurityConfig_Builder =Java.use("android.security.net.config.NetworkSecurityConfig$Builder");
      NetworkSecurityConfig_Builder.getEffectiveCertificatesEntryRefs.implementation = function(){
      
        var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
            console.log("\nBacktrace:\n" + bt);
            return this.getEffectiveCertificatesEntryRefs()
      }

      DefaultConfigSource.$init.overload("boolean", "int", "int").implementation = function(usesCleartextTraffic, targetSdkVersion, targetSandboxVersion){
             console.log("[+] Modifying DefaultConfigSource constructor");
             return this.$init.overload("boolean", "int", "int").call(this, usesCleartextTraffic, ANDROID_VERSION_M, targetSandboxVersion);
      };


      NetworkSecurityConfig.getDefaultBuilder.overload("int", "int").implementation = function(targetSdkVersion, targetSandboxVersion){
             console.log("[+] getDefaultBuilder original targetSdkVersion => " + targetSdkVersion.toString());
             return this.getDefaultBuilder.overload("int", "int").call(this, ANDROID_VERSION_M, targetSandboxVersion);
      };
      
      NetworkSecurityConfig_Builder.getCertificatesEntryRefs.implementation = function(){
      
        var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
            console.log("\nBacktrace:\n" + bt);
            return this.getCertificatesEntryRefs()
      }
      
});

