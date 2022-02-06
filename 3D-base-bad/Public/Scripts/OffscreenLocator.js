// OffsceenLocator.js
// Version: 0.0.1
// Event: Initialized
// Description: Indicates a direction to follow to reveal an object out of the screen frame.

//@input string mode = "center" {"widget":"combobox", "values":[{"label":"Show Indicator at the screen center", "value":"center"}, {"label":"Show Indicator at the screen edge", "value":"edge"}]}
//@input SceneObject indicator
//@input float edgeBound = 0.8
//@ui {"widget":"separator"}
//@input Component.Camera camera
//@input Component.ScriptComponent lensController
//@input SceneObject spawnLocator


function checkLocators() {
    var sceneRoot = script.lensController.api.getSceneRoot();
    var locators = [];
    for (var l = 0; l < sceneRoot.getChildrenCount(); l++) {
        if (!sceneRoot.getChild(l).isSame(script.spawnLocator)) {
            locators.push(sceneRoot.getChild(l));
        }
    }

    var sPos = vec3.zero();
    var front = false;
    for (var i = 0; i < locators.length; i++) {
        var wPos = locators[i].getTransform().getWorldPosition();
        sPos = script.camera.worldSpaceToScreenSpace(wPos);
        var cMat = script.camera.getSceneObject().getTransform().getInvertedWorldTransform();
        var lPos = cMat.multiplyPoint(wPos);

        front = lPos.z < 0;
        if (front && sPos.x > 0 && sPos.x < 1 && sPos.y > 0 && sPos.y < 1) {
            // Locator is in view
            return;
        }
    }

    // None of the locators are in view.
    // Return screen positiion of the last one.
    return [sPos, front];
}


function update() {
    var res = checkLocators();
    if (!res) {
        script.indicator.enabled = false;
        return;
    }

    if (script.mode == "center") {
        rotateIndicator(res[0], res[1]);
    } else {
        moveIndicator(res[0], res[1]);
    }
}


function moveIndicator(sPos, front) {
    if (front) {
        if (sPos.x > 1) {
            moveRight();
        } else if (sPos.x < 0) {
            moveLeft();
        } else if (sPos.y > 1) {
            moveBottom();
        } else if (sPos.y < 0) {
            moveTop();
        }
    } else {
        if (sPos.x > 1) {
            moveLeft();
        } else if (sPos.x < 0) {
            moveRight();
        } else if (sPos.y > 1) {
            moveTop();
        } else if (sPos.y < 0) {
            moveBottom();
        }
    }
    script.indicator.enabled = true;
}


function moveRight() {
    script.indicator.anchors.setCenter(new vec2(script.edgeBound, 0));
    script.indicator.rotation = quat.fromEulerAngles(0, 0, 0);
}


function moveLeft() {
    script.indicator.anchors.setCenter(new vec2(-script.edgeBound, 0));
    script.indicator.rotation = quat.fromEulerAngles(0, 0, Math.PI);
}


function moveTop() {
    script.indicator.anchors.setCenter(new vec2(0, script.edgeBound));
    script.indicator.rotation = quat.fromEulerAngles(0, 0, Math.PI * 0.5);
}


function moveBottom() {
    script.indicator.anchors.setCenter(new vec2(0, -script.edgeBound));
    script.indicator.rotation = quat.fromEulerAngles(0, 0, -Math.PI * 0.5);
}


function rotateIndicator(pos, front) {
    var x = pos.x - 0.5;
    var y = pos.y - 0.5;
    var ang = Math.atan(y / x);
    if (front) {
        if (x < 0) {
            ang += Math.PI;
        }
    } else {
        if (x > 0) {
            ang += Math.PI;
        }
    }

    var q = quat.fromEulerAngles(0, 0, -ang);
    script.indicator.getTransform().setLocalRotation(q);
    script.indicator.enabled = true;
}


function init() {
    // Check inputs
    if (!script.camera) {
        print("ERROR: Please set camera!");
        return;
    }
    if (!script.lensController) {
        print("ERROR: Please set lens controller script!");
        return;
    }
    if (!script.indicator) {
        print("ERROR: Please set indicator to show!");
        return;
    }

    // Make event
    script.createEvent("UpdateEvent").bind(update);
}


init();