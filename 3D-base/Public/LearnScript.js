// -----JS CODE-----

global.behaviorSystem.addCustomTriggerResponse("StartGame", startGame);

var startgame = false;
function startGame(){
    print("start learning");
    startgame = true;
}

script.createEvent("UpdateEvent").bind(function(){
    if(startGame){
        //start the game
    }
});