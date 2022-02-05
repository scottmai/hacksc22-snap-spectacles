// ScanController.js
// Version: 0.0.1
// Event: On Awake
// Description: Calls the Scan module and expose results through public functions that can be accessed across project

//@input Asset.ScanModule module
//@input float scanThreshold = 0.7 {"widget": "slider", "min": 0.0, "max": 1.0, "step": 0.1}

function onScanComplete(context, callback) {
    return function(json) {

        var obj = JSON.parse(json);

        if (!obj || !obj.annotations || !obj.annotations[context] || !obj.annotations[context].annotations) {
            callback(null);
            return;
        }
        
        var annotations = obj.annotations[context].annotations;
        
        for (var i=0;i<annotations.length;i++) {
            if (annotations[i].confidence < script.scanThreshold) {             
                annotations.splice(i, 1);
            }
        }
        
        if (annotations.length > 0) {
            callback(annotations);
        } else {
            callback(null);
        }
    };
}

function onScanFailure(callback) {
    return function(reason) {
        print("Scan failure: " + reason);
        callback(reason);
    };    
}

function getScanResults(typeString, callback, failureCallback) {
    var scanType = ScanModule.Contexts[typeString];
    script.module.scan([scanType], onScanComplete(scanType, callback), onScanFailure(failureCallback));
}

global.getScanResults = getScanResults;