// VFXTrigger.js
// Version: 0.1.0
// Event: Select on the script
// Description: Custom made script to send the duration time, textures for burst VFX

// @input Component.VFXComponent vfx
// @input float duration {"label": "Burst Duration"}
// @input Asset.Texture[] textures

var initialized = false;
script.api.triggerVFX = triggerVFX;

function triggerVFX(value) {
    if (!initialized) {
        print("ERROR: VFXTrigger is not initialized");
        return;
    }
  
    if (value == 7) {
        value = Math.floor(Math.random()*6);
    }
    
    if (value>script.textures.length) {
        print("ERROR: No enough textures for value:"+ value);
        return;
    }
    
    var burstDur = script.duration + getTime();
    script.vfx.asset.properties["burstDuration"] = burstDur;
    script.vfx.asset.properties["mainTex"] = script.textures[value];    
}

function initialize() {
    if (!script.vfx) {
        print("ERROR: Please set the VFX component to the script.");
        return;
    }
    if (!script.vfx.asset) {
        print("ERROR: Please make sure VFX component contains VFX asset.");
        return;
    }
    if (!script.textures ||script.textures.length == 0) {
        print("ERROR: Please make sure to assign textures");
        return;        
    }

    initialized = true;
}

initialize();