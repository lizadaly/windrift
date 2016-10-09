const React = require('react')
import config from './config.json'
import {Game, startGame } from './app'

function start() {
  var chaptersList = require.context('./chapters', true, /\.js$/)
  var game = <Game chaptersList={chaptersList} config={config}/>
  startGame(game)
}

document.addEventListener('DOMContentLoaded', function () {
  start()
})
