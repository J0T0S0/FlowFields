import { Particle } from "./Particle"
/* 
    HEY THERE, EXPLORER!

    *If you are reading this file, you will probably find these infos useful

    1 - Almost everything here has an explanation, so you don't fell lost
    2 - The default settings are a good balance between performance and aesthetic
    3 - Yes, you can use it for personal and public projects
    4 - yes, you can modify it
    5 - No, you don't have to mention me, but it would be awesome!
    6 - No, you can't sell or redistribute this project, even if modified

    IF YOU FEEL LIKE YOU WANT TO HELP THIS PROJECT, JUST CONTACT ME!
    
    - J0T0S0, JTS Productions Team 
*/
export class FlowField {
    constructor({
        canvas, // Canvas element (must be a <canvas></canvas>, obviously)
        backgroundColor = {
            // Self explanatory uh?
            r: 0, // Red Value
            g: 0, // Green Value
            b: 0, // Blue Value
        },
        particles = {
            number: 100, // Recommended <500
            colors: ["#45f3ff", "#fff9"], // Particles colors
            size: 2, // Strangely cool effect if set to really high value (usually 1600+)
            minSpeed: 1, // Minimum particle speed
            maxSpeed: 3, // Maximum particle speed
            length: {
                min: 5, // Minimum particle length
                max: 10, // Maximum particle length (affects performance, but not hard)
            },
            trail: 0.2, // Trail left behind, smaller numbers = longer trail
        },
        flow = {
            speed: 1, // How rapidly the flow direction changes
            randomness: 1, // Randomness i guess eheh (Just try it to see the effect in action)
        },
    }) {
        // Canvas Setup
        this.canvas = canvas
        this.canvas.width = canvas.clientWidth
        this.canvas.height = canvas.clientHeight

        // Store Particles Properties
        this.particles = particles

        // Store Flow Properties
        this.flow = flow

        this.initPen(backgroundColor) // Initialize the pen

        // Generate Particles
        this.objects = [] // Here are stored all the objects of the FlowField
        for (let i = 0; i < particles.number; i++) {
            this.objects.push(new Particle(this)) // Pass stored data to particles
        }
    }

    initPen(bgc) {
        this.pen = this.canvas.getContext("2d")
        this.pen.fillStyle = `rgba(${bgc.r},${bgc.g},${bgc.b},${this.particles.trail})`
        this.pen.lineWidth = this.particles.size
    }

    animate() {
        this.pen.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.objects.map((p) => {
            p.animate()
        })
        requestAnimationFrame(this.animate.bind(this))
    }
}
