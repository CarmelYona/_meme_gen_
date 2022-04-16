'use strict'
var gElCanvas;
var gCtx;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']



function onInitCanvas() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    drawImgFromlocal()
    addListeners()
    renderCanvas()
}

function renderCanvas() {
    drawImg()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    var meme = getMeme();
    var currLine = meme.selectedLineIdx
    const pos = getEvPos(ev)
    if (!isMemeClicked(pos)) return
    setMemeDrag(true)
    meme.lines[currLine].pos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    var meme = getMeme();
    var currLine = meme.selectedLineIdx
    if (!meme.lines[currLine].isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - meme.lines[currLine].pos.x
    const dy = pos.y - meme.lines[currLine].pos.y
    moveMeme(dx, dy)
    meme.lines[currLine].pos = pos
    renderCanvas()
}

function onUp() {
    var meme = getMeme();
    var currLine = meme.selectedLineIdx
    meme.lines[currLine].isDrag = false
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function onAddLine() {
    addLine()
    renderCanvas()
}

function onSetFont(elFont) {
    setFont(elFont.value)
    renderCanvas()

}

function onSwichLine() {
    var meme = getMeme()
    var idx = meme.selectedLineIdx
    swichLine(idx)
    clearInput()
    renderCanvas()
}

function onSetAline(val) {
    setAline(val)
    renderCanvas()
}

function onSetSize(diff) {
    setSize(diff)
    renderCanvas()
}

function drawImg() {
    var img = getCurrImg()
    var imgOnCanvas = new Image()
    imgOnCanvas.src = img.url
    imgOnCanvas.onload = () => {
        gCtx.drawImage(imgOnCanvas, 0, 0, gElCanvas.width, gElCanvas.height)
        renderText()
    }
}

function onSetStrokeColor(elColor) {
    setStrokeColor(elColor)
    renderCanvas()
}

function onSetFillColor(elColor) {
    setFilleColor(elColor)
    renderCanvas()
}

function clearInput() {
    var elInput = document.querySelector('input[name="txt"]')
    elInput.value = ''
    var elFont = document.querySelector('select[name="Font"]')
    elFont.value = 'none'
    var elStrokeColor = document.querySelector('input[name="stroke-color"]')
    elStrokeColor.value = '#000000'
    var elFillColor = document.querySelector('input[name="fill-color"]')
    elFillColor.value = '#000000'
}

function clearCanvas() {
    var meme = getMeme()
    var currLine = meme.selectedLineIdx
    meme.lines[currLine].txt = ''
    clearInput()
    renderCanvas()
}

function handleKey(ev) {
    if (ev.key === 'Backspace') renderCanvas()
}


function onSubmit(ev) {
    ev.preventDefault()
}

function onSetLineText(elText) {
    setLineText(elText.value)
    renderCanvas()
}

function renderText() {
    var meme = getMeme()
    let lines = meme.lines
    lines.forEach(line => {
        gCtx.shadowColor = `${line.shadowColor}`
        gCtx.shadowBlur = `${line.shadowBlur}`
        gCtx.beginPath()
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = line.align
        gCtx.lineWidth = 2
        gCtx.closePath()
        gCtx.strokeStyle = line.color
        gCtx.fillStyle = line.fillColor
        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
        gCtx.fill()
        gCtx.stroke()
    })

}


function onSetDisplay() {
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.edits-container').style.display = 'block'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}