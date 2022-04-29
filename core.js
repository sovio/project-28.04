canv = document.querySelector('#canv')
c = canv.getContext('2d')

canv.style.border = 'solid 2px white'

canv.width = 896.5
canv.height = 576




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
    imageSrc: 'img/MAP.png',
    collisions: {
        0: {
            x: 32,
            y: 0,
            width: 64,
            height: 64
        },
        1: {
            x: 128,
            y: 0,
            width: 64,
            height: 64
        }
    }
})

const obj = new Player({
    CanvPosition: {
        x: 0,
        y: 64
    },
    imageSrc: 'img/postac.gif'
})