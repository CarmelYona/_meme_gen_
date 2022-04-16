'use strict'
var gCurrImg = getCurrImg()
var gMeme = {
    selectedImgId: gCurrImg.id,
    selectedLineIdx: 0,
    lines: [{
        isSelected: true,
        isDrag: false,
        shadowColor: 'black',
        shadowBlur: 10,
        txt: 'Text1',
        size: 50,
        font: 'impact',
        align: 'center',
        color: getRandomColor(),
        fillColor: 'white',
        pos: { x: 130, y: 75 }
    }, {
        isSelected: false,
        isDrag: false,
        shadowColor: '',
        shadowBlur: 0,
        txt: 'Text2',
        size: 50,
        font: 'impact',
        align: 'center',
        color: getRandomColor(),
        fillColor: 'white',
        pos: { x: 130, y: 350 }
    }]
}

function addLine() {
    var diff = gMeme.lines.length
    gMeme.lines.push({
        isSelected: false,
        isDrag: false,
        shadowColor: '',
        shadowBlur: 0,
        txt: `Text${diff+1}`,
        size: 50,
        font: 'impact',
        align: 'center',
        color: getRandomColor(),
        fillColor: 'white',
        pos: { x: 130 + (diff * 5), y: 200 + (diff * 5) }
    })
}

function setCanvas() {
    onSetDisplay()
}

function moveMeme(dx, dy) {
    var meme = getMeme()
    var currLine = meme.selectedLineIdx
    meme.lines[currLine].pos.x += dx
    meme.lines[currLine].pos.y += dy
}

function isMemeClicked(clickedPos) {
    var meme = getMeme()
    var currLine = meme.selectedLineIdx
    const { x, y } = meme.lines[currLine].pos
        // console.log(pos)
    const distance = Math.sqrt((x - clickedPos.x) ** 2 + (y - clickedPos.y) ** 2)
    return distance <= meme.lines[currLine].size
}

function setMemeDrag(isDrag) {
    var meme = getMeme()
    var currLine = meme.selectedLineIdx
    meme.lines[currLine].isDrag = isDrag
}

function setFont(font) {
    var currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].font = font
}

function swichLine(idx) {
    if (idx === gMeme.selectedLineIdx) {
        var prevLine = gMeme.selectedLineIdx
        gMeme.lines[prevLine].isSelected = false
        gMeme.lines[prevLine].shadowColor = ''
        gMeme.lines[prevLine].shadowBlur = ''
        gMeme.selectedLineIdx++;
        var currLine = gMeme.selectedLineIdx

        if (currLine > gMeme.lines.length - 1) {
            gMeme.lines[prevLine].isSelected = false
            gMeme.lines[prevLine].shadowColor = ''
            gMeme.lines[prevLine].shadowBlur = ''

            gMeme.selectedLineIdx = 0
            currLine = gMeme.selectedLineIdx
            gMeme.lines[currLine].isSelected = true
            gMeme.lines[currLine].shadowColor = 'black'
            gMeme.lines[currLine].shadowBlur = '10'
        }
        gMeme.lines[currLine].isSelected = true
        gMeme.lines[currLine].shadowColor = 'black'
        gMeme.lines[currLine].shadowBlur = '10'
    }
}

function setAline(val) {
    var currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].align = val
}

function setSize(diff) {
    var currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].size += diff
}



function setStrokeColor(elColor) {
    var currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].color = elColor.value
}

function setFilleColor(elColor) {
    var currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].fillColor = elColor.value
}

function getImgId(elImg) {
    var imgs = getImgs()
    var img = imgs.find((img) => img.id === +elImg.id)
    renderMeme(img)
}

function setLineText(txt) {
    var currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].txt = txt

}

function getMeme() {
    return gMeme
}


// download meme
function drawImgFromlocal() {
    var img = new Image()
    img.src = `img/${gMeme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
    }
}

function drawImgFromRemote() {
    var img = new Image()
    img.src = 'https://steamcdn-a.akamaihd.net/steam/apps/431960/ss_39ed0a9730b67a930acb8ceed221cc968bee7731.1920x1080.jpg?t=1571786836';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
    }
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'meme.jpg'
}

// share to facebook
function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)

        document.querySelector('.share-container').innerHTML = `
        <a class="button" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}