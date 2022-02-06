script.api.getBlocks = function() {
    return [
        new global.BoxPrint(new vec3(0, 0, 0), 0),
        new global.BoxPrint(new vec3(1, 0, 0), 0),
        new global.BoxPrint(new vec3(2, 0, 0), 0),
        new global.BoxPrint(new vec3(0, 0, 1), 0),
        new global.BoxPrint(new vec3(1, 0, 1), 0),
        new global.BoxPrint(new vec3(2, 0, 0), 2),
        new global.BoxPrint(new vec3(0, 1, 0), 3),
        new global.BoxPrint(new vec3(0, 0, 2), 4),
    ];
};