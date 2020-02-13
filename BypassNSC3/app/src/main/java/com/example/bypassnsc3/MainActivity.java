package com.example.bypassnsc3;

import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Random;

import javax.net.ssl.HttpsURLConnection;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    private WebView webView = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        int SDK_INT = android.os.Build.VERSION.SDK_INT;
        if (SDK_INT > 8)
        {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder()
                    .permitAll().build();
            StrictMode.setThreadPolicy(policy);
        }

        webView = (WebView) findViewById(R.id.webview);

        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);

        //webView.loadUrl("https://example.org/");
    }

    public void onViewCreated(View view, Bundle savedInstanceState)
    {

    }


    public static String random() {
        Random generator = new Random();
        StringBuilder randomStringBuilder = new StringBuilder();
        int randomLength = generator.nextInt(16);
        char tempChar;
        for (int i = 0; i < randomLength; i++){
            tempChar = (char) (generator.nextInt(96) + 32);
            randomStringBuilder.append(tempChar);
        }
        return randomStringBuilder.toString();
    }

    public void clickFunc(View view){
        webView.loadUrl("https://example.org/?id=" + random());
    }

    public void clickOkHttpFunc(View view){
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url("https://example.org/")
                .build();
        try {
            Response response = client.newCall(request).execute();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void executeHttpsUrlConnectRequest(View view){

        InputStream in = null;
        try {

            URL url = new URL("https://example.org/");
            HttpsURLConnection urlConnection =
                    (HttpsURLConnection)url.openConnection();
            in = urlConnection.getInputStream();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        //copyInputStreamToOutputStream(in, System.out);
    }
}
