//kopplar ihop js filen med min canvas
const canvas = document.getElementById('canvas1');
//get context(2d) ger metoder och andra kommandon för 2d målning(drawing)
const context = canvas.getContext('2d');

//används för att allt ska fungera inom canvas ramarna
canvas.width = 1700;
canvas.height = 700;

//poängsystememt
let score = 0;

/*gameframe kommer användas för att uppdatera när zombies kan spawna in
när gameframe i loop blir t.ex. = 100 kommer en ny zombie in.
*/
let gameframe = 0;


/*detta är för att se till att vänstra hörnet i canvasen blir 0,0.
annars kan det vara vilket nummer som helst och det kan bli jobbit för
när man ska placera ut karaktärer
*/
let canvasPosition = canvas.getBoundingClientRect();

/*detta är bara data för vart musen är på skärmen,
height och width delas på 2 för att hamna i mitten av skärmen
*/
const Mouse = {
    x:canvas.width/2,
    y:canvas.height/2,
    click: false
    
}


//karaktärer

//spelarens karaktär
const trooper = new Trooper({
    position: {
        x:200,
        y:300
    }
,

})
//motståndare
const eye = new Eye({
    position: {
        x:1200,
        y:300
    }
,
velocity: {
    x:0,
    y:0,
}
})

let draggable = false;
//kollar vart musen trycks ner inom canvasen
canvas.addEventListener('mousedown' , function(event){
    Mouse.x = event.x - canvasPosition.left;
    Mouse.y = event.y - canvasPosition.top;
    console.log(Mouse.x, Mouse.y)

    if(Mouse.x < (currentx + imagewidth)&& Mouse.x >(currentx -imagewidth) && 
       Mouse.y < (currenty + imageheight)&& Mouse.y >(currenty -imageheight)) {
        draggable = true;
        console.log('clickad')
    } else {
        draggable = false;
        console.log('missa')
    }
    
    if(Mouse.x < (currentx2 + imagewidth)&& Mouse.x >(currentx2 -imagewidth) && 
       Mouse.y < (currenty2 + imageheight)&& Mouse.y >(currenty2 -imageheight)) {
        draggable = true;
        console.log('clickad')
    } else {
        draggable = false;
        console.log('missa')
    }
    
    if(Mouse.x < (currentx3 + imagewidth)&& Mouse.x >(currentx3 -imagewidth) && 
       Mouse.y < (currenty3 + imageheight)&& Mouse.y >(currenty3 -imageheight)) {
        draggable = true;
        console.log('clickad')
    } else {
        draggable = false;
        console.log('missa')
    }
    
});

//skapa eventlisterner för mouse up och move


//ifall du hittar en lösning på att röra ta bort allt inom mousemove,down och up samt ta bort pressedpictures
canvas.addEventListener('mousemove', function(event){
    Mouse.x = event.x - canvasPosition.left;
    Mouse.y = event.y - canvasPosition.top;
    
   if (draggable) {
        currentx = Mouse.x
        currenty = Mouse.y
        drawImage()
    }

   if (draggable) {
        currentx2 = Mouse.x
        currenty2 = Mouse.y
        drawImage2()
    }
    if (draggable) {
        currentx3 = Mouse.x
        currenty3 = Mouse.y
        drawImage3()
    }
});

canvas.addEventListener('mouseup', function(event){
    draggable = false;
});

canvas.addEventListener('mouseout', function(event){
    draggable = false;
});



//behöver fixa en funktion för när man drar objekt och när musen rör på sig.
// och då kommer en spelare ut om man placerar rätt.

//förta karaktären(bild)
var currentx = 20;
var currenty = 0;
var imagewidth = 200;
var imageheight= 200;
function drawImage() {
    const image = new Image();
    image.src = 'characters/trooper.png';
    image.onload = () => {
        context.drawImage(image, currentx,currenty,imagewidth,imageheight)
    }
    
}
drawImage()

//andra karaktären(bild)
var currentx2 = 290;
var currenty2= 0;
function drawImage2(){
    const Image2 = new Image();
    Image2.src = 'characters/sniper.png';
    Image2.onload = () => {
        context.drawImage(Image2, currentx2,currenty2,imagewidth,imageheight)
    }
}
drawImage2()

//tredje karaktären(bild)
var currentx3 = 590;
var currenty3 = 0;
function drawImage3(){
    const Image3 = new Image();
    Image3.src = 'characters/doubleTrouble.png';
    Image3.onload = () => {
        context.drawImage(Image3, currentx3,currenty3,imagewidth,imagewidth)
    }
}
drawImage3()


//detta är alla sträck och linjer i min canvas
function sträck() {
//mittenlinje
context.beginPath();
context.moveTo(850,0);
context.lineTo(850,1600);
context.closePath();
context.stroke();


//översta sträck
context.beginPath();
context.moveTo(0,200);
context.lineTo(1700,200);
context.closePath();
context.stroke();

//linjer för box till vänster
context.beginPath();
context.moveTo(266,0);
context.lineTo(266,200);
context.closePath();
context.stroke();

context.beginPath();
context.moveTo(550,0);
context.lineTo(550,200);
context.closePath();
context.stroke();


//mitten sträck
context.beginPath();
context.moveTo(0,540);
context.lineTo(1700,540);
context.closePath();
context.stroke();

//understa sträck
context.beginPath();
context.moveTo(0,370);
context.lineTo(1700,370);
context.closePath();
context.stroke();

//linje till vänster
context.beginPath();
context.moveTo(100,200);
context.lineTo(100,700);
context.closePath();
context.stroke();

}
sträck()


//skott som de goda karaktärerna kommer skjuta



/*detta är en animations loop som kommer uppdatera sig själv
den kallar på sig själv och gör en oändlig loop
*/

//
function animate(){
    window.requestAnimationFrame(animate)
    trooper.update()
    eye.update()
    
}
animate()