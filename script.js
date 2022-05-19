const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

const table = document.getElementById("table");
const dowlandscreen = document.getElementById("screen");

const logs = document.getElementById("logs");
const logsMessages = document.createElement("b");

const goals = [document.getElementById("redgoal"),document.getElementById("bluegoal")];

const numara1 = Math.floor(Math.random()*99);
const numara2 = Math.floor(Math.random()*99);

var message = "";

var player1name = "";
var player2name = "";

function dowland(){
  canvas.style.display = "none";
  table.style.display = "none";
}
function opengame(){
  player1name = document.getElementById("name1").value;
  player2name = document.getElementById("name2").value;
  if(player1name == "" || player2name == ""){
  alert("İSİM GİRİNİZ"); 
  canvas.style.display = "none";
  table.style.display = "none";
  }
  else if(player1name == "" && player2name == ""){
  alert("İSİM GİRİNİZ");
  canvas.style.display = "none";
  table.style.display = "none";
  }
  else{
  canvas.style.display = "inline-block";
  table.style.display = "inline-block";
  dowlandscreen.style.display = "none";
  }
}
var score1 = document.getElementById("score1");
var score2 = document.getElementById("score2");
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var goalblue = false;
var init = requestAnimationFrame(start);
var player1 = new Player(100,250);
var player2 = new Player(600,250);
var ball = new Ball(350,250);
var wDown = false;
var sDown = false;
var aDown = false;
var dDown = false;
var upDown = false;
var downDown = false;
var leftDown = false;
var rightDown = false;
function start(){
	clear();
	renderBackground();
	renderGates();
	checkKeyboardStatus();
	checkPlayersBounds();
	checkBallBounds();
	checkPlayers_BallCollision();
	movePlayers();
	moveBall();
	renderPlayers();
	renderBall();

	score1.innerHTML = player1.score;
  score2.innerHTML = player2.score;
	requestAnimationFrame(start);
}

function Ball(x,y){
	this.x = x;
	this.y = y;
	this.xVel = 0;
	this.yVel = 0;
	this.decel = 0.0120;
	this.size = 5;
}

function Player(x,y){
	this.x = x;
	this.y = y;
	this.size = 15;
	this.xVel = 0;
	this.yVel = 0;
	this.score = 0;
	this.accel = 0.55;
	this.decel = 0.55;
	this.maxSpeed = 2;
}

function reset(){
	var score1 = player1.score;
	var score2 = player2.score;
	player1 = new Player(100,250);
	player1.score = score1;
	player2 = new Player(600,250);
	player2.score = score2;
	ball = new Ball(350,250);
	wDown = false;
	sDown = false;
	aDown = false;
	dDown = false;
	upDown = false;
	downDown = false;
	leftDown = false;
	rightDown = false;
}

function movePlayers(){
	player1.x += player1.xVel;
	player1.y += player1.yVel;
	player2.x += player2.xVel;
	player2.y += player2.yVel;
}

function checkPlayers_BallCollision(){
	var p1_ball_distance = getDistance(player1.x,player1.y,ball.x,ball.y) - player1.size - ball.size;
	if(p1_ball_distance < 0){
		collide(ball,player1);
	}
	var p2_ball_distance = getDistance(player2.x,player2.y,ball.x,ball.y) - player2.size - ball.size;
	if(p2_ball_distance < 0){
		collide(ball,player2);
	}
}

function collide(cir1,cir2){
	var dx = (cir1.x - cir2.x) / (cir1.size);
	var dy = (cir1.y - cir2.y) / (cir1.size);
	cir2.xVel = -dx;
	cir2.yVel = -dy;
	cir1.xVel = dx;
	cir1.yVel = dy;
}

function getDistance(x1,y1,x2,y2){
	return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
}

function moveBall(){
	if(ball.xVel !== 0){
		if(ball.xVel > 0){
			ball.xVel -= ball.decel;
			if(ball.xVel < 0) ball.xVel = 0;
		} else {
			ball.xVel += ball.decel;
			if(ball.xVel > 0) ball.xVel = 0;
		}
	}
	if(ball.yVel !== 0){
		if(ball.yVel > 0){
			ball.yVel -= ball.decel;
			if(ball.yVel < 0){
        ball.yVel = 0;
      }
		} 
    else {
			ball.yVel += ball.decel;
			if(ball.yVel > 0) ball.yVel = 0;
		}
	}
	ball.x += ball.xVel;
	ball.y += ball.yVel;
}

function checkBallBounds(){
	if(ball.x + ball.size > canvas.width){
		if(ball.y > 150 && ball.y < 350){
      goals[0].style.display = "inline-block";
			player1.score++;
			reset();
      setTimeout(function(){
      logs.appendChild(logsMessages)
      logsMessages.innerHTML += "Kırmızı takım Gol attı!<br>";
      logsMessages.style.color = "#c33";
      goals[0].style.display = "none";
      },1000);
			return;
		}
		ball.x = canvas.width - ball.size;
		ball.xVel *= -1.5;
	}
	if(ball.x - ball.size < 0){
		if(ball.y > 150 && ball.y < 350){
      goals[1].style.display = "inline-block";
			player2.score++;
			reset();
      setTimeout(function(){
      logs.appendChild(logsMessages)
      logsMessages.innerHTML += "Mavi takım Gol attı!<br>";
      logsMessages.style.color = "blue";
      goals[1].style.display = "none";
      },1000);
			return;
		}
		ball.x = 0 + ball.size;
		ball.xVel *= -1.5;
	}
	if(ball.y + ball.size > canvas.height){
		ball.y = canvas.height - ball.size;
		ball.yVel *= -1.5;
	}
	if(ball.y - ball.size < 0){
		ball.y = 0 + ball.size;
		ball.yVel *= -1.5;
	}
}

function checkPlayersBounds(){
	if(player1.x + player1.size > canvas.width){
		player1.x = canvas.width - player1.size;
		player1.xVel *= -0.5;
	}
	if(player1.x - player1.size < 0){
		player1.x = 0 + player1.size;
		player1.xVel *= -0.5;
	}
	if(player1.y + player1.size > canvas.height){
		player1.y = canvas.height - player1.size;
		player1.yVel *= -0.5;
	}
	if(player1.y - player1.size < 0){
		player1.y = 0 + player1.size;
		player1.yVel *= -0.5;
	}
	if(player2.x + player2.size > canvas.width){
		player2.x = canvas.width - player2.size;
		player2.xVel *= -0.5;
	}
	if(player2.x - player2.size < 0){
		player2.x = 0 + player2.size;
		player2.xVel *= -0.5;
	}
	if(player2.y + player2.size > canvas.height){
		player2.y = canvas.height - player2.size;
		player2.yVel *= -0.5;
	}
	if(player2.y - player2.size < 0){
		player2.y = 0 + player2.size;
		player2.yVel *= -0.5;
	}
}

function checkKeyboardStatus(){
	if(wDown){
		if(player1.yVel > -player1.maxSpeed){
			player1.yVel -= player1.accel;	
		} else {
			player1.yVel = -player1.maxSpeed;
		}
	} else {
		if(player1.yVel < 0){
			player1.yVel += player1.decel;
			if(player1.yVel > 0) player1.yVel = 0;	
		}
	}
	if(sDown){
		if(player1.yVel < player1.maxSpeed){
			player1.yVel += player1.accel;	
		} else {
			player1.yVel = player1.maxSpeed;
		}
	} else {
		if(player1.yVel > 0){
			player1.yVel -= player1.decel;
			if(player1.yVel < 0) player1.yVel = 0;
		}
	}
	if(aDown){
		if(player1.xVel > -player1.maxSpeed){
			player1.xVel -= player1.accel;	
		} else {
			player1.xVel = -player1.maxSpeed;
		}
	} else {
		if(player1.xVel < 0){
			player1.xVel += player1.decel;
			if(player1.xVel > 0) player1.xVel = 0;	
		}
	}
	if(dDown){
		if(player1.xVel < player1.maxSpeed){
			player1.xVel += player1.accel;	
		} else {
			player1.xVel = player1.maxSpeed;
		}
	} else {
		if(player1.xVel > 0){
			player1.xVel -= player1.decel;
			if(player1.xVel < 0) player1.xVel = 0;
		}
	}

	//PLAYER 2

	if(upDown){
		if(player2.yVel > -player2.maxSpeed){
			player2.yVel -= player2.accel;	
		} else {
			player2.yVel = -player2.maxSpeed;
		}
	} else {
		if(player2.yVel < 0){
			player2.yVel += player2.decel;
			if(player2.yVel > 0) player2.yVel = 0;	
		}
	}
	if(downDown){
		if(player2.yVel < player2.maxSpeed){
			player2.yVel += player2.accel;	
      document.body.scrollTop = 0;
		} else {
			player2.yVel = player2.maxSpeed;
		}
	} else {
		if(player2.yVel > 0){
			player2.yVel -= player2.decel;
			if(player2.yVel < 0) player2.yVel = 0;
		}
	}
	if(leftDown){
		if(player2.xVel > -player2.maxSpeed){
			player2.xVel -= player2.accel;	
		} else {
			player2.xVel = -player2.maxSpeed;
		}
	} else {
		if(player2.xVel < 0){
			player2.xVel += player2.decel;
			if(player2.xVel > 0) player2.xVel = 0;	
		}
	}
	if(rightDown){
		if(player2.xVel < player2.maxSpeed){
			player2.xVel += player2.accel;	
		} else {
			player2.xVel = player2.maxSpeed;
		}
	} else {
		if(player2.xVel > 0){
			player2.xVel -= player2.decel;
			if(player2.xVel < 0) player2.xVel = 0;
		}
	}
}

document.onkeyup = function(e){
	if(e.keyCode === 87){
		wDown = false;
	}
	if(e.keyCode === 65){
		aDown = false;
	}
	if(e.keyCode === 68){
		dDown = false;
	}
	if(e.keyCode === 83){
		sDown = false;
	}
	if(e.keyCode === 38){
		upDown = false;
	}
	if(e.keyCode === 37){
		leftDown = false;
	}
	if(e.keyCode === 40){
		downDown = false;
	}
	if(e.keyCode === 39){
		rightDown = false;
	}
}

document.onkeydown = function(e){
  console.log(e.keyCode)
	if(e.keyCode === 87){
		wDown = true;
	}
	if(e.keyCode === 65){
		aDown = true;
	}
	if(e.keyCode === 68){
		dDown = true;
	}
	if(e.keyCode === 83){
		sDown = true;
	}
	if(e.keyCode === 38){
		upDown = true;
	}
	if(e.keyCode === 37){
		leftDown = true;
	}
	if(e.keyCode === 40){
		downDown = true;
	}
	if(e.keyCode === 39){
		rightDown = true;
	}
  if(e.keyCode === 32 || e.keyCode === 88){
    ball.decel = 0.001;
    c.fillStyle = "green";
    setTimeout(function(){
      ball.decel = 0.005;
    },1000)
  }
}

function renderBall(){
	c.save();
	c.beginPath();
	c.fillStyle = "white";
  c.arc(ball.x, ball.y, ball.size, 0, Math.PI*2000);
  c.stroke();
	c.arc(ball.x,ball.y,ball.size,0,Math.PI*2);
	c.fill();
	c.closePath();
	c.restore();
}

function renderPlayers(){
	c.save();
	c.fillStyle = "#c33";
	c.beginPath();
  c.arc(player1.x, player1.y, player1.size, 0, Math.PI*2);
  c.stroke();
	c.arc(player1.x,player1.y,player1.size,0,Math.PI*2);
	c.fill();
	c.closePath();
  c.fillStyle = "white";
  c.beginPath();
  c.font = "20px Arial";
  c.fillText(player1name, player1.x-25, player1.y-20, 50, 0, Math.PI*2);
  c.font = "20px Arial";
  c.fillText(numara1, player1.x-8, player1.y+5, player1.size, 0, Math.PI*2);
  c.closePath();
	c.beginPath();
	c.fillStyle = "blue";
  c.arc(player2.x, player2.y, player2.size, 0, Math.PI*2);
  c.stroke();
	c.arc(player2.x,player2.y,player2.size,0,Math.PI*2);
	c.fill();
	c.closePath();
  c.fillStyle = "white";
  c.beginPath();
  c.font = "20px Arial";
  c.fillText(player2name, player2.x-25, player2.y-20, 50, 0, Math.PI*2);
  c.font = "20px Arial";
  c.fillText(numara2, player2.x-8, player2.y+5, player1.size, 0, Math.PI*2);
  c.closePath();
	c.restore();
}

function renderGates(){
	c.save();
	c.beginPath();
	c.moveTo(0,150);
	c.lineTo(0,350);
	c.strokeStyle = "#c33";
	c.lineWidth = 10;
	c.stroke();
  c.fillStyle = "#5f965f";
  c.fillRect(25, 0, 50, 500);
  c.fillStyle = "#5f965f";
  c.fillRect(125, 0, 50, 500);
  c.fillStyle = "rgba(255,255,255,0.6)";
  c.fillRect(348, 0, 5, 500);
  c.fillStyle = "#5f965f";
  c.fillRect(525, 0, 50, 500);
  c.fillStyle = "#5f965f";
  c.fillRect(625, 0, 50, 500);
	c.closePath();
	c.beginPath();
	c.moveTo(canvas.width,150);
	c.lineTo(canvas.width,350);
	c.strokeStyle = "blue";
	c.lineWidth = 10;
	c.stroke();
 
	c.closePath();
	c.restore();
  
}

function renderBackground(){
	c.save();
	c.fillStyle = "#66aa66";
	c.fillRect(0,0,canvas.width,canvas.height);
	c.strokeStyle = "rgba(255,255,255,0.6)";
	c.beginPath();
	c.arc(canvas.width/2,canvas.height/2,150,0,Math.PI*2);
	c.closePath();
	c.lineWidth = 5;
	c.stroke();
	c.restore();
}

function clear(){
	c.clearRect(0,0,canvas.width,canvas.height);
}
