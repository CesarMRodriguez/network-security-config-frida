//frida -U -l network-security-config-bypass-cr.js --no-pause -f com.example.bypassnsc2 
Java.perform(function(){
      var ANDROID_VERSION_M = 23;

      var DefaultConfigSource = Java.use("android.security.net.config.ManifestConfigSource$DefaultConfigSource");
      var NetworkSecurityConfig = Java.use("android.security.net.config.NetworkSecurityConfig");
      var ManifestConfigSource = Java.use("android.security.net.config.ManifestConfigSource");

      var NetworkSecurityTrustManager = Java.use("android.security.net.config.NetworkSecurityTrustManager");

      ManifestConfigSource.getConfigSource.implementation = function () {
            console.log("[+] Modifying ManifestConfigSource getConfigSource");
            //if the API is <= 25 the DefaultConfigSource has 2 methods, if not it has 3.
            if (DefaultConfigSource.$new.argumentTypes.length == 2) {
                  return DefaultConfigSource.$new(true,ANDROID_VERSION_M);      
            } else {
                  return DefaultConfigSource.$new(true,ANDROID_VERSION_M,ANDROID_VERSION_M);
            }
            
      }
});
