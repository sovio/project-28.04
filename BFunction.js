let Timer

function Create({o={}}) {
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

    const RangePlayerPosition = document.createElement('div')
    RangePlayerPosition.id = 'RangePlayerPosition'
    RangePlayerPosition.className = 'Position'
    RangePlayerPosition.style = `
        bottom: 40%;
    `
    const MelePlayerPosition = document.createElement('div')
    MelePlayerPosition.id = 'MelePlayerPosition'
    MelePlayerPosition.className = 'Position'
    MelePlayerPosition.style = `
        bottom: 50%;
    `
    const MeleEnemyPosition = document.createElement('div')
    MeleEnemyPosition.id = 'MeleEnemyPosition'
    MeleEnemyPosition.className = 'Position'
    MeleEnemyPosition.style = `
        bottom: 60%;
    `

    const RangeEnemyPosition = document.createElement('div')
    RangeEnemyPosition.id = 'RangeEnemyPosition'
    RangeEnemyPosition.className = 'Position'
    RangeEnemyPosition.style = `
        bottom: 70%;
    `

    BCharBox.append(
        RangeEnemyPosition,
        MeleEnemyPosition,
        MelePlayerPosition,
        RangePlayerPosition)

    const LogBox = document.createElement('div')
    LogBox.id = 'LogBox'
    const LogPosition = document.createElement('div')
    LogPosition.id = 'LogPosition'

    const FrameImg = document.createElement('img')
    FrameImg.src = 'img/frame.png'
    FrameImg.className = 'FrameImg'
    
    const StartRow = document.createElement('div')
    StartRow.id = 'StartRow'
    StartRow.innerHTML = `Rozpoczęła się walka pomiędzy ${o.attacker.NickName}(${o.attacker.ShortClassName}) a ${o.enemy.NickName}(${o.enemy.ShortClassName})`
    
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
        border-bottom: 1px solid #8c0808;
        position: absolute;
    `
    const RadioBar = document.createElement('div')
    RadioBar.className = 'RadioBar'
    SkillBox.appendChild(RadioBar)
    for (const [key, value] of Object.entries(hero.Skills)) {
        const x = document.createElement('input')
        x.type = 'radio'
        x.className = 'RadioBox'
        x.id = key
        key === 'BasicAttack' ? x.checked = 'checked' : false
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
        if (o.attacker.Tour) {
            BtnChooseF({o:o})
            o.enemy.TrueHP >= 0 ? EnemyUI({o:o}) : false
        } else {
            console.log('Nie twoja tura')
        }
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
        clearInterval(Timer)
    })
    
    const BtnInfo = document.createElement('div')
    BtnInfo.innerHTML = `<h3 class='BtnH3'>INFO</h3> <img src='img/button/normal.png' class='BtnImg'> `
    BtnInfo.className = 'Btn'
    BtnInfo.addEventListener('click', (e) => {
        //console.log('Do zrobienia alert z informacjami')
                o.attacker.InBattle = false
                o.enemy.InBattle = false
                o.enemy.IsDead = true
                document.querySelector(`#Obj_ID${o.enemy.ObjID}`).remove()
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
    
    CharacterAllocationPlayer({o:o})
    CharacterAllocationEnemy({o:o})
}

function BtnChooseF({o}) {
    let varrible = false
    document.querySelectorAll('.RadioBox').forEach((e) => {
        if (e.checked) {
            document.querySelectorAll('.LabelBox').forEach((e1) => {
                if (e.id === e1.attributes.for.nodeValue) {
                    varrible = true
                    e1.LFunction({o:o})
                }
            })
        }
    })
    !varrible ? AlertWindow() : false
}

function ActionWindow({content}) {
    const x = document.createElement('div')
    x.className = 'LogRow'
    x.innerHTML = content  
    LogPosition.appendChild(x)
    LogBox.scrollTo(0, 1000000);
}

function CharacterAllocationEnemy ({o={}}) {
    const y = document.createElement('div')
    y.id = `Obj_ID${o.enemy.ObjID}`
    y.style = `
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    width: 32px;
    height: 48px;
    background-image: url(${o.enemy.image.src});
    background-position: 0px 0px;
    `
    y.addEventListener('mousemove', (e) => {
        o.enemy.InfoBox({e:e})
    })

    y.addEventListener('mouseleave', () => {
        document.querySelector('#InfoBox').remove()
    })

    o.enemy.ClassName === 'Mage' ? document.querySelector('#RangeEnemyPosition').appendChild(y) : document.querySelector('#MeleEnemyPosition').appendChild(y)
}

function CharacterAllocationPlayer ({o={}}) {
    const x = document.createElement('div')
    x.id = `Obj_ID${o.attacker.ObjID}`
    x.style = `
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        width: 32px;
        height: 48px;
        background-image: url(${o.attacker.image.src});
        background-position: 0px 48px;
    `
    x.addEventListener('mouseover', (e) => {
        o.attacker.InfoBox({e:e})
    })

    x.addEventListener('mouseleave', () => {
        document.querySelector('#InfoBox').remove()
    })

    o.attacker.ClassName === 'Mage' ? document.querySelector('#RangePlayerPosition').appendChild(x) : document.querySelector('#MelePlayerPosition').appendChild(x)
}


function EndBattle({o}) {
    if (o.enemy.TrueHP <= 0) { 
        o.attacker.InBattle = false
        o.enemy.InBattle = false
        o.enemy.IsDead = true
        clearInterval(Timer)
        console.log('cleared')
        document.querySelector(`#Obj_ID${o.enemy.ObjID}`).remove()
        document.querySelector('#BtnChoose').style.pointerEvents = 'none';
        document.querySelectorAll('h3')[2].style.pointerEvents = 'none';   
    }
}

function TourSwap({p1,p2,o}) {
    p1.Tour = true
    p2.Tour = false
    clearInterval(Timer)
    StartTimer({o:o})
}

function StartBattle({o={}}) {
       if (RandomNumberGenerator(0,2) == 0) {
           o.attacker.Tour = true
           o.enemy.Tour = false
           StartTimer({o:o})
       } else { 
           EnemyUI({o:o})
       }
}

function EnemyUI({o={}}) {
    o.enemy.Skills.BasicAttack({o:{attacker:o.enemy,enemy:o.attacker}})
    TourSwap({p1:o.attacker,p2:o.enemy,o:o})
}

function StartTimer({o={}}) {
    let Time = 15
    Timer = setInterval(() => {
        const x = document.querySelector('#TimerBox')   
        Time -= 1
        x.innerHTML = Time
        if (Time <= 0) {
            clearInterval(Timer)
            hero.Skills.BasicAttack({o:o})
            EnemyUI({o:o})
        } 
    }, 1000);
    
}

canv.addEventListener('click', (e) => {
        for (const [key, value] of Object.entries(enemys)) {
            if (e.offsetX >= value.offset.x && 
                e.offsetX <= value.offset.x + 32 && 
                e.offsetY >= value.offset.y && 
                e.offsetY <= value.offset.y + 32) {
                    console.log('click')
                if ((hero.RelativePosition.x - value.offset.x === 32 && 
                    hero.RelativePosition.y - value.offset.y === 0) ||
                    (hero.RelativePosition.x - value.offset.x === -32 &&
                    hero.RelativePosition.y - value.offset.y === 0) ||
                    (hero.RelativePosition.x - value.offset.x === 0 &&
                    hero.RelativePosition.y - value.offset.y === 32) ||
                    (hero.RelativePosition.x - value.offset.x === 0 &&
                    hero.RelativePosition.y - value.offset.y === -32)
                    ){
                        console.log('fight')
                        if (!value.IsDead) {
                            if (!hero.InBattle || !value.InBattle) {
                                Create({o: {attacker: hero, enemy: value}})
                                
                                hero.InBattle = true
                                value.InBattle = true
                                StartBattle({o: {attacker: hero, enemy: value}})
                            } else {
                                AlertWindow()
                            }
                        }
                    }       
            }
        }
})
