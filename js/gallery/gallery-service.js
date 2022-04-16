'use strict'
const STOARGE_KEY = 'imgDB'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'prime minister', 'man'] },
    { id: 2, url: 'img/2.jpg', keywords: ['happy', 'dog', 'nice', 'pets'] },
    { id: 3, url: 'img/3.jpg', keywords: ['cute', 'pets', 'happy', 'dog'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat', 'sleep', 'pets', 'cute', 'funny'] },
    { id: 5, url: 'img/5.jpg', keywords: ['lets go', 'victory', 'funny'] },
    { id: 6, url: 'img/6.jpg', keywords: ['man', 'funny', 'happy'] },
    { id: 7, url: 'img/7.jpg', keywords: ['cute', 'happy', 'funny'] },
    { id: 8, url: 'img/8.jpg', keywords: ['happy', 'funny', 'man'] },
    { id: 9, url: 'img/9.jpg', keywords: ['happy', 'funny', 'cute'] },
    { id: 10, url: 'img/10.jpg', keywords: ['prime minister', 'happy', 'funny'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'man', 'fighter'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'man', ] },
    { id: 13, url: 'img/13.jpg', keywords: ['drink', 'cheers', 'man', 'funny', 'movie'] },
    { id: 14, url: 'img/14.jpg', keywords: ['angry', 'dark', 'movie'] },
    { id: 15, url: 'img/15.jpg', keywords: ['movie', 'man'] },
    { id: 16, url: 'img/16.jpg', keywords: ['happy', 'man', 'movie', 'funny'] },
    { id: 17, url: 'img/17.jpg', keywords: ['prime minister', 'man', ] },
    { id: 18, url: 'img/18.jpg', keywords: ['movie', 'happy', 'buzz'] },
]

function filterimgs() {
    var elSearch = document.querySelector('input[name="search"]')
    var search = elSearch.value
    if (!search) return gImgs
    else return gImgs.filter(img => {
        return img.keywords.some(keyword => {
            return keyword.substring(0, search.length) === search
        })
    })
}

function getImg() {
    var imgs = filterimgs()
    return imgs
}

function getImgbyid(id) {
    var img = gImgs.find(img => +id === img.id)
    return img
}

function getCurrImg() {
    var currImg = loadFromStorage(STOARGE_KEY)
    return currImg
}


function saveCurrImg(img) {
    saveToStorage(STOARGE_KEY, img)
}