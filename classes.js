//detta är för sprite, och endast för att få positionen av sprites(gubbar)
class Sprite {
    constructor({position}) {
        this.position = position
        this.width = 50
        this.height = 50
    }
    draw(){

    }
    update() {
        this.draw()
    }
}

//själva karaktären Trooper, här kommer jag även ta ut bilden(som jag gjort) men det är senare
//kommer skapa 6 st olika av denna för alla olika karaktärer
class Trooper {
    constructor({position,velocity},color ='grey') {
        //this.x = x
        //this.y = y
        this.position = position
        this.velocity = velocity
        this.color = color
        this.width = 50
        this.height = 50
        this.health = 100
        
    }
    draw() {
        context.fillStyle = this.color
        context.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update() {
        this.draw()
    }


}

//klass för moståndare
class Eye {
    constructor({position,velocity},color ='red') {
        //this.x = x
        //this.y = y
        this.position = position
        this.velocity = velocity
        this.color = color
        this.width = 50
        this.height = 50
        this.health = 100
    }
    draw() {
        context.fillStyle = this.color
        context.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update() {
        this.draw()
        //this.position.x -=1;
    }
}