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
                    FightBox.Create({o: {attacker: obj, enemy: value}})
                    StartTimer()
                    obj.InBattle = true
                    value.InBattle = true
                }else{
                    //Tu będzie Alert box że już jest w walce
                }
        }
           
    }
})
function StartTimer() {
let Time = 15

let Timer = setInterval(() => {
    
    Time-=1
    document.querySelector('#TimerBox').innerHTML = Time
    Time<=0?clearInterval(Timer):false
}, 1000);
}