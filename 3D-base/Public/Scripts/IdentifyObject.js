// IdentifyObject.js
// Version: 0.0.1
// Event: On Awake
// Description: Check if scanned result matches object name provided in script

//@input string objectName
//@input string scanType = "Objects" {"values": [{"value": "Objects", "label": "Objects"}, {"value": "Cars", "label": "Cars"}, {"value": "Dogs", "label": "Dogs"}, {"value": "Places", "label": "Places"}], "widget": "combobox"}
//@input Asset.Material successParticles
//@ui {"widget":"separator"}
//@input Component.Text textLabel
//@input Component.Text textResult
//@input string matchedString = "Yes!"
//@input string notMathcedString = "No!"

var prevResultMatched;
var psUpdateTime = 0;

script.textLabel.text = "is this \n" + script.objectName + "?";

scan();

function scan() {

    global.getScanResults(script.scanType, function callback(data) {
        if (!data) {
            scan();
            return;
        }

        checkResult(data);
        
        scan();
        
    }, function failureCallback() {
        scan();
    });
    
}

function checkResult(data) {
    
    var isMatched = false;
    
    for (var i=0;i<data.length;i++) {
        if (data[i].name.includes(script.objectName)) {
            isMatched = true;
        }
    }
    
    if (isMatched && !prevResultMatched) {
        resetPS();
    }

    prevResultMatched = isMatched;
    script.textResult.text = isMatched ? script.matchedString : script.notMathcedString;
}

function resetPS() {
    psUpdateTime = 0;
    script.successParticles.mainPass.spawnMaxParticles = 180;
}

function onUpdate() {  

    //update particle system if scan result matched
    if (psUpdateTime < 10) {
        psUpdateTime += getDeltaTime();
        script.successParticles.mainPass.externalTimeInput = psUpdateTime;
    }
}

script.createEvent("UpdateEvent").bind(onUpdate);