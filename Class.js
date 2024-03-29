class Sprite {
    constructor ({CanvPosition = {x:0, y:0}, imageSrc, frameMax = 1}){
        this.CanvPosition = CanvPosition
        this.image = new Image()
        this.offset = {
            x:0,
            y:0,
            h:0
            
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

       /*   for (const [key, value] of Object.entries(this.collisions)) {
            c.fillRect(
                value.x + this.offset.x,
                value.y + this.offset.y,
                value.width,
                value.height
            ) 
        }  */
    }
}

class GameObject extends Sprite {
    constructor({
        CanvPosition,
        imageSrc,
        frameMax = 4,
        lvl,
        ObjID
    }){
        super({
            CanvPosition,
            imageSrc,
            frameMax
        })
        this.ObjID = ObjID
        this.lvl = lvl
        this.width = 32
        this.height = 32
        this.IsDead = false
        this.InBattle = false
        this.Tour = undefined
        this.Skills = {
            BasicAttack: ({o}) => {
                let AValue = this.BasicStrange/4 + RandomNumberGenerator(1,11)
                //let AValue = 1
                AValue = Math.round(AValue - o.enemy.BasicArmor)
                AValue < 0 ? AValue = 0:false
                o.enemy.TrueHP -= AValue
                let EnemyPrcentHP = Math.round(o.enemy.TrueHP / o.enemy.BasicHP * 100)
                EnemyPrcentHP < 0 ? EnemyPrcentHP = 0 : false
                let PlayerPrcentHP = Math.round(this.TrueHP / this.BasicHP * 100)
                PlayerPrcentHP < 0 ? PlayerPrcentHP = 0 : false
                let content = `<span style = 'color: red'>${this.NickName}(${PlayerPrcentHP}%)</span> zadał <span style = 'color: gray'>${AValue}</span> obrażeń  postaci <span style = 'color: green'>${o.enemy.NickName}(${EnemyPrcentHP}%)</span>`
                if (this.IsHero === true){
                    content = `<span style = 'color: green'>${this.NickName}(${PlayerPrcentHP}%)</span> zadał <span style = 'color: gray'>${AValue}</span> obrażeń  postaci <span style = 'color: green'>${o.enemy.NickName}(${EnemyPrcentHP}%)</span>`
                }
                ActionWindow({content: content})
                o.enemy.TrueHP <= 0 ? EndBattle({o:o}) : TourSwap({p1:o.enemy,p2:this,o:o}) 
                },

            /* StepForward: () => {
                
                document.querySelectorAll('.Position').forEach((e) => {
                    if(e.childNodes.length != 0){
                    console.log(e,e.childNodes[0])
                }
                });
            },
            StepBack: () => {console.log('Krok w tył')} */
        }
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
                left: ${e.clientX - 50}px;
                top: ${e.clientY - 170}px;
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

class Warrior extends GameObject{
    constructor({
        lvl,
        CanvPosition,
        imageSrc,
        frameMax,
        ObjID
    }){
        super({
            lvl,
            CanvPosition,
            imageSrc,
            frameMax,
            ObjID
        })
        this.ClassName = 'Warrior'
        this.ShortClassName = 'W'
        this.BasicIntelect = 0;
        this.BasicStrange = 10;
        this.BasicAgility = 3
        this.BasicDodge = 3;
        this.BasicArmor = 6;
        this.BasicResists = {
            Fire: 0.32,
            Frost: 0.12,
            Lightning: 0.02,
            Poison: 0.42
        }
        this.BasicHP = 100;
        this.TrueHP = this.BasicHP
        this.Skills
    }
}
class Mage extends GameObject {
    constructor({
        lvl,
        CanvPosition,
        imageSrc,
        frameMax,
        ObjID
    }){
        super({
            lvl,
            CanvPosition,
            imageSrc,
            frameMax,
            ObjID
        })
        this.ClassName = 'Mage'
        this.ShortClassName = 'M'
        this.BasicIntelect = 10;
        this.BasicStrange = 1;
        this.BasicAgility = 2
        this.BasicDodge = 5;
        this.BasicArmor = 0;
        this.BasicResists = {
            Fire: 0.62,
            Frost: 0.54,
            Lightning: 0.21,
            Poison: 0.9
        }
        this.BasicHP = 100;
        this.TrueHP = this.BasicHP

        this.Skills = Object.assign({}, this.Skills, {
            FireBall: ({o}) => {
                let AValue = this.BasicIntelect + RandomNumberGenerator(1,11)
                AValue = Math.round(AValue - o.enemy.BasicResists.Fire * AValue)
                o.enemy.TrueHP -= AValue
                let EnemyPrcentHP = Math.round(o.enemy.TrueHP / o.enemy.BasicHP * 100)
                EnemyPrcentHP < 0 ? EnemyPrcentHP = 0 : false
                let PlayerPrcentHP = Math.round(this.TrueHP / this.BasicHP * 100)
                PlayerPrcentHP < 0 ? PlayerPrcentHP = 0 : false
                const content = `<span style = 'color: green'>${this.NickName}(${PlayerPrcentHP}%)</span> zadał <span style = 'color: red'>${AValue}</span> obrażeń  postaci <span style = 'color: red'>${o.enemy.NickName}(${EnemyPrcentHP}%)</span>`
                ActionWindow({content: content})
                o.enemy.TrueHP <= 0 ? EndBattle({o:o}) : TourSwap({p1:o.enemy,p2:this,o:o})
            },
            FrostBall: ({o}) => {
                let AValue = this.BasicIntelect + RandomNumberGenerator(1,11)
                AValue = Math.round(AValue - o.enemy.BasicResists.Frost * AValue)
                o.enemy.TrueHP -= AValue
                let EnemyPrcentHP = Math.round(o.enemy.TrueHP / o.enemy.BasicHP * 100)
                EnemyPrcentHP < 0 ? EnemyPrcentHP = 0 : false
                let PlayerPrcentHP = Math.round(this.TrueHP / this.BasicHP * 100)
                PlayerPrcentHP < 0 ? PlayerPrcentHP = 0 : false
                const content = `<span style = 'color: green'>${this.NickName}(${PlayerPrcentHP}%)</span> zadał <span style = 'color: rgb(28, 159, 192)'>${AValue}</span> obrażeń postaci <span style = 'color: red'>${o.enemy.NickName}(${EnemyPrcentHP}%)</span>`
                ActionWindow({content: content})
                o.enemy.TrueHP <= 0 ? EndBattle({o:o}) : TourSwap({p1:o.enemy,p2:this,o:o})
            }
        })
    }
}

class Player extends Mage {
    constructor({
        lvl,
        CanvPosition,
        imageSrc,
        frameMax,
        ObjID
    }) {
        super({
            lvl,
            CanvPosition,
            imageSrc,
            frameMax,
            ObjID
        })
        this.IsHero = true
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
        for (const [key, value] of Object.entries(enemys)){
            value.offset.x -= position.x
        }
    }

    mapMoveY({obj,position={}}) {
        this.RelativePosition.y += position.y
        obj.offset.y -= position.y
        for (const [key, value] of Object.entries(enemys)){
            value.offset.y -= position.y
        }
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
        if(this.InBattle === false){
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
                    }, 20);
            }
        }   
    }
}
class Enemy extends Warrior {
    constructor({
        lvl,
        CanvPosition,
        imageSrc,
        frameMax,
        offset,
        ObjID
    }){
        super({
            lvl,
            CanvPosition,
            imageSrc,
            frameMax,
            ObjID
        })
        this.offset = offset
        this.NickName = 'Bandyta'
    }
}
