let canvas = document.getElementById("canvas"),
	ctx = canvas.getContext('2d');

function resizeCanvas(){
	canvas.height = window.innerHeight * 0.95;
	canvas.width = window.innerWidth;
}
window.onresize = resizeCanvas;
resizeCanvas();
let Mouse = {
	x: null,
	y: null,
	down: false,
}
ctx.strokeStyle = "black";

canvas.onmousedown = function(e){ 
	startReadingMouseMovement(e);
}
canvas.onmousemove = function(e){ 
	if(!Mouse.down) //If the mouse button is NOT held down, do not start drawing
		return;
		
	var coordinates = getMouseCoordinatesFromEvent(e);
	ctx.beginPath();
	ctx.moveTo(Mouse.x, Mouse.y);
	ctx.lineTo(coordinates[0], coordinates[1]);
	ctx.stroke();
	ctx.closePath(); //Line from the previous mouse position to the new one
	
	Mouse.x = coordinates[0];
	Mouse.y = coordinates[1]; //Save the current position to use in the next mousemovement
}
canvas.onmouseup = function(e){
	stopReadingMouseMovement();
}
canvas.onmouseout = function(e){
	stopReadingMouseMovement();
}
function startReadingMouseMovement(e){
	var coordinates = getMouseCoordinatesFromEvent(e); //x is 0, y is 1
	Mouse.down = true;
	Mouse.x = coordinates[0];
	Mouse.y = coordinates[1];
}
function stopReadingMouseMovement(){
	Mouse.down = false;
	Mouse.x = null;
	Mouse.y = null;
}
function getMouseCoordinatesFromEvent(e){
	let x, y;
	if(e.pageX || e.pageY){
		x = e.pageX;
		y = e.pageY;
	}
	else{
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	return [x, y]
}


//Color picking
document.getElementById("colorPicker").onchange = function(){ //For this app we simply have to change the stroke style directly 
	ctx.strokeStyle = "#" + this.value;
}