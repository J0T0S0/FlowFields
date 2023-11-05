import { randomIntFromInterval } from "../scripts/utils"
import { noise } from "../scripts/perlin-noise"
export class Particle {
    constructor(field) {
        // Properties From The Respective Field
        this.pen = field.pen
        this.fieldWidth = field.canvas.width
        this.fieldHeight = field.canvas.height

        // Dimensions
        this.size = field.particles.size

        // Position
        this.pos = {
            x: Math.random() * this.fieldWidth,
            y: Math.random() * this.fieldHeight,
        }

        // Speed
        this.speed = randomIntFromInterval(
            field.particles.minSpeed,
            field.particles.maxSpeed
        )
        this.velocity = { x: 0, y: 0 }

        // Lifespan
        this.lengthRange = {
            min: field.particles.length.min,
            max: field.particles.length.max,
        }
        this.length = randomIntFromInterval(
            this.lengthRange.min,
            this.lengthRange.max
        )

        // Colors
        if (Array.isArray(field.particles.colors)) {
            this.color =
                field.particles.colors[
                    Math.floor(Math.random() * field.particles.colors.length)
                ]
        } else {
            this.color = field.particles.colors
        }

        // Tick
        this.tick = 0
        this.flow = field.flow

        // Particle Memory
        this.history = []
    }
    animate() {
        // Update Tick Value
        this.tick += this.flow.speed

        // Calc simplex3 Noise
        let noiseValue =
            noise.simplex3(
                this.pos.x * 0.0015,
                this.pos.y * 0.0025,
                this.tick * 0.0015
            ) * this.flow.randomness

        // Set Velocity
        this.velocity = {
            x: this.speed * Math.cos(noiseValue),
            y: this.speed * Math.sin(noiseValue),
        }

        // Update
        this.history.push({ x: this.pos.x, y: this.pos.y })
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y
        this.length--

        // Draw
        this.pen.beginPath() // Start path
        let last = this.history.length - 1 // Take last history x and y
        this.pen.moveTo(this.history[last].x, this.history[last].y) // Go to last x and y
        for (let i = last; i > 0; i--) {
            this.pen.lineTo(this.history[i].x, this.history[i].y) // Calc the whole line
        }
        this.pen.strokeStyle = this.color // Set pen color
        this.pen.stroke() // Make the stroke

        // Correct Length
        if (this.history.length > this.length) this.history.splice(0, 1)

        // Edge Regeneration
        if (
            this.pos.x > this.fieldWidth ||
            this.pos.x < 0 ||
            this.pos.y > this.fieldHeight ||
            this.pos.y < 0
        ) {
            // Random Edge SpawnPoint
            switch (Math.floor(Math.random() * 4)) {
                case 0: // Top border
                    this.pos.y = 0
                    this.pos.x = Math.random() * this.fieldWidth
                    break
                case 1: // Right border
                    this.pos.x = this.fieldWidth
                    this.pos.y = Math.random() * this.fieldHeight
                    break
                case 2: // Bottom border
                    this.pos.y = this.fieldHeight
                    this.pos.x = Math.random() * this.fieldWidth
                    break
                case 3: // Left border
                    this.pos.x = 0
                    this.pos.y = Math.random() * this.fieldHeight
                    break
                default:
                    break
            }
            // Reset particle
            this.length = randomIntFromInterval(
                this.lengthRange.min,
                this.lengthRange.max
            )
            this.history = []
        }
    }
}
