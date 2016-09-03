
(function (window, undefined) {

  'use strict'

  // APIs
  // ===
  var r = new webkitSpeechRecognition()
  var synth = window.speechSynthesis;

  // Board
  // ======
  var board = document.querySelector('.board')

  // Buttons
  // =======
  var btnListen = document.querySelector('.btn-primary')
  var btnSpeak = document.querySelector('.btn-default')

  // Loading
  // =======
  var loading = document.querySelector('.status')

  // Will say
  // =======
  var text = ''

  r.lang = 'pt-BR'

  // More options of transcript
  // ==========================
  // r.maxAlternatives = 3


  // Start recognition
  // ================
  btnListen.addEventListener('click', () => {
    r.start ? r.start() : r.onaudiostart()
    loading.innerHTML = 'Escutanto...'
  }, false)

  btnSpeak.addEventListener('click', () => {
    speak(text)
  })

  // Get transcript
  // =============
  r.onresult = evt => {
    loading.innerHTML = ''
    var cmd = evt.results[0][0].transcript.split(' ')[0]
    var txt = evt.results[0][0].transcript

    if (cmd == 'apagar') {
      board.value = ''
    }
    text += txt
    board.value += format(txt)
  }

  // Stop the transcript if someone not say nothing
  // =============================================
  r.onspeechend = () => {
    r.stop();
  }

  // If not match
  // ===========
  r.onnomatch = evt => {
    console.log('Não consegui entender nada!')
  }

  // If happen some error
  r.onerror = evt => {
    console.log('Aconteceu um erro!', evt.error)
  }


  // Addons
  // ======
  function format (v) {
    v = v.replace(/(apagar\s?\n?)/g, '')
    v = v.replace(/(vírgula)s?\s?\n?$/g, ', ')
    v = v.replace(/(ponto)s?\s?\n?$/g, '. ')
    v = v.replace(/(nova linha)\s?\n?$/g, '\n')
    return v
  }

  function speak (t) {
    var read = new SpeechSynthesisUtterance(t)
    read.lang = 'pt-BR'
    synth.speak(read)
  }

})(window)
