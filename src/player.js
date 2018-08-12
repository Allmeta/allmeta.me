class Player {
    constructor() {
        this.x = width / 4 * 3
        this.y = height / 2

        this.joint = { node: null, angle: 0 }

        this.vx = 0
        this.vy = 0
        this.launchSpeed = 10

        this.ax = 0
        this.ay = 0

        this.size = 25

        this.angle = 0
        this.inAir = false

        this.score=0

        this.mesh = new THREE.Mesh(
            new THREE.CircleGeometry(this.size, 3),
            new THREE.MeshBasicMaterial({ color: 0x33b1da }))
        scene.add(this.mesh)
    }
    update() {
        this.vx += this.ax
        this.vy += this.ay

        this.x += this.vx
        this.y += this.vy

        if (this.joint.node && !this.inAir) {
            this.x = this.joint.node.x
            this.y = this.joint.node.y
        }

        this.angle = Math.atan2(Mouse.y - this.y, Mouse.x - this.x)

        this.mesh.position.set(this.x, this.y, 0)
        this.mesh.rotation.set(0, 0, this.angle)

        if (this.inAir) {
            for (let i of planets) {
                if (i == this.joint.node) continue;
                if (isIn(this, i)) {
                    //set to side of thing ty
                    this.inAir = false
                    this.vx = 0
                    this.vy = 0
                    this.joint.node = i
                    // this.joint.angle=angleTo(this.x,this.y,i.x,i.y)
                }
            }
            for (let i of comets) {
                if (i == this.joint.node) continue;
                if (isIn(this, i)) {
                    this.inAir = false
                    this.vx = 0
                    this.vy = 0
                    this.joint.node = i
                }
            }
        }


    }
    launch() {
        if (this.inAir) return
        if (this.joint.node instanceof Comet) {
            //launch comet away
            this.joint.node.launch(this.angle - Math.PI, this.launchSpeed)
            this.score+=1
            score.innerHTML=this.score
        }
        this.inAir = true
        this.vx = Math.cos(this.angle) * this.launchSpeed
        this.vy = Math.sin(this.angle) * this.launchSpeed
        this.ax=Math.cos(this.angle)*0.1
        this.ay=Math.sin(this.angle)*0.1

    }

}