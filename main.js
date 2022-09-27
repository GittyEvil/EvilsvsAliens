//kopplar ihop js filen med min canvas
const canvas = document.getElementById('canvas1');
//get context(2d) ger metoder och andra kommandon för 2d målning(drawing)
const context = canvas.getContext('2d');

//används för att allt ska fungera inom canvas ramarna
canvas.width = 700;
canvas.height = 1600;

//poängsystememt
let score = 0;

/*gameframe kommer användas för att uppdatera när zombies kan spawna in
när gameframe i loop blir t.ex. = 100 kommer en ny zombie in.
*/
let gameframe = 0;

//fixa för mus, när den trycks inte trycks etc
//eventlisteners dvs

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

//kollar vart musen trycks ner inom canvasen
canvas.addEventListener('mousedown' , function(event){
    Mouse.x = event.x - canvasPosition.left;
    Mouse.y = event.y - canvasPosition.top;
    console.log(Mouse.x, Mouse.y)
});

//vet inte om jag behöver lägga till fler eventlisteners för mus 

//mittenlinje
context.beginPath();
context.moveTo(350,0);
context.lineTo(350,1600);
context.closePath();
context.stroke();

//översta sträck
context.beginPath();
context.moveTo(0,500);
context.lineTo(800,500);
context.closePath();
context.stroke();

//understa sträck
context.beginPath();
context.moveTo(0,1100);
context.lineTo(800,1100);
context.closePath();
context.stroke();


//karaktärer


//motståndare


//skott som de goda karaktärerna kommer skjuta


//animationer ?? ( vet ej än, temporär)