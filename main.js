//kopplar ihop js filen med min canvas
const canvas = document.getElementById('canvas1');
//get context(2d) ger metoder och andra kommandon för 2d målning(drawing)
const context = canvas.getContext('2d');

//används för att allt ska fungera inom canvas ramarna
canvas.width = 1700;
canvas.height = 700;


//spelarens karaktärer
const characters = [];

//poängsystememt
let score = 0;


//variabler för karaktärsbilder
var currentx = 20;
var currenty = 0;
var imagewidth = 200;
var imageheight= 200;

var currentx2 = 290;
var currenty2= 0;
var imagewidth2 = 200;
var imageheight2= 200;

var currentx3 = 590;
var currenty3 = 0;
var imagewidth3 = 200;
var imageheight3= 200;


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

    /*
    if(Mouse.x < (currentx2 + imagewidth2)&& Mouse.x >(currentx2 -imagewidth2) && 
       Mouse.y < (currenty2 + imageheight2)&& Mouse.y >(currenty2 -imageheight2)) {
        draggable = true;
        console.log('clickad')
    } else {
        draggable = false;
        console.log('missa')
    }
    
    if(Mouse.x < (currentx3 + imagewidth3)&& Mouse.x >(currentx3 -imagewidth3) && 
       Mouse.y < (currenty3 + imageheight3)&& Mouse.y >(currenty3 -imageheight3)) {
        draggable = true;
        console.log('clickad')
    } else {
        draggable = false;
        console.log('missa')
    }
    */
});





//ifall du hittar en lösning på att röra ta bort allt inom mousemove,down och up samt ta bort pressedpictures
canvas.addEventListener('mousemove', function(event){
    Mouse.x = event.x - canvasPosition.left;
    Mouse.y = event.y - canvasPosition.top;
    
   if (draggable) {
        currentx = Mouse.x
        currenty = Mouse.y
        drawImage()
        context.clearRect(0,0,canvas.width,canvas.height)
    }
    /*  
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
    */
    
});

canvas.addEventListener('mouseup', function(){
    draggable = false;
    
    if(!draggable) {
        console.log('pushad')
        characters.push(new Trooper(400,600))
        console.log(characters)  
    }
    
});

canvas.addEventListener('mouseout', function(event){
    draggable = false;
});

//bilderna uppe i vänstra hörn av spel
drawImage()
drawImage2()
drawImage3()

//alla sträck i canvasen
sträck()

//detta är "spelplanen" där karaktärer kommer gå etc
fieldbars()

//skott som de goda karaktärerna kommer skjuta


/*detta är en animations loop som kommer uppdatera sig själv
den kallar på sig själv och gör en oändlig loop
*/

function animate(){
    //context.clearRect(200,200,canvas.width,canvas.height)
    sträck()
    fieldbars()
    trooper.update()
    eye.update()
    drawImage()
    drawImage2()
    drawImage3()
    window.requestAnimationFrame(animate)
}
animate()