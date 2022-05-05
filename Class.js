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

    update() {
        this.draw()    
    }
}

class Maps extends Sprite {
    constructor({
        CanvPosition,
        imageSrc,
        frameMax,
        collisions = {},

    }){
        super({
            CanvPosition,
            imageSrc,
            frameMax
        })
        this.collisions = collisions
    }
    draw(){
        c.drawImage(
            this.image,
            this.FrameCurrent.width * (this.image.width/this.frameMax), 
            this.FrameCurrent.height * (this.image.height/this.frameMax), 
            this.image.width / this.frameMax, 
            this.image.height / this.frameMax, 
            this.CanvPosition.x + this.offset.x, 
            this.CanvPosition.y + this.offset.y, 
            this.image.width / this.frameMax, 
            this.image.height / this.frameMax
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
}

class GameObject extends Sprite {
    constructor({
        CanvPosition,
        imageSrc,
        frameMax = 4,
        lvl,
        ClassName
    }){
        super({
            CanvPosition,
            imageSrc,
            frameMax
        })
        this.lvl = lvl
        this.width = 32
        this.height = 32
        this.ClassName = ClassName
    }
    draw() {
        c.drawImage(
            this.image,
            this.FrameCurrent.width * (this.image.width/this.frameMax),
            this.FrameCurrent.height * (this.image.height/this.frameMax),
            this.image.width / this.frameMax,
            this.image.height / this.frameMax, 
            this.CanvPosition.x + this.offset.x,
            this.CanvPosition.y + this.offset.y-16,
            this.image.width / this.frameMax,
            this.image.height / this.frameMax
        )
    }
    InfoBox({e}) {
        if (document.querySelector('#InfoBox') == null) {
            const GBox = document.querySelector('#GameBox')
            const IBox = document.createElement('div')
            IBox.style = `
                position: absolute;
                width: 100px;
                height: 40px;
                left: ${e.layerX - 50}px;
                top: ${e.layerY - 100}px;
                background-color: #494a4d;
                border: double 4px #9a9ca1;
                color: White;
                text-align: Center;
                font-style: italic;
            `
            IBox.innerHTML = `${this.NickName}<br>lvl: ${this.lvl} (${this.ClassName})` 
            IBox.id = 'InfoBox'
            GBox.appendChild(IBox)
        }
    } 
    GameObjectsHitBox({e}) {
        if (this.CanvPosition.x + this.offset.x <= e.offsetX &&
            this.CanvPosition.x + this.offset.x + this.width >= e.offsetX &&
            this.CanvPosition.y + this.offset.y <= e.offsetY &&
            this.CanvPosition.y + this.offset.y + this.height >= e.offsetY)
                return true
        
            return false
    }
}
class Mage extends GameObject {
    constructor({
        lvl,
        CanvPosition,
        imageSrc,
        frameMax,
        ClassName
    }){
        super({
            lvl,
            CanvPosition,
            imageSrc,
            frameMax,
            ClassName
        })
        this.BasicIntelect = 10;
        this.BasicHP = 100;
    }
    FireBall(){
        
    }
}
class Player extends Mage {
    constructor({
        lvl,
        CanvPosition,
        imageSrc,
        frameMax,
        ClassName
    }) {
        super({
            lvl,
            CanvPosition,
            imageSrc,
            frameMax,
            ClassName
        })
        this.NickName = 'Sovio'
        this.lastKey = undefined
        this.Oncolision = false
        this.ingo = false
        this.speed = {
            x: 0,
            y: 0
        }
        this.RelativePosition = {
            x: this.CanvPosition.x,
            y: this.CanvPosition.y
        }
    }
    mapMoveX({obj,position={}}) {
        this.RelativePosition.x += position.x
        obj.offset.x -= position.x
        enemys[0].offset.x -= position.x
        //enemy.offset.x -= position.x
        
    }
    mapMoveY({obj,position={}}) {
        this.RelativePosition.y += position.y
        obj.offset.y -= position.y
        enemys[0].offset.y -= position.y
        //enemy.offset.y -= position.y
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
class Enemy extends GameObject {
    constructor({
        lvl,
        CanvPosition,
        imageSrc,
        frameMax,
        offset,
        ClassName,
    }){
        super({
            lvl,
            CanvPosition,
            imageSrc,
            frameMax,
            ClassName
        })
        this.offset = offset
        this.NickName = 'Szczur'
    }
}
class BattleBox {
    constructor(){
        this.Position = {}
        this.RelativePosition = {}
        
    }
    Create({o={}}) {
        //const GBox = document.querySelector('#GameBox')
        const FBox = document.createElement('div')
        FBox.id = 'FightBox'
        FBox.style = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            background-color: red;
            width: ${canv.width*0.90}px;
            height: ${canv.height*0.90}px
        `
        
        const LogBox = document.createElement('div')
        LogBox.id = 'LogBox'
        LogBox.style = `
            top: 60%;
            width: 40%;
            height: 40%;
            position: absolute;
            background-color: green;
        `
        
        const LogRow = document.createElement('div')
        LogRow.id = 'StartRow'
        LogRow.innerHTML = `Rozpoczęła się walka pomiędzy ${o.attacker.NickName}(${o.attacker.ClassName}) a ${o.enemy.NickName}(${o.enemy.ClassName})`
        LogRow.style= `
            width: 100%;
            height: 20%;
            background-color: #383b39;
            text-align: center;
            font-style: italic;
        `
        
        const ChoseBox = document.createElement('div')
        ChoseBox.id = 'ChoseBox'
        ChoseBox.style = `
        top: 60%;
        left: 70%;
        width: 30%;
        height: 40%;
        position: absolute;
        background-color: blue;
    `

        FBox.appendChild(ChoseBox)
        const SkillBox = document.createElement('div')
        const line = document.createElement('div')
        SkillBox.id = 'SkillBox'
        line.style=`
            width: 100%;
            height: 81%;
            border-bottom: 1px solid black;
            position: absolute;
        `
        SkillBox.style = `
            position: absolute;
            top: 60%;
            left: 40%;
            width: 50%;
            height: 40%;
            width: 30%;
            background-color: orange;
        `
       
    SkillBox.appendChild(line)

        const BtnChose = document.createElement('button')
        BtnChose.id = 'BtnChose'
        BtnChose.className = 'Btn'
        BtnChose.innerHTML = 'Wybierz'
        BtnChose.style = `
        position: absolute;
        font-style: italic;
        top: 81%;
        right: 0;
        `

        const BtnClose = document.createElement('button')
        BtnClose.id = 'BtnClose'
        BtnClose.innerHTML = 'Zamknij'
        BtnClose.className = 'Btn'
        BtnClose.style = `
            position: absolute;
            display: block;
            width: 40%;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            top: 25%;
            font-style: italic;
        `

        const BtnInfo = document.createElement('button')
        BtnInfo.innerHTML = 'Informacje'
        BtnInfo.className = 'Btn'
        BtnInfo.style = `
            position: absolute;
            display: block;
            width: 40%;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            top: 60%;
            font-style: italic;
        `

        canv.before(FBox)
        FBox.appendChild(LogBox)
        LogBox.appendChild(LogRow)
        FBox.appendChild(SkillBox)
        ChoseBox.appendChild(BtnClose)
        ChoseBox.appendChild(BtnInfo)
        SkillBox.appendChild(BtnChose)
    }
}
