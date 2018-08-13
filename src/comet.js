class Comet {
    constructor(id) {
        this.launched = false
        this.index = id
        this.spawnAngle = Math.random() * Math.PI * 2
        this.x = width / 2 + width / 2 * Math.sin(this.spawnAngle)
        this.y = height / 2 + width / 2 * Math.cos(this.spawnAngle)

        this.startX=this.x
        this.startY=this.y

        this.startSpeed = 2
        this.angle=angleTo(this.x, this.y, hole.x, hole.y)
        this.vx = this.startSpeed * Math.cos(this.angle)
        this.vy = this.startSpeed * Math.sin(this.angle)

        this.ax = 0
        this.ay = 0

        this.size = Math.random() * 30 + 30

        trails[this.index]={}

        this.mesh = new THREE.Mesh(new THREE.CircleGeometry(this.size, 5),
            new THREE.MeshBasicMaterial({
                color:
                    new THREE.Color("hsl(" + Math.floor(360 * Math.random()) + ',' +
                        Math.floor(25 + 70 * Math.random()) + '%,' +
                        Math.floor(65 + 10 * Math.random()) + '%)'),
                wireframe:false
            }))
        scene.add(this.mesh)
        this.mesh.rotateZ(this.angle)

        this.mesh.renderOrder = -1
    }
    update() {
        this.vx += this.ax
        this.vy += this.ay

        this.x += this.vx
        this.y += this.vy

        if (isIn(this, hole)) {
            hole.eat(this)
        }
        if (this.launched && outOfBounds(this) && !gameOver) {
            this.kill()
            player.updateScore()
        }        
        let k=ID();
        trails[this.index][k]=new Trail(this,k)

        this.mesh.position.set(this.x, this.y, 0)
    }
    launch(angle, speed) {
        this.launched = true
        this.vx += speed * Math.cos(angle)
        this.vy += speed * Math.sin(angle)
        // this.startSpeed=hyp(this.vx,this.vy)
        this.angle=Math.atan2(this.vy,this.vx)
    }
    kill(){
        delete comets[this.index]
        scene.remove(this.mesh)
    }
}
class Trail{
    constructor(comet,id){
        this.comet={index:comet.index}
        this.index=id
        let r=Math.PI/5-Math.random()*Math.PI/5*2;
        this.x=comet.x+comet.size*Math.cos(comet.angle-Math.PI+r)
        this.y=comet.y+comet.size*Math.sin(comet.angle-Math.PI+r)

        this.angle=angleTo(this.x,this.y,comet.startX,comet.startY)

        this.speed=comet.startSpeed
        this.vx=this.speed*Math.cos(this.angle)
        this.vy=this.speed*Math.sin(this.angle)

        this.size = Math.random() * 10+5

        this.mesh = new THREE.Mesh(new THREE.CircleGeometry(this.size, 3),
            new THREE.MeshBasicMaterial({
                color:
                    comet.mesh.material.color.clone(),
                wireframe:true,
                transparent:true,
            }))
        scene.add(this.mesh)
        this.mesh.renderOrder = -2
    }
    update(){
        this.x+=this.vx
        this.y+=this.vy

        this.mesh.rotateZ(this.mesh.material.opacity*Math.PI)

        this.mesh.material.opacity-=this.speed/200
        if(this.mesh.material.opacity<=0){
            this.kill()
        }
        this.mesh.position.set(this.x, this.y, 0)
    }
    kill(){
        scene.remove(this.mesh)
        delete trails[this.comet.index][this.index]
    }
}