
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
let chosenCharacter = 1;

//motståndare
const enemies = [];

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
let gameFrame = 0;


/*detta är för att se till att vänstra hörnet i canvasen blir 0,0.
annars kan det vara vilket nummer som helst och det kan bli jobbit för
när man ska placera ut karaktärer
*/
let canvasPosition = canvas.getBoundingClientRect();

//detta är bara en variabel för våran mus så att man kan använda dess koordinater etc senare
const mouse = {
    x:10,
    y:10,
    width:0.1,
    height:0.1,
    clicked: false,
}

//bilderna för mina karaktärer
const char1 = new Image();
char1.src = 'characters/trooper.png';

const char2 = new Image();
char2.src = 'characters/sniper.png';

const char3 = new Image();
char3.src = 'characters/doubleTrouble.png';



// olika eventlisteners för musen

canvas.addEventListener('mousemove', function(event){
    //kollar bara musens x och y koordinater innanför canvasen
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    
});

canvas.addEventListener('mouseleave',function(){
    mouse.x = undefined;
    mouse.y = undefined;
})

canvas.addEventListener('mouseup', function(){
    draggable = false;
    mouse.clicked=false;
    
});

canvas.addEventListener('mouseout', function(){
    draggable = false;
});
canvas.addEventListener('mousedown',function(){
    mouse.clicked = true;
})

canvas.addEventListener('click',function() {
    const gridPositionX = mouse.x -(mouse.x % fieldSize)
    const gridPositionY = mouse.y -(mouse.y % fieldSize)
    console.log(mouse.x)
    console.log(mouse.y)
    //är musen innanför/närheten av ett block/ruta så placerar man ut en trooper karaktär, detta ska ändras så man kan ändra för de 3 olika karaktärerna

    //detta hindrar spelaren från att placera ut karaktärer på blåa baren och första raden längst till vänster
    if(gridPositionX < fieldSize) return;
    if(gridPositionY < fieldSize) return;

    if(resources >= characterCost && chosenCharacter=== 1) {
        characters.push(new Trooper(gridPositionX, gridPositionY))
        resources -= characterCost;
    }
    if(resources >= characterCost && chosenCharacter=== 2) {
        characters.push(new Sniper(gridPositionX, gridPositionY))
        resources -= characterCost;
    }

    if(resources >= characterCost && chosenCharacter=== 3) {
        characters.push(new DoubleTrouble(gridPositionX, gridPositionY))
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
//detta pushar ut en 100x100 ruta på spelplanen och den läggs i en lista(grid)
function gameField() {
    for(let y=fieldSize; y < canvas.height; y += fieldSize) {
        for(let x=0; x < canvas.width; x += fieldSize) {
            grid.push(new Field(x,y))
        }        
    }
}
gameField()
//hanterar spelplanen så att alla fyrkanter kommer ut och man sedan kan se til latt det inte blir för många rutor
function handleField() {
    for(i=0;i < grid.length; i++) {
        grid[i].draw();
    }
}

//klasser för karaktärer, ska testa att fixa så de är i separata filer(har inte fått det att funka än)
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
        context.fillStyle = 'green';
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

//hanterar (spelarens) karaktärer
function handleCharacters() {
    for(let i =0; i < characters.length; i++) {
        characters[i].draw();
    }
}

//klasser för enemies
class Eye {
    constructor(x,y) {
        this.x=x,
        this.y=y,
        this.width = fieldSize,
        this.height = fieldSize,
        this.health = 100;

    }
    draw(){
        context.fillStyle='red';
        context.fillRect(this.x,this.y,this.width,this.health)
        context.fillStyle='gold';
        context.font = '20px Arial'
        context.fillText(Math.floor(this.health),this.x, this.y);

    }

}

class FlameEye {
    constructor(x,y) {
        this.x=x,
        this.y=y,
        this.width = fieldSize,
        this.height = fieldSize,
        this.health = 100;

    }
    draw(){
        context.fillStyle='orange';
        context.fillRect(this.x,this.y,this.width,this.health)
        context.fillStyle='gold';
        context.font = '20px Arial'
        context.fillText(Math.floor(this.health),this.x, this.y);

    }

}

class InfectedEye {
    constructor(x,y) {
        this.x=x,
        this.y=y,
        this.width = fieldSize,
        this.height = fieldSize,
        this.health = 100;

    }
    draw(){
        context.fillStyle='purple';
        context.fillRect(this.x,this.y,this.width,this.health)
        context.fillStyle='gold';
        context.font = '20px Arial'
        context.fillText(Math.floor(this.health),this.x, this.y);

    }

}

//behöver skapa något som spawnar ut motståndare.
function spawnEnemies() {
    gameFrame+=1;
    if(gameFrame%100 === 0) {
        //behöver kolla så att jag kan spawn ut karaktär mellan vissa värden så de inte alltid spawnas på t.ex. 1600,300
        //enemies.push(new Eye(1600,400))
        
    }
}

//kommer hantera alla min motståndare
function handleEnemeies() {
    for(let i =0; i < enemies.length; i++) {
        enemies[i].draw();
    }
}

//bilderna uppe i vänstra hörn av spel/canvas
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
    //kollar om mus krockar med blocket för karaktär 1 och det stämmer så blir chosencharacter 1,visar att den är vald
    if(collision(character1,mouse) && mouse.clicked) {
        chosenCharacter = 1;
    }
    if(collision(character2,mouse) && mouse.clicked) {
        chosenCharacter = 2;
    }
    if(collision(character3,mouse) && mouse.clicked) {
        chosenCharacter = 3;
    }

    //standarfärg för border runt blocken
    character1stroke = 'black'
    character2stroke = 'black'
    character3stroke = 'black'

    //här ändras border färgen för karaktär 1 till guld så det syns lätt
    if(chosenCharacter === 1) {
        character1stroke= 'gold'
        character2stroke = 'black'
        character3stroke = 'black'
    }
    if(chosenCharacter === 2) {
        character2stroke= 'gold'
        character1stroke = 'black'
        character3stroke = 'black'
    }
    if(chosenCharacter === 3) {
        character3stroke= 'gold'
        character1stroke = 'black'
        character2stroke = 'black'
    }
    //detta är bara för att få ut bilderna i ish mitten av det svarta blocket
    context.fillStyle='black'
    context.fillRect(character1.x,character1.y,character1.width,character1.height)
    context.strokeStyle = character1stroke;
    context.strokeRect(character1.x,character1.y,character1.width,character1.height)
    context.drawImage(char1,0,0,194,194,-10,5,194/2,194/2);
    context.fillRect(character2.x,character2.y,character2.width,character2.height)
    context.strokeStyle = character2stroke;
    context.strokeRect(character2.x,character2.y,character2.width,character2.height)
    context.drawImage(char2,0,0,194,194,70,5,194/2,194/2);
    context.fillRect(character3.x,character3.y,character3.width,character3.height)
    context.strokeStyle = character3stroke;
    context.strokeRect(character3.x,character3.y,character3.width,character3.height)
    context.drawImage(char3,0,0,194,194,150,5,194/2,194/2);
}

//detta är en collision detector, som enkelt kollar om två objekt krockar, kommer användas mycket
function collision(first, second) {
    if(     !(first.x > second.x + second.width || 
        first.x +first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y )) {
            return true;
        }
}

//animations loop som loopas om och om igen, kommer köra och uppdatera saker hela tiden(gör att spelet funkar)
function animate(){
    context.clearRect(0,0,canvas.width,canvas.height)
    context.fillStyle = ' blue';
    context.fillRect(0,0,bar.width,bar.height);
    handleField()
    spawnEnemies()
    handleCharacters()
    handleEnemeies()
    chooseCharacter()
    requestAnimationFrame(animate);
}
animate()


