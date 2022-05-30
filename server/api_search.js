import hyRequest from './index'

export function getSearchHotData() {
    return hyRequest.get('/search/hot')
}

export function getSearchSuggestionsData(keywords) {
    return hyRequest.get('/search/suggest',{
        keywords
    })
}

export function getSearchResultData(keywords) {
    return hyRequest.get('/search',{
        keywords
    })
}





