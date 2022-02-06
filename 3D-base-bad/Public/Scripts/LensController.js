// LensController.js
// Version: 0.0.1
// Event: Initialized
// Description: Entry point of the lens. Initates objects construction and lens setup.

//@input Component.Camera camera
//@input SceneObject marker
//@input SceneObject[] scenes
//@input Asset.AudioTrackAsset[] sounds


// Create Builder
var activeScene = getActiveScene();
if (!activeScene) {
    print("Unable to initialize lens!");
    return;
}


script.api.getBlocksRoot = function() {
    return activeScene.blocksRoot;
};


script.api.getSceneRoot = function() {
    return activeScene.sceneRoot;
};


var builder = new global.Builder(activeScene.scenePrint);
var sfx = script.getSceneObject().getComponent("Component.AudioComponent");


// Declare ghost print
var newBoxPrint;


// Creating event listeners
script.createEvent("TapEvent").bind(function(data) {
    if (isSpectacles()) {
        if (!newBoxPrint) {
            return;
        }

        addBox();
    } else {
        var pos = data.getTapPosition();
        var tap = script.camera.screenSpaceToWorldSpace(pos, 1000000);
        var cam = script.camera.getTransform().getWorldPosition();
        var ray = tap.sub(cam);

        newBoxPrint = builder.Trace(cam, ray);
        if (!newBoxPrint) {
            return;
        }

        addBox();
    }
});


script.createEvent("UpdateEvent").bind(function(data) {
    if (!isSpectacles()) {
        return;
    }

    var pos = new vec2(0.5, 0.5);
    var tap = script.camera.screenSpaceToWorldSpace(pos, 1000000);
    var cam = script.camera.getTransform().getWorldPosition();
    var ray = tap.sub(cam);

    newBoxPrint = builder.Trace(cam, ray);
    if (!newBoxPrint) {
        script.marker.enabled = false;
        return;
    }

    script.marker.enabled = true;
    if (newBoxPrint.Position.y >= 0) {
        var currentPos = script.marker.getTransform().getLocalPosition();
        var targetPos = vec3.lerp(currentPos, newBoxPrint.Position, 0.6);
        script.marker.getTransform().setLocalPosition(targetPos);
    }
});


function isSpectacles() {
    return global.deviceInfoSystem.isSpectacles();
}


function playSound() {
    sfx.audioTrack = script.sounds[Math.floor(Math.random() * script.sounds.length)];
    sfx.play(1);
}


function addBox() {
    builder.Add(newBoxPrint);
    playSound();
}


function getActiveScene() {
    var res = null;

    for (var i = 0; i < script.scenes.length; i++) {
        if (script.scenes[i].enabled) {
            var blocksRoot = script.scenes[i].getChild(0);
            var scenePrint = script.scenes[i].getChild(1).getComponent("Component.ScriptComponent");
            return {
                sceneRoot: script.scenes[i],
                blocksRoot: blocksRoot,
                scenePrint: scenePrint.api.getBlocks(),
            };
        }
    }

    if (!res) {
        print("Error: Unbale to find active blocks scene. Please enable one of the scene roots.");
    }
}


script.api.setType = function(index) {
    builder.SetKind(index);
};


script.marker.setParent(activeScene.sceneRoot);




