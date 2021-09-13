import { Circle } from 'rakkiisto-dom'
import { gameMap, gamePlayer, RakkiistoMV, Vector } from 'rakkiisto-rmmv'
import { addMap } from '.'

console.log(Vector(1, 2).rotDeg(180))

RakkiistoMV.run({
  skipTitle: true,
  disableDash: true,
  disableMouse: true,
  skipModifyZIndex: true,
  showFpsByDefault: true,
  forceCanvas: true,
})

gameMap.onStart(() => {
  const circ = new Circle(0, 0, 100).bg('red').glow().z(999)

  addMap(circ, gamePlayer.realXY, {
    blendMode: 'overlay',
    animeOnce: {
      scale: 2,
      duration: 3000,
    },
  })
})
