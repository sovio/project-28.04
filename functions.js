function go() {
    obj.Oncolision = true
    if (!obj.ingo) {    
        if (keys.d.pressed && obj.lastKey === 'd') {
            obj.FrameCurrent.height = 2
            obj.SCollisions({obj:map, speed:{x:2,y:0},key:'d'})
        } else if (keys.a.pressed && obj.lastKey === 'a') {
            obj.FrameCurrent.height = 1
            obj.SCollisions({obj:map, speed:{x:-2,y:0},key:'a'})
        } else if (keys.w.pressed && obj.lastKey === 'w') {
            obj.FrameCurrent.height = 3
            obj.SCollisions({obj:map, speed:{x:0,y:-2},key:'w'})
        } else if (keys.s.pressed && obj.lastKey === 's') {
            obj.FrameCurrent.height = 0
            obj.SCollisions({obj:map, speed:{x:0,y:2},key:'s'})
        } 
    }
}

function animation() {
    window.requestAnimationFrame(animation)
        
    c.clearRect(0,0,canv.width,canv.height)
    map.update()
    for (const [key, value] of Object.entries(enemys)) {
        value.update()
    }
    obj.update()
    go()
}
animation()

canv.addEventListener('mousemove', (e) => {
    for (const [key, value] of Object.entries(enemys)) {
        if(obj.GameObjectsHitBox({e:e})){
            obj.InfoBox({e:e})
            break
        }else if (value.GameObjectsHitBox({e:e})) {
            value.InfoBox({e:e})
        }else{
            if (document.querySelector('#InfoBox') != null) {
                document.querySelector('#InfoBox').remove()
            }
        }
    }
})

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'd':
            obj.lastKey = 'd'
            keys.d.pressed = true
            break
        case 'a':
            obj.lastKey = 'a'
            keys.a.pressed = true
            break
        case 'w':
            obj.lastKey = 'w'
            keys.w.pressed = true
            break
        case 's':
            obj.lastKey = 's'
            keys.s.pressed = true
            break
    }
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'd':
            obj.lastKey = undefined
            keys.d.pressed = false
            break
        case 'a':
            obj.lastKey = undefined
            keys.a.pressed = false
            break
        case 'w':
            obj.lastKey = undefined
            keys.w.pressed = false
            break
        case 's':
            obj.lastKey = undefined
            keys.s.pressed = false
            break
    }
})

