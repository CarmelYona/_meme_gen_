'use strict'


function onInit() {
    renderGallery()
}

function renderGallery() {
    var imgs = getImg()
    var strHTMLs = imgs.map(img => `
    <img onclick="onImgClick(this)" id="${img.id}" onkeyup="handleKey(event)"
    class="img img${img.id}" src="img/${img.id}.jpg" >
    `)
    document.querySelector('.gallery').innerHTML = strHTMLs.join('')
}

function onSearch() {
    renderGallery()
}

function onImgClick(elImg) {
    localStorage.clear()
    var imgId = elImg.id
    var img = getImgbyid(imgId)
    setCanvas()
    saveCurrImg(img)
    onInitCanvas()
}