// PrintScanResultOnTap.js
// Version: 0.0.1
// Event: On Awake
// Description: Calling the scan function on tap

//@input Asset.ScanModule scanModule
//@input float scanThreshold = 0.7 {"widget":"slider","min":"0","max":"1","step":"0.01"}

//replace 'Objects' with Dogs, Cars or Places
var scanType = ScanModule.Contexts.Objects;
var scanReady = true;

function onScanComplete(json) {
    scanReady = true;
    
    var obj = JSON.parse(json);

    if (!obj || !obj.annotations || !obj.annotations[scanType] || !obj.annotations[scanType].annotations) {
        return;
    }
    
    var annotations = obj.annotations[scanType].annotations;    
    for (var i = 0; i < annotations.length; i++) {
        printAnnotation(annotations[i]);
    }
}

function printAnnotation(annotation) {
    if (annotation.confidence > script.scanThreshold) {
        print("Scan found: " + annotation.name);
    }
}

function onScanFailure(reason) {
    scanReady = true;
    print("Scan failure: " + reason);
}


script.createEvent("TapEvent").bind(function() {
    if (!scanReady) {
        print("calling scan too often! Waiting on last request..");
        return;
    }
    scanReady = false;
    print("Scan called! Waiting for scanned result.");
    script.scanModule.scan([scanType], onScanComplete, onScanFailure);
});