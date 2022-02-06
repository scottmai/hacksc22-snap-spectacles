// -----JS CODE-----
// Carousel.js
// Version: 0.0.1
// Event: Initialized
// Description: Creates a UI carousel to switch between styles of the boxes

//@input Component.Camera camera
//@input Component.ScriptComponent scriptWithCallback
//@input float swipeSensitivity
//@input float depthPosition
//@input float verticalPosition
//@input SceneObject hexagon


global.touchSystem.touchBlocking = true;


// Declare vars
var initStyle = 0;
var rootLocalPos = vec3.zero();
var margin = 20;


global.Carousel = function() {
    this.root = script.getSceneObject();
    this.initPosition = script.camera.screenSpaceToWorldSpace(new vec2(0.5, 0.5), script.depthPosition);
    this.currentPosition = this.initPosition;
    this.root.getTransform().setLocalPosition(this.initPosition);
};


global.Carousel.prototype.Build = function(count) {
    var len = script.scriptWithCallback.api.getBlocksRoot().getChildrenCount();
    for (var i = 0; i < len; i++) {
        var sourceObject = script.scriptWithCallback.api.getBlocksRoot().getChild(i);
        var icon = this.root.copyWholeHierarchy(sourceObject);
        icon.getTransform().setLocalPosition(new vec3(i * margin, 0, 0));
        icon.getTransform().setLocalScale(new vec3(0.66, 0.66, 0.66));
        icon.getTransform().setLocalRotation(quat.fromEulerAngles(0.35, 0.78, 0.25));
        icon.setRenderLayer(1);
        for (var j = 0; j < icon.getChildrenCount(); j++) {
            icon.getChild(j).setRenderLayer(1);
        }
    }
};


global.Carousel.prototype.SetStyle = function(index) {
    this.currentPosition = this.initPosition.add(new vec3(index * -margin, 0, 0));
};


global.Carousel.prototype.Lerp = function() {
    var thisPos = this.root.getTransform().getLocalPosition();
    var newPos = vec3.lerp(this.currentPosition, thisPos, 0.8);
    this.root.getTransform().setLocalPosition(newPos);
};


global.Carousel.prototype.UpdateInitPosition = function(pos) {
    this.initPosition = pos;
    this.currentPosition = this.initPosition;
    this.root.getTransform().setLocalPosition(this.initPosition);
};


// Build carousel
var carousel = new global.Carousel();
carousel.Build();
carousel.SetStyle(initStyle);


// Setup Touch gestures
var touched = false;
var touchPos = vec2.zero();


script.createEvent("UpdateEvent").bind(function() {
    carousel.Lerp();
});


script.createEvent("TouchStartEvent").bind(function(data) {
    rootLocalPos = carousel.root.getTransform().getLocalPosition();
    touchPos = data.getTouchPosition();
    touched = true;
});


script.createEvent("TouchMoveEvent").bind(function(data) {
    if (!touched) {
        return;
    }
    var movePos = data.getTouchPosition();
    var delta = movePos.x - touchPos.x;
    carousel.currentPosition = rootLocalPos.add(new vec3(delta * script.swipeSensitivity, 0, 0));
});


script.createEvent("TouchEndEvent").bind(function(data) {
    var newStyle = Math.round(carousel.currentPosition.x / margin);
    newStyle = Math.max(-script.scriptWithCallback.api.getBlocksRoot().getChildrenCount() + 1, newStyle);
    newStyle = Math.min(0, newStyle);
    carousel.SetStyle(-newStyle);
    script.scriptWithCallback.api.setType(-newStyle);
    touched = false;
});


function setWorldPosInSafeRegion(yPosOffset, zDepth) {
    var orthoCam = global.scene.createSceneObject("Ortho Cam");
    var camComponent = orthoCam.createComponent("Component.Camera");
    camComponent.type = Camera.Type.Orthographic;

    var screenRegionObj = global.scene.createSceneObject("Safe Screen Region");
    screenRegionObj.setParent(orthoCam);
    
    var screenTransformComp = screenRegionObj.createComponent("Component.ScreenTransform");
    var screenRegionComp = screenRegionObj.createComponent("Component.ScreenRegionComponent");
    screenRegionComp.region = ScreenRegionType.SafeRender;

    var updateEvent = script.createEvent("UpdateEvent");
    updateEvent.bind(function() {
        
        var yScreenPoint = screenTransformComp.localPointToScreenPoint(new vec2(0, yPosOffset));
        var worldPoint = script.camera.screenSpaceToWorldSpace(new vec2(0.5, yScreenPoint.y), zDepth);        
        carousel.UpdateInitPosition(worldPoint);
        script.hexagon.getTransform().setWorldPosition(worldPoint);

        updateEvent.enabled = false;
        orthoCam.destroy();

        var comp = script.getSceneObject().getParent().getParent().createComponent("Component.DeviceTracking");
        comp.requestDeviceTrackingMode(2);
    });
}


if (global.deviceInfoSystem.isSpectacles()) {
    var worldPoint = script.camera.screenSpaceToWorldSpace(new vec2(0.5, 0.6), script.depthPosition);
    carousel.UpdateInitPosition(worldPoint);
    script.hexagon.getTransform().setWorldPosition(worldPoint);
    var comp = script.getSceneObject().getParent().getParent().createComponent("Component.DeviceTracking");
    comp.requestDeviceTrackingMode(2);
} else {
    setWorldPosInSafeRegion(script.verticalPosition, script.depthPosition);
}
