// HintController.js
// Version: 0.0.1
// Event: Initialized
// Description: Controls hint behavior of the object detection template
// Shows hint only if objects were not detected for certain amount of frames

//@input int minLostFrames {"hint" : "Hint will show up if there were no detections found for this amount of frames in a row"}
//@input SceneObject hintSceneObject 
//@input bool hideOnCapture

var frameWindow = 0;
var isEnabled = true;

if (!script.hintSceneObject) {
    debugPrint("Warning, please set Hint SceneObject");
    return;
}

if (script.hideOnCapture) {
    var updateEvent = script.createEvent("UpdateEvent");
    updateEvent.bind(function() {
        if (global.scene.isRecording()) {
            script.hintSceneObject.enabled = false;
            updateEvent.enabled = false;
        }
    });
}

script.api.showHint = function(visible) {
    if (visible) {
        show();
    } else {
        frameWindow = 0;
        hide();
    }
};

function show() {
    if (!isEnabled) {
        if (frameWindow >= script.minLostFrames) {
            global.tweenManager.stopTween(script.hintSceneObject, "alpha_hide");
            global.tweenManager.startTween(script.hintSceneObject, "alpha_show");
            isEnabled = true;
        } else {
            frameWindow += 1;
        }
    }
}

function hide() {
    frameWindow = 0;
    if (isEnabled) {
        global.tweenManager.stopTween(script.hintSceneObject, "alpha_show");
        global.tweenManager.startTween(script.hintSceneObject, "alpha_hide");
        isEnabled = false;
    }
}

function debugPrint(text) {
    print("HintControllerWithWindow, " + text);
}