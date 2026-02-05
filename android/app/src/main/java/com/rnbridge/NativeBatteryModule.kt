package com.rnbridge

import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext

class NativeBatteryModule(reactContext: ReactApplicationContext): NativeBatteryLevelSpec(reactContext) {
    override fun getName() = NAME

    override fun getBatteryLevel(): Double {
        val intentFilter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        val batteryStatus = reactApplicationContext.registerReceiver(null, intentFilter)
        val level = batteryStatus?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
        val scale = batteryStatus?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1
        return if (level != -1 && scale != -1) (level.toFloat() / scale.toFloat() * 100).toDouble() else -1.0
    }

    companion object {
        const val NAME = "NativeBatteryLevel"
    }
}