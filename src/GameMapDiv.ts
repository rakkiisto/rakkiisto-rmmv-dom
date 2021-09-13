import { anime, Div, DOMObject, mixBlendMode } from 'rakkiisto-dom'
import { coords, gameMap, gameCoords } from 'rakkiisto-rmmv'
import { GameScreenDiv } from './GameScreenDiv'

const gameMapDivs: GameMapDiv[] = []

gameMap.onStart(() => {
  gameMapDivs.forEach(gmd => gmd.destroy())
})
gameMap.onUpdate(() => {
  gameMapDivs.forEach(gmd => gmd.updatePos())
})

export class GameMapDiv extends Div {
  div = new GameScreenDiv()
  constructor(public coords: coords) {
    super()
    this.id = 'GameMapDiv'
    this.updatePos()
    gameMapDivs.push(this)
    this.div.add(this)
  }
  updatePos() {
    this.pos(...gameCoords.screenXY(this.coords))
  }
  destroy() {
    gameMapDivs.splice(gameMapDivs.indexOf(this), 1)
    this.div.destroy()
  }

  blendMode(): mixBlendMode
  blendMode(arg: mixBlendMode): this
  blendMode(arg?: mixBlendMode): mixBlendMode | this {
    if (typeof arg !== 'undefined') this.div.blendMode(arg)
    return this.div.blendMode()
  }
}

export function addMap(
  object: DOMObject,
  coords: coords,
  options: {
    blendMode?: mixBlendMode
    anime?: anime.AnimeParams
    animeOnce?: anime.AnimeParams
  } = {},
): GameMapDiv {
  const div = new GameMapDiv(coords)
  if (options.blendMode) div.blendMode(options.blendMode)
  if (options.anime) object.anime(options.anime)
  if (options.animeOnce) object.anime({ ...options.animeOnce, complete: () => div.destroy() })
  div.add(object)
  return div
}
export function clearMap() {
  gameMapDivs.forEach(div => div.destroy())
}
