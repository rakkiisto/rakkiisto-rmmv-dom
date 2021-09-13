import { DOM, Div, DOMObject, mixBlendMode, anime } from 'rakkiisto-dom'
import { gameCoords } from 'rakkiisto-rmmv'

const gameScreenDivs: GameScreenDiv[] = []

DOM.onResize(() => gameScreenDivs.forEach(foo => foo.resize()))
setInterval(() => gameScreenDivs.forEach(foo => foo.resize()), 100)

export class GameScreenDiv extends Div {
  constructor() {
    super()
    this.id = 'GameScreenDiv'
    this.z(900).overflow('hidden')
    this.resize()
    gameScreenDivs.push(this)
    DOM.add(this)
  }
  resize() {
    this.pos(...gameCoords.box())
  }
  destroy() {
    gameScreenDivs.splice(gameScreenDivs.indexOf(this), 1)
    super.destroy()
  }
}

export function addScreen(
  object: DOMObject,
  options: {
    blendMode?: mixBlendMode
    anime?: anime.AnimeParams
    animeOnce?: anime.AnimeParams
  } = {},
): GameScreenDiv {
  const div = new GameScreenDiv()
  if (options.blendMode) div.blendMode(options.blendMode)
  if (options.anime) object.anime(options.anime)
  if (options.animeOnce) object.anime({ ...options.animeOnce, complete: () => div.destroy() })
  div.add(object)
  return div
}
export function clearScreen() {
  gameScreenDivs.forEach(div => div.destroy())
}
