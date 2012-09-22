package com.example.gap_5;

import android.os.Bundle;
//import android.app.Activity;
import android.view.Menu;
import org.apache.cordova.*;

//import com.example.gap_5.R;

public class MainActivity extends DroidGap {
	

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.loadUrl("file:///android_asset/www/index.html", 3000);
        super.loadUrl("file:///android_asset/www/index.html"); 
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }
}
