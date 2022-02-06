// -----JS CODE-----
//import all scenes (home, game, learn) and enable 
//@input SceneObject game
//@input SceneObject learn
//@input SceneObject home

global.behaviorSystem.addCustomTriggerResponse("setGameMode", setGameMode)

var gm = global.gamestate;
var Home = script.home;
var Learn = script.learn;
var Game = script.game;

function setGameMode(){
    print("test response");
    if(gm==0){
        //home mode
        Learn.enabled = false;
        Game.enabled = false;
        Home.enabled = true;
    }
    else if (gm==1){
        //run script for learn mode
        Learn.enabled = true;
        Game.enabled = false;
        Home.enabled = false;
    }
    else if(gm==2){
        //run script for game mode
        Learn.enabled = false;
        Game.enabled = true;
        Home.enabled = false;
    }
}


