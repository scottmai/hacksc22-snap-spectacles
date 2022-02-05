// GetCarPrice.js
// Version: 0.0.1
// Event: On Awake
// Description: Gets scanned car's name, model and price

//@ui {"widget":"separator"}
//@input Component.Text carNameText
//@input Component.Text carPriceText
//@ui {"widget":"separator"}
//@input string carFoundTrigger

var carNamePrev = "";

scan();

function scan() {

    global.getScanResults("Cars", function callback(data) {
        if (!data) {
            scan();
            return;
        }
        
        if (data[0]["extraData"]["msrp"] == null) {
            print("SCAN RESULT NOT RETURNING CARS");
            scan();
            return;
        }
            
        script.carNameText.text = data[0].name;
        script.carPriceText.text = data[0]["extraData"]["msrp"];
        
        if (data[0].name != carNamePrev) {
            global.behaviorSystem.sendCustomTrigger(script.carFoundTrigger);
            carNamePrev = data[0].name;
        } 
        
    }, function failureCallback(data) {
        scan();
    });

}
