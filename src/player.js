class Player {
    constructor() {
        this.x = width / 4 * 3
        this.y = height / 2

        this.joint =null
        this.lastJoint=null

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

        if (this.joint && !this.inAir) {
            if(this.joint>100){
                this.x = comets[this.joint].x
                this.y = comets[this.joint].y
            }else{
                this.x = planets[this.joint].x
                this.y = planets[this.joint].y
            }
        }

        this.angle = angleTo(this.x,this.y,Mouse.x,Mouse.y)

        this.mesh.position.set(this.x, this.y, 0)
        this.mesh.rotation.set(0, 0, this.angle)

        if (this.inAir) {
            for (let i in planets) {
                if (i == this.lastJoint) continue;
                if (isIn(this, planets[i])) {
                    this.inAir = false
                    this.vx = 0
                    this.vy = 0
                    this.joint = i
                }
            }
            for (let i in comets) {
                if (i == this.lastJoint) continue;
                if (isIn(this, comets[i])) {
                    this.inAir = false
                    this.vx = 0
                    this.vy = 0
                    this.joint = i
                }
            }
            if((outOfBounds(this))){
                this.gameOver()
            }
        }


    }
    launch() {
        if (this.inAir) return
        if (comets[this.joint] instanceof Comet) {
            //launch comet away
            comets[this.joint].launch(this.angle - Math.PI, this.launchSpeed)            
        }
        this.lastJoint=this.joint
        this.inAir = true
        this.vx = Math.cos(this.angle) * this.launchSpeed
        this.vy = Math.sin(this.angle) * this.launchSpeed
        this.ax=Math.cos(this.angle)*0.1
        this.ay=Math.sin(this.angle)*0.1

    }
    gameOver(){
        deaths++
        gameOver=true
        scene.remove(this.mesh)
        player=null
        clearTimeout(cometTimeout)
        score.className="done"
        score.innerHTML="You saved %c% comets before flying into the void.".replace("%c%",this.score)

        let btn=document.createElement("button");
        btn.innerHTML="Retry?"
        btn.id="restart"
        document.body.appendChild(btn)
        btn.onclick=()=>{
            score.className=""
            document.body.removeChild(btn)
            score.innerHTML="0"
            start()
        }
        
    }
    updateScore(){
        this.score++
        score.innerHTML=this.score
    }

}