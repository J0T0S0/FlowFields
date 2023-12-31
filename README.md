# **Flow Fields**

## Description

**FlowFields** is a JavaScript library for creating mesmerizing visualizations using flow fields.
Flow fields, also known as vector fields, are a popular technique in computer graphics and simulations.
This library allows **you** to **effortlessly** generate **beautiful particle animations** based on flow fields, creating dynamic and captivating visuals.

## Usage

### Installation

> npm i flow-fields

### Configuration

```javascript
const example = new FlowField ({
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
    })
```

### Animate

```javascript
example.animate()
```
