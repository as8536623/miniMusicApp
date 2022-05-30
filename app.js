// app.js
App({
    onLaunch (options) {
        const windowInfo = wx.getWindowInfo()
        /*手机屏幕宽度*/
        const screenWidth = windowInfo.screenWidth
        /*手机屏幕高度*/
        const screenHeight = windowInfo.screenHeight
        /*宽高比*/
        const proportion = screenHeight / screenWidth
        /*状态栏高度*/
        const statusBarHeight = windowInfo.statusBarHeight

        this.globalData = {
            screenWidth,
            screenHeight,
            statusBarHeight,
            proportion
        }
    },
    onShow (options) {
        // Do something when show.
    },
    onHide () {
        // Do something when hide.
    },
    onError (msg) {
        console.log(msg)
    },
    globalData:{}
})
