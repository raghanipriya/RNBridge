package com.rnbridge

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class NativeLocalStoragePackage: BaseReactPackage() {
    override fun getModule(
        name: String,
        reactContext: ReactApplicationContext
    ): NativeModule? {
        return  when(name){
            NativeLocalStorageModule.NAME -> NativeLocalStorageModule(reactContext)
            NativeBatteryModule.NAME -> NativeBatteryModule(reactContext) // Added this
            else -> null
        }
    }


    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            val map = mutableMapOf<String, ReactModuleInfo>()

            // Module 1
            val module1 = NativeLocalStorageModule.NAME
            map[module1] = ReactModuleInfo(module1, "com.rnbridge.NativeLocalStorageModule", false, false, false, true)

            // Module 2
            val module2 = NativeBatteryModule.NAME
            map[module2] = ReactModuleInfo(module2, "com.rnbridge.NativeBatteryModule", false, false, false, true)

            map
        }
    }
}