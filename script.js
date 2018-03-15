const colors = [0,1,2,3];
var gameOn = false;
var skill = false;

function add0(){simon.sendColor(colors[0]);simon.effects(0);};
function add1(){simon.sendColor(colors[1]);simon.effects(1);};
function add2(){simon.sendColor(colors[2]);simon.effects(2);};
function add3(){simon.sendColor(colors[3]);simon.effects(3);};
function start(){simon.pattern=[];simon.step=0;simon.counter=0;document.querySelector(".display").innerText = (simon.counter);simon.nextPattern();};



var sounds =[
new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
];

function nomercy(){   
skill = (skill == false) ? true : false;
if(skill) {document.querySelector(".flash").classList.add("active0");}
else {document.querySelector(".flash").classList.remove("active0");}    
  };


var simon = {
removeEvents: function(){
buttons[0].removeEventListener("click", add0);                                                                          
buttons[1].removeEventListener("click", add1); 
buttons[2].removeEventListener("click", add2); 
buttons[3].removeEventListener("click", add3); 
buttons[4].removeEventListener("click", start);
buttons[5].removeEventListener("click", nomercy);
 },

counter: 0,
  
addEvents: function(){
buttons[0].addEventListener("click",add0);                                                                          
buttons[1].addEventListener("click",add1);  
buttons[2].addEventListener("click",add2);  
buttons[3].addEventListener("click",add3);
buttons[4].addEventListener("click",start);
buttons[5].addEventListener("click",nomercy);
},
  
sendColor: function(color){
console.log("new color: " + color)
if(color===simon.pattern[simon.step]){
  if(simon.step=== simon.pattern.length-1){
    console.log('pattern complete');
    if(simon.counter==20)
    {document.querySelector(".title").innerText = ('You win');simon.pattern=[];simon.step=0;simon.counter=0;setTimeout(function(){document.querySelector(".display").innerText=(simon.counter);document.querySelector(".title").innerText = ('Simon')},1000)
    } else       
      simon.step=0;
      setTimeout(function(){simon.nextPattern();},1000);  
      } 
  else {
     simon.step++;
         }
    }
 else {setTimeout(function(){
    if (skill){
    setTimeout(function(){start()},1000);
    } else 
    simon.step=0;
    simon.removeEvents();
    document.querySelector(" .display").innerText = ('!!');
    for (let i=0; i<simon.pattern.length; i++) {
    setTimeout(() => {simon.effects(simon.pattern[i]);}, 1000+(i*1000))};
    setTimeout(function(){document.querySelector(" .display").innerText = (simon.counter);simon.addEvents();},1000*simon.pattern.length);},500);
    },
                        },
  pattern: [],
  
  step: 0,
  
  nextPattern: function(){
  simon.removeEvents();
  var random =  Math.floor(Math.random()*colors.length); 
  var nextColor = colors[random];
  console.log("random color is: "+ nextColor);
  simon.pattern.push(nextColor);
  console.log("pattern is: "+ simon.pattern);
  simon.counter++;
  document.querySelector(".display").innerText = (simon.counter);   
  for (let i=0; i<simon.pattern.length; i++) {
  setTimeout(() => {simon.effects(simon.pattern[i]);}, 1000 * i)
  }; setTimeout(()=>{simon.addEvents();},1000*simon.pattern.length)
  },
  
  effects: function(elem){
  sounds[elem].play();
  buttons[elem].classList.add('active'+elem);
  setTimeout(function(){buttons[elem].classList.remove('active'+elem);},400);
  
  }
 
};

const buttons = document.getElementsByClassName('gamebutton');
buttons[6].addEventListener("click",runGame);

function runGame(){    
    gameOn = (gameOn == false) ? true : false;
      if(gameOn) {
      document.querySelector(".inner-switch").classList.add("inner-inactive");
      document.querySelector(".switch").classList.add("outter-active");
      document.querySelector(".display").innerText=("0")
      buttons[4].addEventListener("click",start);
      buttons[5].addEventListener("click",nomercy);
        
    }
    else {
      document.querySelector(".inner-switch").classList.remove("inner-inactive");
      document.querySelector(".switch").classList.remove("outter-active");
      document.querySelector(".display").innerText=("")
      simon.removeEvents();
      document.querySelector(".flash").classList.remove("active2");
      skill = false;
      simon.pattern=[];
      simon.step=0;
      simon.counter=0;
    }    
  };
