import { HYEventStore } from "hy-event-store";
import { getHomeMusicData } from "../server/api_music"

const musicResMap =　{
  0:'songRecommendation',
  1:'hotMusic',
  2:'originalMusic',
  3:'soarMusic'
}
const eventStore = new HYEventStore({
  state: {
    songRecommendation: {
      type: Object,
      value: {}
    },
    hotMusic: {
      type: Object,
      value: {}
    },
    originalMusic: {
      type: Object,
      value: {}
    },
    soarMusic: {
      type: Object,
      value: {}
    }
  },
  actions: {
    getMusicData(ctx){
      /*idx: 0=新歌榜；1=热歌榜；2=原创榜；3=飙升榜*/
      for(let i = 0;i<4;i++){
        getHomeMusicData(i).then(res=>{
          const musicName = musicResMap[i]
          ctx[musicName] = res.playlist
        })
      }

    }
  }
})

export {
  eventStore,
  musicResMap
} 