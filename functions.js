function go() {
    hero.Oncolision = true
    if (!hero.ingo) {    
        if (keys.d.pressed && hero.lastKey === 'd') {
            hero.FrameCurrent.height = 2
            hero.SCollisions({obj:map, speed:{x:2,y:0},key:'d'})
        } else if (keys.a.pressed && hero.lastKey === 'a') {
            hero.FrameCurrent.height = 1
            hero.SCollisions({obj:map, speed:{x:-2,y:0},key:'a'})
        } else if (keys.w.pressed && hero.lastKey === 'w') {
            hero.FrameCurrent.height = 3
            hero.SCollisions({obj:map, speed:{x:0,y:-2},key:'w'})
        } else if (keys.s.pressed && hero.lastKey === 's') {
            hero.FrameCurrent.height = 0
            hero.SCollisions({obj:map, speed:{x:0,y:2},key:'s'})
        } 
    }
}

function animation() {
    window.requestAnimationFrame(animation)
        
    c.clearRect(0,0,canv.width,canv.height)
    map.update()
    for (const [key, value] of Object.entries(enemys)) {
        !value.IsDead ? value.update():false
        
    }
    hero.update()
    go()
}
animation()

function RandomNumberGenerator(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

canv.addEventListener('mousemove', (e) => {
    for (const [key, value] of Object.entries(enemys)) {
        if(hero.GameObjectsHitBox({e:e})){
            hero.InfoBox({e:e})
            break
        }else if (value.GameObjectsHitBox({e:e}) && !value.IsDead) {
            value.InfoBox({e:e})
            break
        }else{
            if (document.querySelector('#InfoBox') != null) {
                document.querySelector('#InfoBox').remove()
            }
        }
    }
})

function AlertWindow() {
    const x = document.createElement('div')
    x.id = 'AlertWindow'
    x.innerHTML = `<h2>OSTRZEŻENIE</h2>  Nie wybrano umiejętności!`
    document.querySelector('#GameBox').appendChild(x)
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'd':
            hero.lastKey = 'd'
            keys.d.pressed = true
            break
        case 'a':
            hero.lastKey = 'a'
            keys.a.pressed = true
            break
        case 'w':
            hero.lastKey = 'w'
            keys.w.pressed = true
            break
        case 's':
            hero.lastKey = 's'
            keys.s.pressed = true
            break
    }
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'd':
            hero.lastKey = undefined
            keys.d.pressed = false
            break
        case 'a':
            hero.lastKey = undefined
            keys.a.pressed = false
            break
        case 'w':
            hero.lastKey = undefined
            keys.w.pressed = false
            break
        case 's':
            hero.lastKey = undefined
            keys.s.pressed = false
            break
    }
})


