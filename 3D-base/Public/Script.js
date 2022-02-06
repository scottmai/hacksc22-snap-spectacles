// -----JS CODE-----
//import all scenes (home, game, learn) and enable 
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

global.behaviorSystem.addCustomTriggerResponse("setGameMode", setGameMode) //game
global.behaviorSystem.addCustomTriggerResponse("setGameMode2", setGameMode2) //next
global.behaviorSystem.addCustomTriggerResponse("setGameMode3", setGameMode3) //learn
global.behaviorSystem.addCustomTriggerResponse("setGameMode4", setGameMode4) //home


function clearScreen() {
    script.game.enabled = false;
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

var gm = global.gameState;

var Home = script.home;
var Learn = script.learn;
var Game = script.game;

function setGameMode() {
    print("game");
    global.gameState = 2;
    Home.enabled = false;
    Learn.enabled = false;
    Game.enabled = true;
    clearScreen();
}

function setGameMode2() { //next
    print("next");
    global.gameState = 2;
    Home.enabled = false;
    Learn.enabled = false;
    Game.enabled = true;
    clearScreen();
}

function setGameMode3() { //learn mode
    print("learn");
    global.gameState = 1;
    Home.enabled = false;
    Learn.enabled = true;
    Game.enabled = false;
    clearScreen();
}

function setGameMode4() { //home 
    print("home");
    global.gameState = 0;
    Home.enabled = true;
    Learn.enabled = false;
    Game.enabled = false;
    WriteScreen();
}


