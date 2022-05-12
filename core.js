canv = document.querySelector('#canv')
c = canv.getContext('2d')

canv.style.border = 'solid 2px white'

canv.width = 896.5
canv.height = 576
canv.style.marginTop = `${window.screen.height/12}px`




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



const map = new Maps({
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
        15: {
            x: 512,
            y: 0,
            width: 64,
            height: 192,
        },
        15: {
            x: 288,
            y: 544,
            width: 128,
            height: 96,
        },
        16: {
            x: 416,
            y: 608,
            width: 256,
            height: 96,
        },
        17: {
            x: 672,
            y: 672,
            width: 32,
            height: 96,
        },
        17: {
            x: 288,
            y: 736,
            width: 416,
            height: 32,
        },
        18: {
            x: 672,
            y: 672,
            width: 32,
            height: 64,
        },
        19: {
            x: 256,
            y: 768,
            width: 32,
            height: 64,
        },
        20: {
            x: 288,
            y: 832,
            width: 416,
            height: 32,
        },
        21: {
            x: 704,
            y: 864,
            width: 64,
            height: 32,
        },
        22: {
            x: 768,
            y: 832,
            width: 160,
            height: 32,
        },
        23: {
            x: 768,
            y: 736,
            width: 160,
            height: 32,
        },
        24: {
            x: 928,
            y: 768,
            width: 32,
            height: 64,
        },
        25: {
            x: 768,
            y: 672,
            width: 32,
            height: 64,
        },
        26: {
            x: 800,
            y: 608,
            width: 160,
            height: 64,
        },
        27: {
            x: 960,
            y: 512,
            width: 64,
            height: 96,
        },
        28: {
            x: 1024,
            y: 608,
            width: 64,
            height: 32,
        },
        29: {
            x: 960,
            y: 160,
            width: 64,
            height: 288,
        },
        30: {
            x: 1024,
            y: 160,
            width: 64,
            height: 32,
        },
        31: {
            x: 1056,
            y: 192,
            width: 32,
            height: 224,
        },
        32: {
            x: 576,
            y: 128,
            width: 192,
            height: 320,
        },
        33: {
            x: 768,
            y: 128,
            width: 192,
            height: 256,
        },
        34: {
            x: 864,
            y: 384,
            width: 64,
            height: 64,
        },
        35: {
            x: 512,
            y: 0,
            width: 64,
            height: 160,
        },
    }
})

const hero = new Player({
    ObjID: 1,
    lvl: 10,
    CanvPosition: {
        x: 0,
        y: 64
    },
    imageSrc: 'img/postac.gif'
})
  const enemys = {
    0: new Enemy({
        ObjID: 2,
        lvl: 1,
        imageSrc: 'img/enemy.gif',
        offset: {
            x: 32,
            y: 64
        }
    })
}  

  /* window.onload = () => {
    Create({o: {attacker: hero, enemy: enemys[0]}})
    StartTimer()
    //hero.InBattle = true
    //enemys[0].InBattle = true
  }; */
