// frida -U -l network-security-config-bypass-3.js --no-pause -f com.example.bypassnsc 
Java.perform(function () {

    var TrustManagerImpl = Java.use('com.android.org.conscrypt.TrustManagerImpl');

    TrustManagerImpl.verifyChain.implementation = function (untrustedChain, trustAnchorChain, host, clientAuth, ocspData, tlsSctData) {

        // Skip all the logic and just return the chain again :P
        return untrustedChain;
    }
});
