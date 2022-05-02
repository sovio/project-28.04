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
            
           
            /* for (const [key, value] of Object.entries(this.collisions)) {
                c.fillRect(
                    value.x + this.offset.x,
                    value.y + this.offset.y,
                    value.width,
                    value.height
                ) 
            } */

            

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

        this.Oncolision = false
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
        //c.fillRect(this.CanvPosition.x, this.CanvPosition.y,32,32)
        
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

    AnimationFrames ({x, intervalID}) {
        if (x % 4 === 0 && x != 0) { 
            this.FrameCurrent.width++
            if (this.FrameCurrent.width === 4) {
                this.FrameCurrent.width = 0
                clearInterval(intervalID)
                this.ingo = false
            }
        }
    }

    SCollisions ({obj,speed={}, x=1, key = null}) {
        //
        //console.log(this.RelativePosition.y-speed.y > 0)

        /* obj.collisions[3].x + obj.collisions[3].width <= this.RelativePosition.x + speed.x ||
                this.RelativePosition.x + this.width + this.speed.x <= obj.collisions[3].x  WORK*/

        /* obj.collisions[3].y >= this.RelativePosition.y + this.height + speed.y ||  */



        if((this.RelativePosition.x + speed.x >= 0 && 
            this.RelativePosition.x + this.width + speed.x <= obj.image.width) && 
            (this.RelativePosition.y+speed.y >= 0 && 
            this.RelativePosition.y + this.height + speed.y <= obj.image.height)){
                for (const [key, value] of Object.entries(obj.collisions)) {
                    if (value.x + value.width <= this.RelativePosition.x + speed.x ||
                        this.RelativePosition.x + this.width + speed.x <= value.x ||
                        value.y >= this.RelativePosition.y + this.height + speed.y ||
                        value.y + value.height <= this.RelativePosition.y + speed.y) {
                    }else{
                        this.Oncolision = false
                        break;
                    }
                }
                
        } else {
            this.Oncolision = false
        }
        if (this.Oncolision) {
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
                    
                    this.AnimationFrames({x: x, intervalID: intervalID})
                   
                    x++
                }, 25);
        }
    }       
}
class BattleBox {
    constructor(){`1`
        this.Position = {}
        this.RelativePosition = {}
        
    }
    Create() {
        const GBox = document.querySelector('#GameBox')
        const FBox = document.createElement('div')
        FBox.id = 'FightBox'
        FBox.style = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        margin-left: 15%;
        margin-right: auto !important;
        display: block;
       
        width: ${canv.width*0.90}px;
        height: ${canv.height*0.90}px
        `
        canv.before(FBox)
    }
}
