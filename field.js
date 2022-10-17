
//förta karaktären(bild)
function drawImage() {
    const image = new Image();
    image.src = 'characters/trooper.png';
    image.onload = () => {
        context.drawImage(image, currentx,currenty,imagewidth,imageheight)
    }
    
}

//andra karaktären(bild)
function drawImage2(){
    const Image2 = new Image();
    Image2.src = 'characters/sniper.png';
    Image2.onload = () => {
        context.drawImage(Image2, currentx2,currenty2,imagewidth2,imageheight2)
    }
}

//tredje karaktären(bild)
function drawImage3(){
    const Image3 = new Image();
    Image3.src = 'characters/doubleTrouble.png';
    Image3.onload = () => {
        context.drawImage(Image3, currentx3,currenty3,imagewidth3,imagewidth3)
    }
}

//boxarna,där karaktärer och motståndare möts
function fieldbars() {
    
    //första box
    context.beginPath();
    context.rect(100,200,750,170)
    context.stroke()

    //andra box
    context.beginPath();
    context.fillStyle = "blue";
    context.rect(100,370,750,170)
    context.stroke()

    //tredje box
    context.beginPath();
    context.fillStyle = "blue";
    context.rect(100,540,750,160)
    context.stroke()
    
    //fjärde box
    context.beginPath();
    context.fillStyle = "blue";
    context.rect(850,370,850,170)
    context.stroke()

    //femte box
    context.beginPath();
    context.fillStyle = "blue";
    context.rect(850,200,850,170)
    context.stroke()

    //sjätte box
    context.beginPath();
    context.fillStyle = "blue";
    context.rect(850,540,850,160)
    context.stroke()

   
}
//alla sträck i canvas
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
    
    }