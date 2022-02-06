function GetCake() {
    function GetSlice(level, index) {
        return [
            new global.BoxPrint(new vec3(2, level, 0), index),
            new global.BoxPrint(new vec3(3, level, 0), index),
            new global.BoxPrint(new vec3(4, level, 0), index),
            new global.BoxPrint(new vec3(5, level, 0), index),
            new global.BoxPrint(new vec3(6, level, 0), index),
        
            new global.BoxPrint(new vec3(2, level, 8), index),
            new global.BoxPrint(new vec3(3, level, 8), index),
            new global.BoxPrint(new vec3(4, level, 8), index),
            new global.BoxPrint(new vec3(5, level, 8), index),
            new global.BoxPrint(new vec3(6, level, 8), index),

            new global.BoxPrint(new vec3(0, level, 2), index),
            new global.BoxPrint(new vec3(0, level, 3), index),
            new global.BoxPrint(new vec3(0, level, 4), index),
            new global.BoxPrint(new vec3(0, level, 5), index),
            new global.BoxPrint(new vec3(0, level, 6), index),

            new global.BoxPrint(new vec3(8, level, 2), index),
            new global.BoxPrint(new vec3(8, level, 3), index),
            new global.BoxPrint(new vec3(8, level, 4), index),
            new global.BoxPrint(new vec3(8, level, 5), index),
            new global.BoxPrint(new vec3(8, level, 6), index),

            new global.BoxPrint(new vec3(1, level, 1), index),
            new global.BoxPrint(new vec3(7, level, 1), index),
            new global.BoxPrint(new vec3(7, level, 7), index),
            new global.BoxPrint(new vec3(1, level, 7), index),
        ];
    }

    function GetTop(level, index) {
        var slice = [
            new global.BoxPrint(new vec3(2, level, 1), index),
            new global.BoxPrint(new vec3(3, level, 1), index),
            new global.BoxPrint(new vec3(4, level, 1), index),
            new global.BoxPrint(new vec3(5, level, 1), index),
            new global.BoxPrint(new vec3(6, level, 1), index),

            new global.BoxPrint(new vec3(2, level, 7), index),
            new global.BoxPrint(new vec3(3, level, 7), index),
            new global.BoxPrint(new vec3(4, level, 7), index),
            new global.BoxPrint(new vec3(5, level, 7), index),
            new global.BoxPrint(new vec3(6, level, 7), index),
        ];

        for (var x = 1; x < 8; x++) {
            for (var z = 2; z < 7; z++) {
                slice.push(new global.BoxPrint(new vec3(x, level, z), index));
            }
        }

        return slice;
    }

    function GetStrawberries(level, index) {
        return [
            new global.BoxPrint(new vec3(1, level, 1), index),
            new global.BoxPrint(new vec3(7, level, 1), index),
            new global.BoxPrint(new vec3(7, level, 7), index),
            new global.BoxPrint(new vec3(1, level, 7), index),
        ];
    }

    function GetRaspberries(level, index) {
        return [
            new global.BoxPrint(new vec3(3, level, 3), index),
            new global.BoxPrint(new vec3(5, level, 3), index),
            new global.BoxPrint(new vec3(5, level, 5), index),
            new global.BoxPrint(new vec3(3, level, 5), index),
        ];
    }

    var blocks = [];

    blocks = blocks.concat(GetSlice(0, 3));
    blocks = blocks.concat(GetSlice(1, 4));
    blocks = blocks.concat(GetSlice(2, 5));
    blocks = blocks.concat(GetTop(2, 5));

    blocks = blocks.concat(GetStrawberries(3, 0));
    blocks = blocks.concat(GetRaspberries(3, 9));

    blocks = blocks.concat([
        new global.BoxPrint(new vec3(2, 3, 8), 2),
        new global.BoxPrint(new vec3(3, 3, 8), 2),
        new global.BoxPrint(new vec3(4, 3, 8), 2),
        new global.BoxPrint(new vec3(5, 3, 8), 2),
        new global.BoxPrint(new vec3(6, 3, 8), 2),
        
        new global.BoxPrint(new vec3(2, 3, 0), 2),
        new global.BoxPrint(new vec3(3, 3, 0), 2),
        new global.BoxPrint(new vec3(4, 3, 0), 2),
        new global.BoxPrint(new vec3(5, 3, 0), 2),
        new global.BoxPrint(new vec3(6, 3, 0), 2),

        new global.BoxPrint(new vec3(0, 3, 2), 2),
        new global.BoxPrint(new vec3(0, 3, 3), 2),
        new global.BoxPrint(new vec3(0, 3, 4), 2),
        new global.BoxPrint(new vec3(0, 3, 5), 2),
        new global.BoxPrint(new vec3(0, 3, 6), 2),        

        new global.BoxPrint(new vec3(8, 3, 2), 2),
        new global.BoxPrint(new vec3(8, 3, 3), 2),
        new global.BoxPrint(new vec3(8, 3, 4), 2),
        new global.BoxPrint(new vec3(8, 3, 5), 2),
        new global.BoxPrint(new vec3(8, 3, 6), 2),           
    ]);

    return blocks;
}


script.api.getBlocks = GetCake;