canv = document.querySelector('#canv')
c = canv.getContext('2d')

canv.style.border = 'solid 2px white'

canv.width = 896.5
canv.height = 560




keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    }
}

const map = new Sprite({
    imageSrc: 'img/map.jpeg'
})

const obj = new Player({
    CanvPosition: {
        x: 0,
        y: 0
    },
    imageSrc: 'img/postac.gif'
})

function go() {
    
    if (!obj.ingo) {    
        if (keys.d.pressed && obj.lastKey === 'd') {
            obj.FrameCurrent.height = 2
            obj.AnimationFrames({obj:map,speed:{x:2,y:0}})
        } else if (keys.a.pressed && obj.lastKey === 'a') {
            obj.FrameCurrent.height = 1
            obj.AnimationFrames({obj:map,speed:{x:-2,y:0}})
        } else if (keys.w.pressed && obj.lastKey === 'w') {
            obj.FrameCurrent.height = 3
            obj.AnimationFrames({obj:map,speed:{x:0,y:-2}})
        } else if (keys.s.pressed && obj.lastKey === 's') {
            obj.FrameCurrent.height = 0
            obj.AnimationFrames({obj:map,speed:{x:0,y:2}})
        } 
    }
}

function animation() {
    window.requestAnimationFrame(animation)
        
    c.clearRect(0,0,canv.width,canv.height)
    map.update()
    obj.update()
    

    go()

}
animation()

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
            //obj.FrameCurrent.width = 0
            break
        case 'a':
            obj.lastKey = undefined
            keys.a.pressed = false
           // obj.FrameCurrent.width = 0
            break
        case 'w':
            obj.lastKey = undefined
            keys.w.pressed = false
            //obj.FrameCurrent.width = 0
            break
        case 's':
            obj.lastKey = undefined
            keys.s.pressed = false
            //obj.FrameCurrent.width = 0
            break
    }
})

