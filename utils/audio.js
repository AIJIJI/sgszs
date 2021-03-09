const plugin = requirePlugin('WechatSI');

function AudioContext(content) {
  const innerAudioContext = wx.createInnerAudioContext();
  innerAudioContext.autoplay = true;

  plugin.textToSpeech({
    lang: "zh_CN",
    tts: true,
    content: content,
    success: function(res) {

      console.log(res);
      // console.log("succ tts", res.filename);
      innerAudioContext.src = res.filename;

      innerAudioContext.onPlay(() => {
        console.log('开始播放');

      })

      innerAudioContext.onStop(() => {
        console.log('i am onStop');
        innerAudioContext.stop();
        //播放停止，销毁该实例
        innerAudioContext.destroy();

      })

      innerAudioContext.onEnded(() => {
        console.log('i am onEnded');
        //播放结束，销毁该实例
        innerAudioContext.destroy();
        console.log('已执行destory()');
      })

      innerAudioContext.onError((res) => {
        /*  console.log(res.errMsg);
         console.log(res.errCode); */
        innerAudioContext.destroy();
      })

    },
    fail: function(res) {
      console.log("fail tts", res)
    }
  })
}

module.exports = {
  AudioContext: AudioContext
}
