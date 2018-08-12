init()
function init() {
    width = window.innerWidth
    height = window.innerHeight
    scene = new THREE.Scene()
    camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000)
    renderer = new THREE.WebGLRenderer({ antialias: true })
    camera.up = new THREE.Vector3(0, 0, -1);

    score = document.getElementById("score")
    deaths = 0

    //webgl INIT
    camera.position.set(width / 2, height / 2, 100)
    renderer.setSize(width, height)
    scene.background = new THREE.Color(0x104243)
    document.body.appendChild(renderer.domElement)

    //listener for key and mousemove
    Key = {
        _pressed: {},

        LEFT: 65,
        UP: 87,
        RIGHT: 68,
        DOWN: 83,
        SPACE: 32,

        isDown: function (keyCode) {
            return this._pressed[keyCode]
        },

        onKeydown: function (event) {
            this._pressed[event.keyCode] = true;
            if (this.isDown(this.SPACE)) {
                player.launch()
            }
        },

        onKeyup: function (event) {
            delete this._pressed[event.keyCode];
        }
    }
    Mouse = { x: 0, y: 0 }
    document.addEventListener("mousemove", function (event) { Mouse.x = event.clientX; Mouse.y = event.clientY }, false)
    window.addEventListener('keyup', function (event) { Key.onKeyup(event); }, false);
    window.addEventListener('keydown', function (event) { Key.onKeydown(event); }, false);

    start()
}
function start() {
    gameOver = false

    planets = []
    comets = {}

    //player, planets, comets, hole
    while (scene.children.length > 0) {
        scene.remove(scene.children[scene.children.length - 1]);
    }

    player = new Player()
    player.mesh.renderOrder = 10
    hole = new Hole()
    planets.push(new Planet())
    planets.push(new Planet())
    planets.push(new Planet())

    cometTimeout = setTimeout(spawnComet, 3000)

    if (deaths == 0) requestAnimationFrame(update)
}
function update() {
    if (!gameOver) {
        player.update()
    }
    for (let i in comets) {
        comets[i].update()
    }
    planets.forEach(o => o.update())
    hole.update()

    renderer.render(scene, camera)
    requestAnimationFrame(update)
}
function spawnComet() {
    let k = new Date().getTime()
    comets[k] = new Comet(k)
    cometTimeout = setTimeout(spawnComet, 5000)
}
