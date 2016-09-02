
(function (window, undefined) {

  'use strict'

  var r = new webkitSpeechRecognition()
  var board = document.querySelector('.board')
  var btn = document.querySelector('.btn-block')
  var loading = document.querySelector('.status')

  r.lang = 'pt-BR'

  // More options of transcript
  // ==========================
  // r.maxAlternatives = 3


  // Start recognition
  // ================
  btn.addEventListener('click', () => {
    r.start ? r.start() : r.onaudiostart()
    loading.innerHTML = 'Escutanto...'
  }, false)

  // Get transcript
  // =============
  r.onresult = evt => {
    loading.innerHTML = ''
    var cmd = evt.results[0][0].transcript.split(' ')[0]
    var text = evt.results[0][0].transcript

    if (cmd == 'apagar') {
      board.value = ''
    }

    board.value += format(text)
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

})(window)
