import hyRequest from './index'

export function getTopVideo(offset, limit = 10) {
    return hyRequest.get('/top/mv', {
        offset,
        limit
    })
}

/*获取视频地址*/
export function getMvUrl(id){
    return hyRequest.get('/mv/url', {
       id
    })
}

/*获取mv视频信息*/
export function getMvDetial(mvid){
    return hyRequest.get('/mv/detail', {
        mvid
    })
}

/*获取相关视频*/
export function getMvRelated(id){
    return hyRequest.get('/related/allvideo', {
        id
    })
}