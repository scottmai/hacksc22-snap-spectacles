// SpeechContext.js
// Event: OnAwake
// Version: 0.1.0
// Description: This script defines speech context for speech recognition

//@input string[] phrases
//@input int boostValue {"widget":"slider", "min":1, "max":10, "step":1}

script.api.getPhrases = getPhrases;
script.api.getBoostValue = getBoostValue;

function getPhrases() {
    var phrases = script.phrases.filter(isNotNull);
    var count = script.phrases.length;
    var filteredCount = phrases.length;
    if (script.phrases.length==0 || count!=filteredCount) {
        print("ERROR: Make sure to assign phrases to speech context");
        return [];
    }
    return phrases;

}

function getBoostValue() {

    return script.boostValue;
}


function isNotNull(value) { 
    return value!==null && value!=="";
}
