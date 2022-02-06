//@input bool persistentStorage
//@input float scanFrequency = 1 {"widget": "slider", "min": 1.0, "max": 2.0, "step": 0.1}
//@ui {"widget":"separator"}
//@input string[] labels
//@input string scanType = "Places" {"values": [{"value": "Objects", "label": "Objects"}, {"value": "scanCars", "label": "Cars"}, {"value": "Dogs", "label": "Dogs"}, {"value": "Places", "label": "Places"}], "widget": "combobox"}
//@input SceneObject checklistItem
//@input SceneObject itemParent

var layoutScript = script.itemParent.getComponent("Component.ScriptComponent");
var store = global.persistentStorageSystem.store;
var Items = [];

initialize();
function initialize() {
    if (script.labels.length > 0) {
        var item0 = new Item(script.checklistItem, script.labels[0]);
        Items.push(item0);
        for (var i = 1;i<script.labels.length;i++) {
            var obj = script.itemParent.copyWholeHierarchy(script.checklistItem);
            var newitem = new Item(obj, script.labels[i]);
            Items.push(newitem);
        }
    } else if (script.items.length == 0) {
        print("ERROR, No Item in the Checklist!");
        return;
    }
    
    layoutScript.api.initialize();
    layoutScript.api.updateLayout();
    
    scan();

}

function Item(sceneObj, name) {
    this.name = name;
    var status = false;
    if (script.persistentStorage && store.getBool(this.name)) {
        status = store.getBool(this.name);
    }
    this.itemScript = sceneObj.getComponent("Component.ScriptComponent");
    this.itemScript.api.setLabel(name);
    
    this.setStatus = function(status) {
        this.status = status;
        this.itemScript.api.setChecked(status);
        if (script.persistentStorage && status) {
            store.putBool(this.name, this.status);
        }
    };
    
    this.setStatus(status);
}

function scan() {    
    global.getScanResults(script.scanType, function callback(data) {
        
        if (!data) {
            scan();
            return;
        }
        
        for (var i=0;i<data.length;i++) {
            var d = data[i].name.toLowerCase();
            for (var j=0;j<Items.length;j++) {
                var itemName = Items[j].name.toLowerCase();
                if (d.includes(itemName)) {
                    Items[j].setStatus(true);
                }
            }
        }
        scan();
    }, function failureCallback(data) {
        scan();
    });
}
