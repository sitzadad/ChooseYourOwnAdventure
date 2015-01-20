//REUSED VARIABLES
var points=0;
var rephrase="I'm sorry, I didn't understand your last response. Please rephrase.";
var cavernDeath="While continuing to search the cavern for clues, you accidently fall in to large opening in the floor.  You are unable to get out. GAME OVER (Total points:"+points+")";
//FUNCTION RETURNS USER'S NAME
function enterName(){
  var myName=prompt("Please enter your name:");
  //CHECKING FOR NULL AND EMPTY
  if( myName ){
    //CONFIRM
    var iAmSure=prompt("You entered the name \"" + myName + "\". Are you sure you want to use this name?");
    if(iAmSure.toUpperCase()==="NO"||iAmSure.toUpperCase()==="N"){
      enterName();
    }else if(iAmSure.toUpperCase()==="YES"||iAmSure.toUpperCase()==="Y"){
      return myName;
      console.log("name from function = " + diff);
    }else{
      alert(rephrase);
      enterName();
    }
  //RESPONSE FOR NULL OR EMPTY NAME
  }else{
    alert("You must enter a name in order to continue.");
    enterName();
  }
}
//FUNCTION RETURNS DIFFICULTY SETTING
function selectDiff(){
  var diff=prompt("Select difficulty setting: Normal or Difficult");
  //CHECKS FOR NULL AND EMPTY
  if( diff ){
    if(diff.toUpperCase()==="NORMAL"||diff.toUpperCase()==="N"){
      //CONFIRM FOR NORMAL
      var wantNorm=prompt("You selected \"Normal\". Are you sure you want to use this setting?");
      if(wantNorm.toUpperCase()==="NO"||wantNorm.toUpperCase()==="N"){
        selectDiff();
      }else if(wantNorm.toUpperCase()==="YES"||wantNorm.toUpperCase()==="Y"){
        //Normal = 0
        return 0;
        console.log("diff from function = " + diff + "i.e., 0");
      }else{
        alert(rephrase);
        selectDiff();
      }
    }else if(diff.toUpperCase()==="DIFFICULT"||diff.toUpperCase()==="D"){
      //CONFIRM FOR DIFFICULT
      var wantDiff=prompt("You selected \"Difficult\". Are you sure you want to use this setting?");
      if(wantDiff.toUpperCase()==="NO"||wantDiff.toUpperCase()==="N"){
        selectDiff();
      }else if(wantDiff.toUpperCase()==="YES"||wantDiff.toUpperCase()==="Y"){
        //Difficult = 1
        return 1;
        console.log("inside function diff = " + diff + "i.e., 1");
      }else{
        alert(rephrase);
        selectDiff();
      }
    }
  //RESPONSE FOR NULL OR EMPTY DIFFICULTY
  }else{
    alert("You must select either the \"Normal\" or \"Difficult\" setting in order to continue.");
    selectDiff();
  }
}
//LAST CHANCE TO ABORT BEFORE GAME BEGINS
function areReady(){
  ready=prompt("Are you ready to begin?");
  if(ready.toUpperCase()==="NO"||ready.toUpperCase()==="N"){
    alert("Maybe next time. Refresh to try again. Goodbye.");
    return false;
  }else if(ready.toUpperCase()==="YES"||ready.toUpperCase()==="Y"){
    return true;
  }else{
    alert(rephrase);
    areReady();
  }
}
//KEYWORD RESPONSE LOGIC
function keywordLogic(input){
  //TO BE PASSED BACK
  var returnArray=[0,0,0];
  //USER STRING INPUT TO ARRAY
  var incomingArray=input.split(" ");
  //MOVEMENT ARRAY
  var moveArray=["walk","run","go","move","jump","skip","jog","crawl","relocate"];
  //INTERACTION ARRAY
  var interactArray=["use","open","close","pick up","apply","touch","grab","pull"];
  //INSPECTION ARRAY
  var inspectArray=["look","inspect","check"];
  //CHECK EACH WORD FROM USER INPUT
  for(var i=0;i<incomingArray.length;i++){
    //CHECKING FOR MOVEMENT KEYWORDS
    for(var j=0;j<moveArray.length;j++){
      if(incomingArray[i].toUpperCase()===moveArray[j].toUpperCase()){
        returnArray[0]=1;
      }
    }
    //CHECKING FOR INTERACTION KEYWORDS
    for(var j=0;j<interactArray.length;j++){
      if(incomingArray[i].toUpperCase()===interactArray[j].toUpperCase()){
        returnArray[1]=1;
      }
    }
    //CHECKING FOR INSPECTION KEYWORDS
    for(var j=0;j<inspectArray.length;j++){
      if(incomingArray[i].toUpperCase()===inspectArray[j].toUpperCase()){
        returnArray[2]=1;
      }
    }
  }
  return returnArray;
}
//CAVERN LOGIC
function cavernLogic(){
  points++;
  var cavernDecision=window.confirm("You enter the dark cavern through the opening in the wall. The only light comes from the lantern in the first room. You notice a key laying on the cavern floor about 20 feet in front of you. Select \"OK\" to pick up the key or \"Cancel\" to continue searching the cavern.");
  if(cavernDecision===true){
    points++;
    var postKeyDecision=window.confirm("The key looks rusted and old.  Maybe it will work on the wooden door from the first room. Select \"OK\" to return to the first room and try the key on the door or \"Cancel\" to continue searching the cavern.")
    if(postKeyDecision===true){
      points++;
      alert("Passing back to the first room, you try to open the door with the key. The key turns in the lock, and you escape through the door! YOU WIN (Total points:"+points+")");
    }else{
      points--;
      alert(cavernDeath);
    }
  }else if(cavernDecision===false){
    points--;
    alert(cavernDeath);
  }
}
//INITIALIZE GAME
game();
function game(){
  var initial=prompt("Would you like to play a game?");
  if(initial.toUpperCase()==="NO"||initial.toUpperCase()==="N"){
    //GOODBYE
    alert("Maybe next time. Refresh to try again. Goodbye.");
    return;
  }else if(initial.toUpperCase()==="YES"||initial.toUpperCase()==="Y"){
    //ENTER NAME
    var name=enterName();
    console.log("passed name = " + name);
    //SELECT DIFFICULTY
    var difficulty=selectDiff();
    console.log("passed diff = " + difficulty);
    //ARE YOU SURE
    if(areReady()===false){
      return;
    }
    //STORY
    var decision=prompt("You wake up in an unfamiliar room dimly lit by a nearby lantern. The walls appear to be made of dirt and rock.  There is an narrow opening in the wall in front of you leading into a cavern. Dripping water can be heard in the distance, but it is too dark to see further. On the opposite wall there is a sturdy-looking wooden door. You need to escape! What do you do?");
    //SEND TO FUNCTION FOR ACTION KEYWORD LOGIC
    var recievedArray=keywordLogic(decision);
    //USER STRING INPUT TO ARRAY
    var inputArray=decision.split(" ");
    var cavern=false;
    var door=false;
    for(var i=0;i<inputArray.length;i++){
      //CHECK FOR CAVERN KEYWORD
      if(inputArray[i].toUpperCase()==="CAVERN"||inputArray[i].toUpperCase()==="OPENING"){
        cavern=true;
        console.log(cavern);
      //CHECK FOR DOOR KEYWORD
      }else if(inputArray[i].toUpperCase()==="DOOR"){
        door=true;
        console.log(door);
      }
    }
    if(cavern===true && recievedArray[0]=="1"){
      cavernLogic();
    }else if(door===true && recievedArray[1]=="1"){
      var doorLockedDecision=window.confirm("The door is locked and needs a key to open. Do you want to try exploring the cavern opening on the otherside of the room? Select \"OK\" to enter the cavern or \"Cancel\" to continue searching this room for clues.");
      if(doorLockedDecision===true){
        cavernLogic();
      }else if(doorLockedDecision===false){
        points--;
        alert("While continuing to search the room for clues, you stumble across a snake that bites you on the leg. Feeling dizzy from the snake bite, you sit down to recover, but it doesn't help. You'll never escape now that your injured. GAME OVER (Total points:"+points+")");
      }
    }else{
      alert("You've entered an invalid command. Goodbye.");
    }
    return;
  }else{
    //TRY AGAIN
    alert(rephrase);
    game();
  }
}
