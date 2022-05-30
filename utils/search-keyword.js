export default function (songsLists,searchKeyWords) {
    const searchKeyNodes = []
    for(let item of songsLists){
        const nameCapitalize = item.name.toLocaleUpperCase()
        const searchKeyWordsCapitalize = searchKeyWords.toLocaleUpperCase()
        const keywordsMatching = nameCapitalize.startsWith(searchKeyWordsCapitalize)
        const nodes = []
        if(keywordsMatching){
            const keywords1 = nameCapitalize.slice(0,searchKeyWords.length)
            const keywords2 = nameCapitalize.slice(searchKeyWords.length)
            const node1 = {
                name: 'span',
                attrs: {
                    class: 'span_class',
                    style: 'color: #26ce8a;'
                },
                children: [{
                    type: 'text',
                    text: keywords1
                }]
            }
            const node2 = {
                name: 'span',
                attrs: {
                    class: 'span_class',
                    style: 'color: #000000;'
                },
                children: [{
                    type: 'text',
                    text: keywords2
                }]
            }
            nodes.push(node1,node2)
        }else{
            const node1 = {
                name: 'span',
                attrs: {
                    class: 'span_class',
                    style: 'color: #333333;'
                },
                children: [{
                    type: 'text',
                    text: item.name
                }]
            }
            nodes.push(node1)
        }
        searchKeyNodes.push(nodes)
    }
    return searchKeyNodes
}