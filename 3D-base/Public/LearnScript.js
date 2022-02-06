// -----JS CODE-----

global.language = "English";
global.gameState = 0;
global.behaviorSystem.addCustomTriggerResponse("StartGame", startGame);
global.behaviorSystem.addCustomTriggerResponse("FrenchStart", startFrench);
global.behaviorSystem.addCustomTriggerResponse("SpanishStart", startSpanish);
global.behaviorSystem.addCustomTriggerResponse("ChineseStart", startChinese);
global.behaviorSystem.addCustomTriggerResponse("StartHunt", startHunt);
global.behaviorSystem.addCustomTriggerResponse("GoHome", goHome);



var lang = script.language;

function goHome(){
    print("goHome");
    gameState = 0;
    lang = "English";
    language = lang;
}


function startGame(){
    print("start English");
    gameState = 1;
    lang = "English";
    language = lang;
}

function startFrench(){
    print("start French");
    gameState = 1;
    lang = "French";
    language = lang;
}

function startSpanish(){
    print("start Spanish");
    gameState = 1;
    lang = "Spanish";
    language = lang;
}

function startChinese(){
    print("start Chinese");
    gameState = 1;
    lang = "Chinese";
    language = lang;
}

function startHunt(){
    print("start hunting");
    gameState = 2;
    language = lang;
}

script.createEvent("UpdateEvent").bind(function(){
    if(startGame){
        //start the game
    }
});