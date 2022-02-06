// -----JS CODE-----
//@input SceneObject game
//@input SceneObject learn
//@input SceneObject home
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
script.game.enabled = false;
script.learn.enabled = false;
script.home.enabled = true;
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

script.api.learnFirst = startChinese;
script.api.gameFirst = startHunt;

function goHome() {
    print("goHome");
    global.gameState = 0;
    script.game.enabled = false;
    script.learn.enabled = false;
    script.home.enabled = true;
    lang = "English";
    language = lang;
    WriteScreen();
}


function startGame() {
    print("start English");
    global.gameState = 1;
    lang = "English";
    script.game.enabled = false;
    script.learn.enabled = true;
    script.home.enabled = false;
    language = lang;
    clearScreen();
}

function startFrench() {
    print("start French");
    global.gameState = 1;
    script.game.enabled = false;
    script.learn.enabled = true;
    script.home.enabled = false;
    lang = "French";
    language = lang;
    clearScreen();
}

function startSpanish() {
    print("start Spanish");
    global.gameState = 1;
    script.game.enabled = false;
    script.learn.enabled = true;
    script.home.enabled = false;
    lang = "Spanish";
    language = lang;
    clearScreen();
}

function startChinese() {
    print("start Chinese");
    script.game.enabled = false;
    script.learn.enabled = true;
    script.home.enabled = false;
    global.gameState = 1;
    lang = "Chinese";
    language = lang;
    clearScreen();
}

function startKorean() {
    print("start Korean");
    gameState = 1;
    script.game.enabled = false;
    script.learn.enabled = true;
    script.home.enabled = false;
    lang = "Korean";
    language = lang;
    clearScreen();
}
function startRussian() {
    print("start Russian");
    gameState = 1;
    lang = "Russian";
    script.game.enabled = false;
    script.learn.enabled = true;
    script.home.enabled = false;
    language = lang;
    clearScreen();
}
function startItalian() {
    print("start Italian");
    gameState = 1;
    lang = "Italian";
    language = lang;
    script.game.enabled = false;
    script.learn.enabled = true;
    script.home.enabled = false;
    clearScreen();
}
function startGerman() {
    print("start German");
    gameState = 1;
    script.game.enabled = false;
    script.learn.enabled = true;
    script.home.enabled = false;
    lang = "German";
    language = lang;
    clearScreen();
}
function startJapanese() {
    print("start Japanese");
    gameState = 1;
    lang = "Japanese";
    script.game.enabled = false;
    script.learn.enabled = true;
    script.home.enabled = false;
    language = lang;
    clearScreen();
}
function startArabic() {
    print("start Arabic");
    gameState = 1;
    script.game.enabled = false;
    script.learn.enabled = true;
    script.home.enabled = false;
    print(gameState);
    lang = "Arabic";
    language = lang;
    clearScreen();
}

function clearScreen() {
    // script.game.enabled = false;
    // script.learn.enabled = true;
    // script.home.enabled = false;
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

function WriteScreen() {
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


function startHunt() {
    print("start hunting");
    global.gameState = 2;
    script.game.enabled = true;
    script.learn.enabled = false;
    script.home.enabled = false;
    language = lang;
    clearScreen();
}


