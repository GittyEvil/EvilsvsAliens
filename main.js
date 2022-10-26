
//kopplar ihop js filen med min canvas
const canvas = document.getElementById('canvas1');
//get context(2d) ger metoder och andra kommandon för 2d målning(drawing)
const context = canvas.getContext('2d');

//används för att allt ska fungera inom canvas ramarna
canvas.width = 1700;
canvas.height = 700;


//för spelplanen
const fieldSize = 100;
const grid = [];
const fieldGap = 3;

//spelarens karaktärer
const characters = [];
let characterCost = 100;
let resources = 300;

//poängsystememt
let score = 0;


//den blåa toppbaren
const bar = {
    width: canvas.width,
    height: fieldSize
}
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
const mouse = {
    x:10,
    y:10,
    width:0.1,
    height:0.1,
}

//bilderna för mina karaktärer
const char1 = new Image();
char1.src = 'characters/trooper.png';

const char2 = new Image();
char2.src = 'characters/sniper.png';

const char3 = new Image();
char3.src = 'characters/doubleTrouble.png';



//eventlisteners för musen

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    
});

canvas.addEventListener('mouseleave',function() {
    mouse.x = undefined;
    mouse.y = undefined;
})

canvas.addEventListener('mouseup', function(){
    draggable = false;
    
});

canvas.addEventListener('mouseout', function(){
    draggable = false;
});

canvas.addEventListener('click',function() {
    const gridPositionX = mouse.x -(mouse.x % fieldSize)
    const gridPositionY = mouse.y -(mouse.y % fieldSize)

    if(gridPositionX < fieldSize) return;

    if(resources >= characterCost) {
        characters.push(new Trooper(gridPositionX, gridPositionY))
        resources -= characterCost;
    }

});

//spelplanen
class Field {
    constructor(x,y) {
        this.x=x
        this.y=y
        this.width = fieldSize;
        this.height = fieldSize;

    }
    draw() {
        if(mouse.x && mouse.y && collision(this, mouse)) {
            context.strokeStyle = 'black';
            context.strokeRect(this.x,this.y,this.width,this.height);
        }
        
    }
}

function gameField() {
    for(let y=fieldSize; y < canvas.height; y += fieldSize) {
        for(let x=0; x < canvas.width; x += fieldSize) {
            grid.push(new Field(x,y))
        }        
    }
}
gameField()

function handleField() {
    for(i=0;i < grid.length; i++) {
        grid[i].draw();
    }
}

//karaktärer, ska testa att fixa så de är i separata filer(har inte fått det att funka än)
class Trooper {
    constructor(x,y) {
        this.x=x,
        this.y=y,
        this.width = fieldSize,
        this.height = fieldSize,
        this.health = 100,
        this.shooting= false,
        this.projectiles = [],
        this.timer = 0;
    }
    draw() {
        context.fillStyle = 'blue';
        context.fillRect(this.x,this.y, this.width, this.height);
        context.fillStyle='gold';
        context.font = '20px Arial'
        context.fillText(Math.floor(this.health),this.x, this.y);

    }
}

class Sniper {
    constructor(x,y) {
        this.x=x,
        this.y=y,
        this.width = fieldSize,
        this.height = fieldSize,
        this.health = 100,
        this.shooting= false,
        this.projectiles = [],
        this.timer = 0;
    }
    draw() {
        context.fillStyle = 'red';
        context.fillRect(this.x,this.y, this.width, this.height);
        context.fillStyle='gold';
        context.font = '20px Arial'
        context.fillText(Math.floor(this.health),this.x, this.y);

    }
}

class DoubleTrouble {
    constructor(x,y) {
        this.x=x,
        this.y=y,
        this.width = fieldSize,
        this.height = fieldSize,
        this.health = 100,
        this.shooting= false,
        this.projectiles = [],
        this.timer = 0;
    }
    draw() {
        context.fillStyle = 'pink';
        context.fillRect(this.x,this.y, this.width, this.height);
        context.fillStyle='gold';
        context.font = '20px Arial'
        context.fillText(Math.floor(this.health),this.x, this.y);

    }
}

//hanterar karaktärer
function handleCharacters() {
    for(let i =0; i < characters.length; i++) {
        characters[i].draw();
    }
}

//bilderna uppe i vänstra hörn av spel
const character1 = {
    x:10,
    y:10,
    width:70,
    height:85,
}
const character2 = {
    x:90,
    y:10,
    width:70,
    height:85,
}
const character3 = {
    x:170,
    y:10,
    width:70,
    height:85,
}

//detta ska bli ikonerna där man sedan kommer välja vilken karaktär man vill placera ut.
function chooseCharacter() {
    context.lineWidth = 1;
    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.fillRect(character1.x,character1.y,character1.width,character1.height)
    context.strokeRect(character1.x,character1.y,character1.width,character1.height)
    context.drawImage(char1,0,0,194,194,-10,5,194/2,194/2);
    context.fillRect(character2.x,character2.y,character2.width,character2.height)
    context.strokeRect(character2.x,character2.y,character2.width,character2.height)
    context.drawImage(char2,0,0,194,194,70,5,194/2,194/2);
    context.fillRect(character3.x,character3.y,character3.width,character3.height)
    context.strokeRect(character3.x,character3.y,character3.width,character3.height)
    context.drawImage(char3,0,0,194,194,150,5,194/2,194/2);
}

function selectedCharacter() {
    if(mouse.x && mouse.y && collision(character1,mouse)) {
        context.strokeStyle ="gold";
    }
    if(collision(character2,mouse)) {
        //byta border eller färg på något som ska indikera på att du valt karaktär
    }
    if(collision(character2,mouse)) {
        //byta border eller färg på något som ska indikera på att du valt karaktär
    }
}


//detta är en collision detector, som enkelt kollar om två objekt krockar
function collision(first, second) {
    if(     !(first.x > second.x + second.width || 
        first.x +first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y )) {
            return true;
        }
}

function animate(){
    context.clearRect(0,0,canvas.width,canvas.height)
    context.fillStyle = ' blue';
    context.fillRect(0,0,bar.width,bar.height);
    handleField()
    handleCharacters()
    chooseCharacter()
    selectedCharacter()
    requestAnimationFrame(animate);
}
animate()


