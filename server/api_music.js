import hyRequest from './index'

export function getBannerImg() {
    return hyRequest.get('/banner', {
        type: 2
    })
}

export function getHomeMusicData(idx) {
    return hyRequest.get('/top/list', {
        idx
    })
}

export function getHotMusicData(cat = "全部", limit=6) {
    return hyRequest.get('/top/playlist', {
        cat,
        limit
    })
}

export function getSongListClassification() {
    return hyRequest.get('/playlist/hot')
}

export function getSongSheetMusicData(id) {
    return hyRequest.get('/playlist/detail/dynamic', {
        id
    })
}





