// -----JS CODE-----
//@input Component.Image en
//@input Component.Image fr
//@input Component.Image sp
//@input Component.Image ch
//@input Component.Image ko
//@input Component.Image ru
//@input Component.Image it
//@input Component.Image ge
//@input Component.Image ja
//@input Component.Image ar


global.language = "English";
global.gameState = 0;
global.behaviorSystem.addCustomTriggerResponse("StartGame", startGame);
global.behaviorSystem.addCustomTriggerResponse("FrenchStart", startFrench);
global.behaviorSystem.addCustomTriggerResponse("SpanishStart", startSpanish);
global.behaviorSystem.addCustomTriggerResponse("ChineseStart", startChinese);
global.behaviorSystem.addCustomTriggerResponse("KoreanStart", startKorean);
global.behaviorSystem.addCustomTriggerResponse("RussianStart", startRussian);
global.behaviorSystem.addCustomTriggerResponse("ItalianStart", startItalian);
global.behaviorSystem.addCustomTriggerResponse("GermanStart", startGerman);
global.behaviorSystem.addCustomTriggerResponse("JapaneseStart", startJapanese);
global.behaviorSystem.addCustomTriggerResponse("ArabicStart", startArabic);
global.behaviorSystem.addCustomTriggerResponse("StartHunt", startHunt);
global.behaviorSystem.addCustomTriggerResponse("GoHome", goHome);





var lang = script.language;

function goHome(){
    print("goHome");
    gameState = 0;
    lang = "English";
    language = lang;
    WriteScreen();
}


function startGame(){
    print("start English");
    gameState = 1;
    lang = "English";
    language = lang;
    clearScreen();
}

function startFrench(){
    print("start French");
    gameState = 1;
    lang = "French";
    language = lang;
    clearScreen();
}

function startSpanish(){
    print("start Spanish");
    gameState = 1;
    lang = "Spanish";
    language = lang;
    clearScreen();
}

function startChinese(){
    print("start Chinese");
    gameState = 1;
    lang = "Chinese";
    language = lang;
    clearScreen();
}
function startKorean(){
    print("start Korean");
    gameState = 1;
    lang = "Korean";
    language = lang;
    clearScreen();
}
function startRussian(){
    print("start Russian");
    gameState = 1;
    lang = "Russian";
    language = lang;
    clearScreen();
}
function startItalian(){
    print("start Italian");
    gameState = 1;
    lang = "Italian";
    language = lang;
    clearScreen();
}
function startGerman(){
    print("start German");
    gameState = 1;
    lang = "German";
    language = lang;
    clearScreen();
}
function startJapanese(){
    print("start Japanese");
    gameState = 1;
    lang = "Japanese";
    language = lang;
    clearScreen();
}
function startArabic(){
    print("start Arabic");
    gameState = 1;
    print(gameState);
    lang = "Arabic";
    language = lang;
    clearScreen();
}

function clearScreen(){
    script.en.enabled = false;
    script.fr.enabled = false;
    script.sp.enabled = false;
    script.ch.enabled = false;
    script.ko.enabled = false;
    script.ru.enabled = false;
    script.it.enabled = false;
    script.ge.enabled = false;
    script.ja.enabled = false;
    script.ar.enabled = false;
}

function WriteScreen(){
    script.en.enabled = true;
    script.fr.enabled = true;
    script.sp.enabled = true;
    script.ch.enabled = true;
    script.ko.enabled = true;
    script.ru.enabled = true;
    script.it.enabled = true;
    script.ge.enabled = true;
    script.ja.enabled = true;
    script.ar.enabled = true;
}


function startHunt(){
    print("start hunting");
    gameState = 2;
    language = lang;
    clearScreen();
}

