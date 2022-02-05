// CheckLabelSwitch.js
// Version: 0.0.1
// Event: On Awake
// Description: Check if scanned result has switched to another and trigger responses

//@input string scanType = "Places" {"values": [{"value": "Objects", "label": "Objects"}, {"value": "scanCars", "label": "Cars"}, {"value": "Dogs", "label": "Dogs"}, {"value": "Places", "label": "Places"}], "widget": "combobox"}
//@ui {"widget": "separator"}
//@input string label1Name = "Indoor"
//@input string label2Name = "Outdoor"
//@ui {"widget": "separator"}
//@input bool callTweens = true
//@input SceneObject tweenObject {"showIf":"callTweens","showIfValue":"true"}
//@input string[] label1TweenNames {"showIf":"callTweens","showIfValue":"true"}
//@input string[] label2TweenNames {"showIf":"callTweens","showIfValue":"true"}

//@input bool callBehaviorTriggers = true
//@input string[] label1Trigger  {"showIf":"callBehaviorTriggers","showIfValue":"true"}
//@input string[] label2Trigger {"showIf":"callBehaviorTriggers","showIfValue":"true"}

var prevLabel = 0;

var labelStatus = {
    label1: -1,
    label2: 2
};

var currentLabel = 0;

scan();

function scan() {

    global.getScanResults(script.scanType, function callback(data) {
        if (!data) {
            scan();
            return;
        }
        
        //set current label based on scanned result
        for (var i=0;i<data.length;i++) {
            if (data[i].name.includes(script.label1Name)) {
                currentLabel = labelStatus.label1;
            } else if (data[i].name.includes(script.label2Name)) {
                currentLabel = labelStatus.label2;
            }
        }
        
        //check if current label and previous label matches the 2 labels provided
        checkResult();
        
        scan();
        
    }, function failureCallback(data) {
        scan();
    });
}

function checkResult() {
    if (currentLabel == prevLabel) {
        return;
    }
    
    //trigger behavior and tweens only if label switches from 1 to 2 or from 2 to 1
    if ((currentLabel == labelStatus.label1) && (prevLabel == labelStatus.label2)) {
        setResponse(labelStatus.label1);
    } else if ((currentLabel == labelStatus.label2) && (prevLabel == labelStatus.label1)) {
        setResponse(labelStatus.label2);
    }

    //sets previous label to current label for next check
    prevLabel = currentLabel;
}

function setResponse(labelResult) {
    
    if (labelResult == labelStatus.label1) {
        for (var i=0;i<script.label1TweenNames.length;i++) {
            global.tweenManager.startTween(script.tweenObject, script.label1TweenNames[i]);
        }
        for (var j=0;j<script.label1Trigger.length;j++) {
            global.behaviorSystem.sendCustomTrigger(script.label1Trigger[j]);
        }
    } else if (labelResult == labelStatus.label2) {
        for (var k=0;k<script.label2TweenNames.length;k++) {
            global.tweenManager.startTween(script.tweenObject, script.label2TweenNames[k]);
        }
        for (var l=0;l<script.label2Trigger.length;l++) {
            global.behaviorSystem.sendCustomTrigger(script.label2Trigger[l]);
        }
    }

}
