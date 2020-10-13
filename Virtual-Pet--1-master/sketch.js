var dog,dogSprite,happyDog,foodS,foodStock;
var database;
var foodObj;
var btnFeed,btnAddFeed;
var fedTime,lastFed;

function preload()
{
  dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  database=firebase.database();

  foodObj = new Food();
  foodObj.getFoodStock();

  dogSprite = createSprite(250,250,20,20);
  dogSprite.addImage(dog);
  dogSprite.scale=0.25;
 
  foodStock=database.ref("food");
  foodStock.on("value",readStock);

  btnFeed=createButton("Feed Nutmeg");
  btnFeed.position(600,100);
  btnAddFeed=createButton("Add food");
  btnAddFeed.position(650,100);
  btnAddFeed.mousePressed(addFood);

}


function draw() {  
background(46,139,87);


if (keyDown(UP_ARROW) && foodS!==0){
  foodS=foodS-1;
  writeStock(foodS);
  dogSprite.addImage(happyDog);

}
  drawSprites();
  
  textSize(18);
  fill("black");
  textStyle(BOLD);
  text("PRESS UP ARROW TO FEED NUTMEG",70,70);
  text("Food left: "+foodS,180,100);

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0
  }

  else{
    x=x-1;
  }

  console.log(x);
  database.ref('/').update({
    food:x
  })
}
function feedDog(){
  var foodDed= foodObj.deductFood(foodObj.getFoodStock());

  dogSprite.addImage(happyDog);

  database.ref("/").update({
    Food:foodDed,
    FeedTime:hour()
  })
}
function addFood(){
  if(foodObj.getFoodStock() < 30){

    database.ref("/").update({
      Food: foodObj.getFoodStock()+1
    })
  }
}





