import hyRequest from './index'

export function getMusicPlayerData(ids) {
    return hyRequest.get('/song/detail', {
        ids
    })
}

export function getMusicPlayerLyric(id) {
    return hyRequest.get('/lyric', {
        id
    })
}






