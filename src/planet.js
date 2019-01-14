class Planet {
    constructor() {
        this.amp = height / 10 + 2 * height / 5 * Math.random()
        this.speed = Math.sign(Math.random() - .5) * map(this.amp, height / 10, 3 * height / 5, 0.002, 0.00025)
        this.phase = planets.length / 3;
        this.x = width / 2 + this.amp * Math.sin(this.phase * Math.PI * 2)
        this.y = height / 2 + this.amp * Math.cos(this.phase * Math.PI * 2)

        this.size = 20 + Math.random() * 30

        this.mesh = new THREE.Mesh(new THREE.CircleGeometry(this.size, 8),
            new THREE.MeshBasicMaterial({
                color:
                    new THREE.Color("hsl(" + Math.floor(360 * Math.random()) + ',' +
                        Math.floor(25 + 70 * Math.random()) + '%,' +
                        Math.floor(65 + 10 * Math.random()) + '%)')
            }))
            
            scene.add(this.mesh)

            var curve = new THREE.EllipseCurve(
                width/2,  height/2,            // ax, aY
                this.amp, this.amp,           // xRadius, yRadius
                0,  2 * Math.PI,  // aStartAngle, aEndAngle
                false,            // aClockwise
                0                 // aRotation
            );
            
            var points = curve.getPoints( 50 );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );
            
            var material = new THREE.LineBasicMaterial( { color : 0xffffff,transparent:true,opacity:0.1 } );
            
            // Create the final object to add to the scene
            var ellipse = new THREE.Line( geometry, material );
            scene.add(ellipse)
        }
    update() {
        this.phase += this.speed

        this.x = width / 2 + this.amp * Math.sin(this.phase * Math.PI * 2)
        this.y = height / 2 + this.amp * Math.cos(this.phase * Math.PI * 2)

        this.mesh.position.set(this.x, this.y, 0)
    }
}