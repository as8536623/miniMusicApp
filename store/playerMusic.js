import { HYEventStore } from "hy-event-store";
import { getMusicPlayerData } from "../server/api_player"

const eventStore = new HYEventStore({
    state: {

    },
    actions: {
        getMusicData(ctx){
            getMusicPlayerData().then(res=>{

            })
        }
    }
})

export {
    eventStore
}
