class Comet {
    constructor() {
        this.index = comets.length - 1
        this.angle = Math.random() * Math.PI * 2
        this.x = width / 2 + width / 2 * Math.sin(this.angle)
        this.y = height / 2 + width / 2 * Math.cos(this.angle)

        this.startSpeed = 2
        this.vx = this.startSpeed * Math.cos(angleTo(this.x, this.y, hole.x, hole.y))
        this.vy = this.startSpeed * Math.sin(angleTo(this.x, this.y, hole.x, hole.y))

        this.ax = 0
        this.ay = 0

        this.size = Math.random() * 80 + 20

        this.mesh = new THREE.Mesh(new THREE.CircleGeometry(this.size, 5),
            new THREE.MeshBasicMaterial({
                color:
                    new THREE.Color("hsl(" + Math.floor(360 * Math.random()) + ',' +
                        Math.floor(25 + 70 * Math.random()) + '%,' +
                        Math.floor(65 + 10 * Math.random()) + '%)')
            }))
        scene.add(this.mesh)

        this.mesh.renderOrder = -1
    }
    update() {
        let g = gravitate(this.size, hole.size, distanceTo(this.x, this.y, hole.x, hole.y)) / 10,
            a = angleTo(this.x, this.y, hole.x, hole.y);
        this.ax = Math.cos(a) * g
        this.ay = Math.sin(a) * g

        this.vx += this.ax
        this.vy += this.ay

        this.x += this.vx
        this.y += this.vy

        if (isIn(this, hole)) {
            hole.eat(this)
        }

        this.mesh.position.set(this.x, this.y, 0)
    }
    launch(angle, speed) {
        this.vx += speed * Math.cos(angle)
        this.vy += speed * Math.sin(angle)
    }
}