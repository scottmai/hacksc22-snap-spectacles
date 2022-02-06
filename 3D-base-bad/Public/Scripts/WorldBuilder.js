// Builder.js
// Version: 0.0.1
// Event: Initialized
// Description: Constructs a structure form the gives set of box prints

// @input SceneObject blocksRoot
// @input vec3 spectaclesOffset
// @input vec3 mobileOffset


function getBlocks() {
    var res = [];
    for (var i = 0; i < script.blocksRoot.getChildrenCount(); i++) {
        res.push(script.blocksRoot.getChild(i));
    }
    return res;
}
var blocks = getBlocks();


global.IntAxis = function IntAxis() { };
global.IntAxis.None = -1;
global.IntAxis.PosX = 0;
global.IntAxis.NegX = 1;
global.IntAxis.PosY = 2;
global.IntAxis.NegY = 3;
global.IntAxis.PosZ = 4;
global.IntAxis.NegZ = 5;


global.Rect = function Rect(min, max) {
    this.min = min;
    this.max = max;
};


Rect.prototype.Intersect = function(point, ray, top, bottom, right, left) {
    if (top === void 0) {
        top = global.IntAxis.PosY;
    }
    if (bottom === void 0) {
        bottom = global.IntAxis.NegY;
    }
    if (right === void 0) {
        right = global.IntAxis.PosX;
    }
    if (left === void 0) {
        left = global.IntAxis.NegX;
    }
    var tminX = (this.min.x - point.x) / ray.x;
    var tmaxX = (this.max.x - point.x) / ray.x;
    if (tminX > tmaxX) {
        var tmp0 = tminX;
        tminX = tmaxX;
        tmaxX = tmp0;
    }
    var tminY = (this.min.y - point.y) / ray.y;
    var tmaxY = (this.max.y - point.y) / ray.y;
    if (tminY > tmaxY) {
        var tmp1 = tminY;
        tminY = tmaxY;
        tmaxY = tmp1;
    }
    if (tminX > tmaxY || tmaxX < tminY) {
        return global.IntAxis.None;
    }
    if (tminY > tminX) {
        // y
        var centY = (this.min.y + this.max.y) * 0.5;
        if (point.y < centY) {
            return bottom;
        }
        return top;
    }
    if (tminX > tminY) {
        // x
        var centX = (this.min.x + this.max.x) * 0.5;
        if (point.x < centX) {
            return left;
        }
        return right;
    }
};


global.BoxPrint = function BoxPrint(pos, pieceIndex) {
    this.Position = pos;
    this.Instance = blocks[pieceIndex];
};


global.Box = function Box(bprint) {
    this.position = bprint.Position;
    this.sceneObject = this.Build(bprint);
    var half = 7.5;
    var hVec = new vec3(half, half, half);
    var min = this.position.sub(hVec);
    var max = this.position.add(hVec);
    this.rectX = new Rect(new vec2(min.z, min.y), new vec2(max.z, max.y));
    this.rectY = new Rect(new vec2(min.x, min.z), new vec2(max.x, max.z));
    this.rectZ = new Rect(new vec2(min.x, min.y), new vec2(max.x, max.y));
};


global.Box.prototype.Build = function(bprint) {
    // Instantiate scene object
    var so = script.getSceneObject().copyWholeHierarchy(bprint.Instance);
    so.getTransform().setLocalPosition(bprint.Position);
    so.enabled = true;
    return so;
};


global.Box.prototype.Trace = function(point, ray) {
    // ZY plane
    var pntX = new vec2(point.z, point.y);
    var rayX = new vec2(ray.z, ray.y);
    var intX = this.rectX.Intersect(pntX, rayX,global.IntAxis.PosY,global.IntAxis.NegY,global.IntAxis.PosZ,global.IntAxis.NegZ);
    if (intX == global.IntAxis.None) {
        return global.IntAxis.None;
    }
    // ZX plane
    var pntY = new vec2(point.x, point.z);
    var rayY = new vec2(ray.x, ray.z);
    var intY = this.rectY.Intersect(pntY, rayY,global.IntAxis.PosZ,global.IntAxis.NegZ,global.IntAxis.PosX,global.IntAxis.NegX);
    if (intY == global.IntAxis.None) {
        return global.IntAxis.None;
    }
    // XY plane
    var pntZ = new vec2(point.x, point.y);
    var rayZ = new vec2(ray.x, ray.y);
    var intZ = this.rectZ.Intersect(pntZ, rayZ);
    if (intZ == global.IntAxis.None) {
        return global.IntAxis.None;
    }
    if (intX == intY) {
        return intX;
    }
    if (intY == intZ) {
        return intY;
    }
    if (intZ == intX) {
        return intZ;
    }
    print("Unable to detect intersection: results are not equal!");
};


global.Box.prototype.GetOffset = function(axis) {
    var res;
    switch (axis) {
        case global.IntAxis.PosX:
            res = new vec3(1, 0, 0);
            break;
        case global.IntAxis.NegX:
            res = new vec3(-1, 0, 0);
            break;
        case global.IntAxis.PosY:
            res = new vec3(0, 1, 0);
            break;
        case global.IntAxis.NegY:
            res = new vec3(0, -1, 0);
            break;
        case global.IntAxis.PosZ:
            res = new vec3(0, 0, 1);
            break;
        case global.IntAxis.NegZ:
            res = new vec3(0, 0, -1);
            break;
        default:
            print("Unable to get offset: unknown axis " + axis);
    }
    return this.position.add(res.uniformScale(15));
};


global.Builder = function Builder(prints) {
    this.boxes = [];
    this.Kind = 0;
    this.Pieces = blocks;
    this.setStartingBlocks(prints);
    if (global.deviceInfoSystem.isSpectacles()) {
        script.getSceneObject().getTransform().setLocalPosition(script.spectaclesOffset);
    } else {
        script.getSceneObject().getTransform().setLocalPosition(script.mobileOffset);
    }
};


global.Builder.prototype.setStartingBlocks = function(prints) {
    if (prints) {
        for (var _i = 0, prints_1 = prints; _i < prints_1.length; _i++) {
            var p = prints_1[_i];
            p.Position = p.Position.uniformScale(15);
            this.boxes.push(new global.Box(p));
        }
    }
};


global.Builder.prototype.SetKind = function(index) {
    if (this.Kind < this.Pieces.length && this.Kind >= 0) {
        this.Kind = index;
    }
};


global.Builder.prototype.Trace = function(cam, ray) {
    // Apply offset
    var globalOffset = script.getSceneObject().getTransform().getWorldPosition();
    cam = cam.add(new vec3(-globalOffset.x, -globalOffset.y, -globalOffset.z));
    ray = ray.add(new vec3(-globalOffset.x, -globalOffset.y, -globalOffset.z));

    // Declare list of all baxes that the ray goes through
    var traced = [];

    // Go through all the boxes and get ones that intersect with the ray
    for (var _i = 0, _a = this.boxes; _i < _a.length; _i++) {
        var b = _a[_i];
        var res = b.Trace(cam, ray);
        if (res == global.IntAxis.None) {
            continue;
        }
        traced.push({ box: b, side: res });
    }

    if (traced.length == 0) {
        var gTrace = this.PlaneTrace(cam, ray);
        if (!gTrace) {
            return;
        }
        return new global.BoxPrint(gTrace, this.Kind);
    }

    var closest = traced.reduce(function(a, b) {
        return cam.distance(a.box.position) < cam.distance(b.box.position) ? a : b;
    });

    if (!closest) {
        print("No intersection found!");
        return;
    }

    var newBoxPos = closest.box.GetOffset(closest.side);
    return new global.BoxPrint(newBoxPos, this.Kind);
};


global.Builder.prototype.PlaneTrace = function(cam, ray) {
    var center = new vec3(0, 0, 0);
    var normal = new vec3(0, 1, 0);
    var denom = normal.dot(ray);
    if (Math.abs(denom) < 0.01) {
        return;
    }

    var si = center.sub(cam).dot(normal) / denom;
    if (si < 0) {
        return;
    }

    var rawPos = cam.add(ray.uniformScale(si));
    var floorX = Math.floor(rawPos.x / 15);
    var floorY = Math.floor(rawPos.y / 15);
    var floorZ = Math.floor(rawPos.z / 15);
    return new vec3(floorX, floorY, floorZ).uniformScale(15);
};


global.Builder.prototype.Add = function(boxPrint) {
    var newBox = new global.Box(boxPrint);
    this.boxes.push(newBox);
    print("Box spawned at: " + boxPrint.Position);
};