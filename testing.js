
//detta är alla sträck och linjer i min canvas
function sträck() {
    //mittenlinje
context.beginPath();
context.moveTo(350,0);
context.lineTo(350,1600);
context.closePath();
context.stroke();


//översta sträck
context.beginPath();
context.moveTo(0,300);
context.lineTo(800,300);
context.closePath();
context.stroke();

//linjer för box till vänster
context.beginPath();
context.moveTo(110,0);
context.lineTo(110,300);
context.closePath();
context.stroke();

context.beginPath();
context.moveTo(230,0);
context.lineTo(230,300);
context.closePath();
context.stroke();


//mitten sträck
context.beginPath();
context.moveTo(0,700);
context.lineTo(800,700);
context.closePath();
context.stroke();

//understa sträck
context.beginPath();
context.moveTo(0,1150);
context.lineTo(800,1150);
context.closePath();
context.stroke();

//linje till vänster
context.beginPath();
context.moveTo(50,300);
context.lineTo(50,1600);
context.closePath();
context.stroke();

}
sträck()