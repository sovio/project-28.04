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
        BtnChooseF({o:o})
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
    
    CharacterAllocation({o:o})
}

function BtnChooseF({o}) {
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

function ActionWindow({content}) {
    //console.log(LogBox)
    const x = document.createElement('div')
    x.className = 'LogRow'
    x.innerHTML = content  
    LogPosition.appendChild(x)
    LogBox.scrollTo(0, 1000000);
}

function CharacterAllocation ({o={}}) {
    console.log(o)
    const x = document.createElement('div')
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

    x.addEventListener('mouseleave', (e) => {
        document.querySelector('#InfoBox').remove()
    })

    if (o.attacker.ClassName === 'Mage') {
        console.log(o.attacker.ClassName)
        document.querySelector('#RangePlayerPosition').appendChild(x)
    }
}

function StartTimer() {
    let Time = 15
    
    let Timer = setInterval(() => {
        
        Time-=1
        document.querySelector('#TimerBox').innerHTML = Time
        Time <= 0 ? clearInterval(Timer):false
    }, 1000);
    
}

canv.addEventListener('click', (e) => {
    for (const [key, value] of Object.entries(enemys)) {
        if ((obj.RelativePosition.x - value.offset.x === 32 && 
            obj.RelativePosition.y - value.offset.y === 0) ||
            (obj.RelativePosition.x - value.offset.x === -32 &&
            obj.RelativePosition.y - value.offset.y === 0) ||
            (obj.RelativePosition.x - value.offset.x === 0 &&
            obj.RelativePosition.y - value.offset.y === 32) ||
            (obj.RelativePosition.x - value.offset.x === 0 &&
            obj.RelativePosition.y - value.offset.y === -32)
            ){
                if(!obj.InBattle || !value.InBattle){
                    const FightBox = new BattleBox()
                    Create({o: {attacker: obj, enemy: value}})
                    StartTimer()
                    obj.InBattle = true
                    value.InBattle = true
                }else{
                    //Tu będzie Alert box że już jest w walce
                }
        }
           
    }
})
