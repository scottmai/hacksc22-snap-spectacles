// -----JS CODE-----
//import all scenes (home, game, learn) and enable 
//@input SceneObject game
//@input SceneObject learn
//@input SceneObject home

global.behaviorSystem.addCustomTriggerResponse("setGameMode", setGameMode) //game
global.behaviorSystem.addCustomTriggerResponse("setGameMode2", setGameMode2) //next
global.behaviorSystem.addCustomTriggerResponse("setGameMode3", setGameMode3) //learn
global.behaviorSystem.addCustomTriggerResponse("setGameMode4", setGameMode4) //home

var gm = global.gamestate;
var Home = script.home;
var Learn = script.learn;
var Game = script.game;

function setGameMode(){
    print("game");
    gm = 2;
    gamestate = gm;
    Home.enabled = false;
    Learn.enabled = false;
    Game.enabled = true;
}

function setGameMode2(){ //next
    print("next");
    gm = 2;
    gamestate = gm;
    Home.enabled = false;
    Learn.enabled = false;
    Game.enabled = true;
}

function setGameMode3(){ //learn mode
    print("learn");
    gm = 1;
    gamestate = gm;
    Home.enabled = false;
    Learn.enabled = true;
    Game.enabled = false;
}

function setGameMode4(){ //home 
    print("home");
    gm = 0;
    gamestate = gm;
    Home.enabled = true;
    Learn.enabled = false;
    Game.enabled = false;
}


