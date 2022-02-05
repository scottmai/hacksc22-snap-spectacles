// TapToScan.js
// Version: 0.0.1
// Event: On Awake
// Description: Attached to buttons that calls the scan manager with a specific scan type on button pressed

//@input Component.Text scanResult
//@input string scanType = "Objects" {"values": [{"value": "Objects", "label": "Objects"}, {"value": "Cars", "label": "Cars"}, {"value": "Dogs", "label": "Dogs"}, {"value": "Places", "label": "Places"}], "widget": "combobox"}

var scanReady = true;

script.createEvent("TapEvent").bind(function() {
    
    //only call scan if enough time has passed since getting last result
    if (!scanReady) {
        return;
    }    

    script.scanResult.text = "Scanning...";
    scanReady = false;
    
    global.getScanResults(script.scanType, function callback(data) {
        
        if (!data) {
            script.scanResult.text = "No Result";
            scanReady = true;
            return;
        }
        
        var combinedResults = data[0].name;
        if (data.length > 1) {
            for (var i=1;i<data.length;i++) {
                combinedResults += "\n";
                combinedResults += data[i].name;
            }
            
        }
        script.scanResult.text = combinedResults;
        scanReady = true;
    }, function failureCallback() {
        scanReady = true;
    });
    
});