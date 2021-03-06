// ScanOnUpdate.js
// Version: 0.0.1
// Event: On Awake
// Description: Create a basic scan example with calling the scan module on update

//@input Component.Text scanResult
//@input string scanType = "Objects" {"values": [{"value": "Objects", "label": "Objects"}, {"value": "Cars", "label": "Cars"}, {"value": "Dogs", "label": "Dogs"}, {"value": "Places", "label": "Places"}], "widget": "combobox"}
//@input Component.Text scanTypeText
//@input bool printDebugLog

//@input Component.ScriptComponent Translate
//@input Component.ScriptComponent GameController

initialize();

function initialize() {

    if (script.scanTypeText) {
        script.scanTypeText.text = script.scanType;
    }

    if (!script.scanResult) {
        debugPrint("ERROR! No Scan Result Text input, please link a text component to the scanResult variable.");
        return false;
    }

    scan();

    return true;

}

function scan() {

    global.getScanResults(script.scanType, function callback(data) {
        if (data) {
            var combinedResults = "";
            for (var i = 0; i < data.length; i++) {
                var word = data[i].name
                if (word === 'Clothing') {
                    continue;
                }
                if (global.gameState === 2) {
                    script.GameController.api.onScan(word);
                }
                var translation = script.Translate.api.translateWordToLang(word, global.language);
                if (translation && global.gameState === 1) {
                    combinedResults += translation;
                    combinedResults += "\n";
                    // combinedResults += word;
                    // combinedResults += "\n";
                    debugPrint("Scan Result: " + data[i].name);
                }
            }
            script.scanResult.text = combinedResults;

        } else {
            debugPrint("Scan has No Result!");
        }

        scan();
    }, function failureCallback(data) {
        debugPrint("Scan Failed! " + data);
        scan();
    });

}

function debugPrint(message) {
    if (script.printDebugLog) {
        print(message);
    }
}

