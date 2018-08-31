
const random = (from, to) => Math.random() * (to - from) + from

class Particle {
    constructor() {
        this.x = 0
        this.y = 10
        this.vx = random(-spread, spread)
        this.vy = random(1, 3)
        this.ax = 0
        this.ay = 0
        this.alpha = 255
        this.object = null
    }
    update() {
        this.x += this.vx
        this.y += this.vy
        this.alpha -= 2
        if (this.alpha < 0) {
            this.reset()
        }
    }
    draw() {
        this.object.position.set(this.x, this.y, 0)
        this.object.material.opacity = this.alpha / 255
    }
    reset() {
        if (this.pending) {
            this.pending = false
            this.vx = random(-spread, spread)
        }
        this.alpha = 255
        this.x = 0
        this.y = 10
    }
}

function init() {


    width = $("#body").width()
    height = $(window).height()-100
    particles = []
    scene = new THREE.Scene()
    camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000)
    renderer = new THREE.WebGLRenderer()
    color = "hsl(%c,100%,40%)".replace("%c", 345)
    size = 8
    vertices = 4
    spread = 1
    geometry = new THREE.CircleGeometry(size, vertices)
    
    //webglINIT
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    camera.position.set(0, height / 2, 100)
    renderer.setSize(width, height)
    scene.background = new THREE.Color(0x263238)
    $("#body").append(renderer.domElement)


    requestAnimationFrame(update)
}
//update
function update() {
    if (particles.length < 255) {
        for (let i = 0; i < 2; i++) {
            let p = new Particle(),
                material = new THREE.MeshBasicMaterial({ color: color });
            b = new THREE.Mesh(geometry, material)
            material.transparent = true
            scene.add(b)
            p.object = b
            particles.push(p)
        }
    }

    for (let p of particles) {
        p.update()
        p.draw()
    }
    renderer.render(scene, camera)
    requestAnimationFrame(update)
}
init()