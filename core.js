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
        },
        2: {
            x: 256,
            y: 0,
            width: 64,
            height: 32
        },
        3: {
            x: 128,
            y: 128,
            width: 64,
            height: 384
        },
        4: {
            x: 0,
            y: 192,
            width: 128,
            height: 32
        },
        5: {
            x: 192,
            y: 192,
            width: 96,
            height: 64
        },
        6: {
            x: 192,
            y: 480,
            width: 96,
            height: 96
        },
        7: {
            x: 192,
            y: 320,
            width: 96,
            height: 64
        },
        8: {
            x: 192,
            y: 384,
            width: 64,
            height: 64,
        },
        9: {
            x: 384,
            y: 0,
            width: 96,
            height: 64,
        },
        10: {
            x: 256,
            y: 128,
            width: 32,
            height: 64,
        },
        11: {
            x: 352,
            y: 128,
            width: 160,
            height: 64,
        },
        12: {
            x: 352,
            y: 192,
            width: 32,
            height: 64,
        },
        13: {
            x: 352,
            y: 320,
            width: 160,
            height: 64,
        },
        14: {
            x: 448,
            y: 192,
            width: 64,
            height: 128,
        },
    }
})

const obj = new Player({
    CanvPosition: {
        x: 0,
        y: 64
    },
    imageSrc: 'img/postac.gif'
})