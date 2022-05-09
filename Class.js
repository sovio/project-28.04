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
        this.InBattle = false
        this.Skills = {
            BasicAttack: () => {console.log("Walę Basicem")} 
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

class Warrior extends GameObject{
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
        this.BasicIntelect = 0;
        this.BasicStrange = 10;
        this.BasicAgility = 3
        this.BasicDodge = 3;
        this.BasicArmon = 6;
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
        this.BasicStrange = 1;
        this.BasicAgility = 2
        this.BasicDodge = 5;
        this.BasicArmon = 0;
        this.BasicResists = {
            Fire: 0.62,
            Frost: 0.54,
            Lightning: 0.21,
            Poison: 0.9
        }
        this.BasicHP = 100;
        this.TrueHP = this.BasicHP

        this.Skills = Object.assign({}, this.Skills, {
            FireBall: ({Enemy}) => {
                let AValue = this.BasicIntelect + RandomNumberGenerator(1,11)
                AValue = Math.round(AValue - Enemy.BasicResists.Fire * AValue)
                Enemy.TrueHP -= AValue
                let EnemyPrcentHP = Math.round(Enemy.TrueHP / Enemy.BasicHP * 100)
                let PlayerPrcentHP = Math.round(this.TrueHP / this.BasicHP * 100)
                const content = `<span style = 'color: green'>${this.NickName}(${PlayerPrcentHP}%)</span> zadał <span style = 'color: red'>${AValue}</span> obrażeń  postaci <span style = 'color: red'>${Enemy.NickName}(${EnemyPrcentHP}%)</span>`
                FightBox.ActionWindow({content: content})
            },
            FrostBall: ({Enemy}) => {
                let AValue = this.BasicIntelect + RandomNumberGenerator(1,11)
                AValue = Math.round(AValue - Enemy.BasicResists.Frost * AValue)
                Enemy.TrueHP -= AValue
                let EnemyPrcentHP = Math.round(Enemy.TrueHP / Enemy.BasicHP * 100)
                let PlayerPrcentHP = Math.round(this.TrueHP / this.BasicHP * 100)
                const content = `<span style = 'color: green'>${this.NickName}(${PlayerPrcentHP}%)</span> zadał <span style = 'color: rgb(28, 159, 192)'>${AValue}</span> obrażeń postaci <span style = 'color: red'>${Enemy.NickName}(${EnemyPrcentHP}%)</span>`
                FightBox.ActionWindow({content: content})
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
class Enemy extends Warrior {
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
    constructor () { 
        this.Position = {}
        this.RelativePosition = {}
    }

    ActionWindow({content}) {
        //console.log(LogBox)
        const x = document.createElement('div')
        x.className = 'LogRow'
        x.innerHTML = content  
        LogPosition.appendChild(x)
        LogBox.scrollTo(0, 1000000);
    }

    BtnChooseF({o}) {
        let varrible = false
        document.querySelectorAll('.RadioBox').forEach((e) => {
            if (e.checked) {
                document.querySelectorAll('.LabelBox').forEach((e1) => {
                    if (e.id === e1.attributes.for.nodeValue) {
                        varrible = true
                        e1.LFunction({Enemy: o.enemy})
                    }
                })
            }
        })
        //okienko z informacją wybierz spell
        !varrible ? console.log('okienko z informacja wybierz spell') : false
        ;
        
    }

    Create({o={}}) {
        const FBox = document.createElement('div')
        FBox.id = 'FightBox'
        FBox.style = `
            width: ${canv.width*0.90}px;
            height: ${canv.height*0.90}px;
        `
        canv.before(FBox)
        

        const BCharBox = document.createElement('div')
        BCharBox.id = 'BCharBox'
        FBox.appendChild(BCharBox)
        BCharBox.style = `
            width: 100%;
            height: 60%;
            background-color: pink;
            content:url(img/BattleBackgorund.jpg);
            border-top-left-radius: 15%;
            border-top-right-radius: 15%;
        `
        
        const LogBox = document.createElement('div')
        LogBox.id = 'LogBox'
        const LogPosition = document.createElement('div')
        LogPosition.id = 'LogPosition'

        const FrameImg = document.createElement('img')
        FrameImg.src = 'img/frame.png'
        FrameImg.className = 'FrameImg'
        
        const StartRow = document.createElement('div')
        StartRow.id = 'StartRow'
        StartRow.innerHTML = `Rozpoczęła się walka pomiędzy ${o.attacker.NickName}(${o.attacker.ClassName}) a ${o.enemy.NickName}(${o.enemy.ClassName})`
        
        const ChooseBox = document.createElement('div')
        ChooseBox.innerHTML = `<img src='img/frame.png' class='FrameImg RightFrame'>`
        ChooseBox.id = 'ChooseBox'

        FBox.appendChild(ChooseBox)
        const SkillBox = document.createElement('div')
        SkillBox.innerHTML = `<img src='img/frame.png' class='FrameImg'>`
        const line = document.createElement('div')
        SkillBox.id = 'SkillBox'
        line.style=`
            width: 100%;
            bottom: 19%;
            border-bottom: 1px solid black;
            position: absolute;
        `
        const RadioBar = document.createElement('div')
        RadioBar.className = 'RadioBar'
        SkillBox.appendChild(RadioBar)
        for (const [key, value] of Object.entries(obj.Skills)) {
            const x = document.createElement('input')
            x.type = 'radio'
            x.className = 'RadioBox'
            x.id = key
            x.name = 'SkillShot'
            const y = document.createElement('label')
            y.LFunction = value
            y.name = key 
            y.className = `LabelBox`
            y.htmlFor = key
            y.innerHTML = key
            RadioBar.appendChild(x)
            RadioBar.appendChild(y)
        }
        
        SkillBox.appendChild(line)

        const BtnChoose = document.createElement('div')
        BtnChoose.id = 'BtnChoose'
        BtnChoose.className = 'Btn'
        BtnChoose.innerHTML = `<h3 class='BtnH3'>WYBIERZ</h3> <img src='img/button/normal.png' class='BtnImg'> `
        BtnChoose.addEventListener('click',() => {
            this.BtnChooseF({o:o})
        })
        BtnChoose.style = `
        position: absolute;
        right: 0;
        bottom: 0;
        width: 56%;
        `

        const TimerBox = document.createElement('div')
        TimerBox.id = 'TimerBox'
        TimerBox.innerHTML = '15'

        const BtnClose = document.createElement('div')
        BtnClose.id = 'BtnClose'
        BtnClose.className = 'Btn'
        BtnClose.innerHTML = `<h3 class='BtnH3'>ZAMKNIJ</h3> <img src='img/button/normal.png' class='BtnImg'> `
        BtnClose.style = `
            position: absolute;
            right: 0;
            left: 0;
            margin: auto;
            width: 56%;
            top: 25%;
        `
        BtnClose.addEventListener('click',(e) => {
            !o.attacker.InBattle? FBox.remove(): false
        })
        

        const BtnInfo = document.createElement('div')
        BtnInfo.innerHTML = `<h3 class='BtnH3'>INFO</h3> <img src='img/button/normal.png' class='BtnImg'> `
        BtnInfo.className = 'Btn'
        BtnInfo.addEventListener('click', (e) => {
            console.log('Do zrobienia alert z informacjami')
            //Alert z informacjami
        })
        BtnInfo.style = `
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            bottom: 25%;
            width: 56%;
        `

        
        FBox.appendChild(LogBox)
        LogBox.appendChild(FrameImg)
        LogPosition.appendChild(StartRow)
        LogBox.appendChild(LogPosition)
        
        
        FBox.appendChild(SkillBox)
        ChooseBox.appendChild(BtnClose)
        ChooseBox.appendChild(BtnInfo)
        SkillBox.appendChild(TimerBox)
        SkillBox.appendChild(BtnChoose)
        
        //SkillBox.appendChild(BtnChooseTittle)
    }
}