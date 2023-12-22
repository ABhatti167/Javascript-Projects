const button = document.getElementById('button')
let colorCode = document.querySelector("#color")
let bodyBG = document.getElementsByTagName('body')
let displayDiv = document.getElementById("display")
let simpleHex = document.getElementById("simpleHex")
simpleRGB = document.getElementById("rgb")

let option = 'rgb'

let color = {
    hex: "#000000",
    rgb: 'rgb(255,0,255)'
}

function setColor() {
    bodyBG.backgroundColor = color.rgb
    displayDiv.style.backgroundColor = color.rgb
    if (option == 'rgb') {
    colorCode.textContent = color.rgb.substring(3)
    } else {
        colorCode.textContent = color.hex
    }
}

function randomize() {

    let q1 = Math.round(Math.random() * 255) + 1
    let q2 = Math.round(Math.random() * 255) + 1
    let q3 = Math.round(Math.random() * 255) + 1
    return `rgb(${q1},${q2},${q3})`
}

function rgbToHex(rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}

function update() {
    color.rgb = randomize()
    let rgbs = color.rgb.split(',')
    let r1 = rgbs[0].substring(4)
    let r2 = rgbs[1]
    let r3 = rgbs[2].substring(0, (rgbs[2].length - 1))
    color.hex = "#" + rgbToHex(r1) + rgbToHex(r2) + rgbToHex(r3)
}

setColor()

button.addEventListener("click", () => {
    update()
    setColor()
})

simpleHex.addEventListener('click', () => {
    option = 'hex'
    setColor()
})


simpleRGB.addEventListener('click', () => {
    option = 'rgb'
    setColor()
})

