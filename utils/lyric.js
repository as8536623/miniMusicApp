const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function lyricIfo(lyric) {
    const lyricStrings = lyric.split("\n")
    const lyricInfos = []
    for (const lineLyric of lyricStrings){
        /*获取时间结果*/
        const timerResult = timeRegExp.exec(lineLyric)
        if(!timerResult) continue
        /*分钟转*/
        const minute = timerResult[1] * 60 * 1000
        const second = timerResult[2] * 1000
        const millsecondTime = timerResult[3]
        const millsecond = millsecondTime.length === 2 ? millsecondTime * 10: millsecondTime * 1
        const time = minute + second + millsecond

        /*获取每个时间段的歌词*/
        const instantLyrics = lineLyric.replace(timeRegExp,"")
        lyricInfos.push({time,instantLyrics})
    }
    return lyricInfos
}