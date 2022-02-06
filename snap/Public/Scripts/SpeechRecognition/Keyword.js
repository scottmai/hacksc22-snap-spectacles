// Keyword.js
// Event: OnAwake
// Version: 0.1.0
// Description: This script define keyword for keyword detection

//@input string keyword
//@input string[] categoryAliases
//@input bool sendTriggers
//@input Component.ScriptComponent[] onKeywordTriggeredGlobalBehaviors {"showIf":"sendTriggers", "label":"On Keyword Triggered"}

script.api.getKeyword = getKeyword;
script.api.getCategoryAliases = getCategoryAliases;
script.api.getBehaviorComponents = getBehaviorComponents;

function getBehaviorComponents() {
    if (!script.sendTriggers) {
        return null;
    }
    var behaviors = script.onKeywordTriggeredGlobalBehaviors.filter(isNotNull);
    var filteredCount = behaviors.length;
    var count = script.onKeywordTriggeredGlobalBehaviors.length;
    if (count==0 || filteredCount!==count) {
        print("Warning: Make sure to assign behavior script to the keyword trigger");
        return [];
    }
    
    return behaviors;
}

function getKeyword() {
    if (!script.keyword || script.keyword == "") {
        print("ERROR: Make sure to define keyword");
        return null;
    }
    return script.keyword;
}


function getCategoryAliases() {
    var aliases = script.categoryAliases.filter(isNotNull);
    var filteredCount = aliases.length;
    var count = script.categoryAliases.length;
    
    if (count==0 || filteredCount!==count) {
        print("ERROR: Make sure to define category aliases");
        return [];
    }
    return aliases;
}

function isNotNull(value) { 
    return value!==null && value!=="";
}

