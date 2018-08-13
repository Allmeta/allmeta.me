class Hole {
    constructor() {
        this.x = width / 2
        this.y = height / 2

        this.firstSize = 30
        this.size = 30
        this.it = 0.05;

        this.mesh = new THREE.Mesh(
            new THREE.CircleGeometry(this.size, 7),
            new THREE.MeshBasicMaterial({ color: 0x000322 }))
        scene.add(this.mesh)
        this.mesh.position.set(this.x, this.y, 0)
    }
    update() {
        this.mesh.rotateZ(this.it)
    }
    eat(comet) {        
        this.size += Math.sqrt(comet.size / Math.PI)
        comet.kill()
        this.mesh.scale.set(this.size / this.firstSize, this.size / this.firstSize, 1)
        if(player && player.joint==comet.index){            
            player.gameOver()
        }
    }
}