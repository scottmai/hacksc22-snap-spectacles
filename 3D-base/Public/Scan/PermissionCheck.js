// -----JS CODE-----
// PermissionCheck.js
// Version: 0.0.1
// Event: On Awake
// Description: Promps feedback to check scan permissions

//@input SceneObject scanObject
//@input SceneObject waitingScreen

function initialize() {
    scanAllowed(false);
    scan();
}
initialize();

function scanAllowed(b) {
    script.scanObject.enabled = b;
    script.waitingScreen.enabled = false;
}

function scan() {
    global.getScanResults("Objects", function callback(data) {
        if (data) {
            scanAllowed(true);
        } else {
            scan();
        }
    }, function failureCallback(data) {
        if (data.includes("decline permission")) {
            scanAllowed(false);
        }
        scan();
    });        

}
