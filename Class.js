class Sprite {
    constructor ({CanvPosition = {x:0, y:0}, imageSrc, frameMax = 1, collisions = {}}){
        this.collisions = collisions
        this.CanvPosition = CanvPosition
        this.image = new Image()
        this.offset = {
            x:0,
            y:0
        }
        this.image.src = imageSrc
        this.frameMax = frameMax
        this.FrameCurrent = {
            width: 0,
            height: 0
        }
        }
        draw(){
           // c.fillRect(this.collisions[0].x,this.collisions[0].y,this.collisions[0].width,this.collisions[0].height)
            this.CanvPosition.x + this.offset.x
            this.CanvPosition.y + this.offset.y
            c.drawImage(
                this.image,
                this.FrameCurrent.width*(this.image.width/this.frameMax), 
                this.FrameCurrent.height*(this.image.height/this.frameMax), 
                this.image.width/this.frameMax, 
                this.image.height/this.frameMax, 
                this.CanvPosition.x + this.offset.x, 
                this.CanvPosition.y + this.offset.y, 
                this.image.width/this.frameMax, 
                this.image.height/this.frameMax
            )
        }

        update(){
        this.draw()    
        }
}

class Player extends Sprite {

    constructor ({
        width = 32,
        height = 32,
        CanvPosition = {
            x: 0, 
            y: 0
        },
        imageSrc,
        frameMax = 4
        
    }){

        super({
            CanvPosition,
            imageSrc,
            frameMax,
        }
        )
        this.width = width
        this.height = height
        this.CanvPosition = {
            x: CanvPosition.x,
            y: CanvPosition.y,
        },
        this.RelativePosition = {
            x: this.CanvPosition.x,
            y: this.CanvPosition.y
        }
        this.speed = {
            x: 0,
            y: 0
        },
        this.lastKey = undefined

        this.ingo = false
        this.image = new Image()
        this.image.src = imageSrc
        this.offset = {
            x: 0,
            y: 0
        }
        this.PlayerOffset = {
            x: 0,
            y: 16
        }
        this.FrameCurrent = {
            width: 0,
            height: 0
        }
        this.frameElapse = 0
        this.frameHold = 15
        this.frameMax = frameMax
        
    }
    draw() {
        //c.fillRect(obj.CanvPosition.x, obj.CanvPosition.y,32,32)
        c.drawImage(
            this.image,
            this.FrameCurrent.width*(this.image.width/this.frameMax), 
            this.FrameCurrent.height*(this.image.height/this.frameMax), 
            this.image.width/this.frameMax, 
            this.image.height/this.frameMax, 
            this.CanvPosition.x+this.offset.x, 
            this.CanvPosition.y+this.offset.y-16, 
            this.image.width/this.frameMax, 
            this.image.height/this.frameMax
        )
    }
    update() {

        this.draw()
    }

    mapMoveX({obj,position={}}) {
        this.RelativePosition.x += position.x
        obj.offset.x -= position.x
        
    }
    mapMoveY({obj,position={}}) {
        this.RelativePosition.y += position.y
        obj.offset.y -= position.y
    }

    playerMoveX({speed = {}}) {
        this.RelativePosition.x += speed.x
        this.CanvPosition.x += speed.x
        
    }

    playerMoveY({speed = {}}) {
        this.RelativePosition.y += speed.y
        this.CanvPosition.y += speed.y
        
    }

    AnimationFrames ({obj,speed={}, x=1, key = null}) {
        //
        //console.log(this.RelativePosition.y-speed.y > 0)
        if(
            (this.RelativePosition.x + speed.x >= 0 && 
            this.RelativePosition.x + this.width + speed.x <= obj.image.width) && 
            (this.RelativePosition.y+speed.y >= 0 && 
            this.RelativePosition.y + this.height + speed.y <= obj.image.height)
        ){
                this.ingo = true
                const intervalID = setInterval(() => {        
                
                    if ((key === 'a' || key === 'd') &&
                        (obj.CanvPosition.x-obj.offset.x+speed.x < 0 || 
                        this.RelativePosition.x < 448 || 
                        obj.offset.x - canv.width - speed.x < - obj.image.width || 
                        this.RelativePosition.x + 448 > obj.image.width)) {
                            this.playerMoveX({speed: speed})
                            this.mapMoveY({obj: obj, position: speed})

                    }else if (obj.CanvPosition.y + obj.offset.y - speed.y > 0 || 
                            this.RelativePosition.y < 288 ||
                            obj.offset.y - canv.height - speed.y < -obj.image.height || 
                            this.RelativePosition.y + 288 > obj.image.height) {
                                this.playerMoveY({speed: speed})
                                this.mapMoveX({obj: obj, position: speed})

                    } else  {

                        this.mapMoveX({obj: obj, position: speed})
                        this.mapMoveY({obj: obj, position: speed})
                    } 
                    

                    if (x % 4 === 0 && x != 0) { 
                        this.FrameCurrent.width++
                        if (this.FrameCurrent.width === 4) {
                            this.FrameCurrent.width = 0
                            clearInterval(intervalID)
                            this.ingo = false
                        }
                    }
                    x++
                }, 25);
        }
    }       
}
