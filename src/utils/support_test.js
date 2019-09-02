const checkNativeFeatures = () => new Promise((resolve, reject) => {
  const canvas = document.createElement('canvas')
  const img = new Image()

  img.onload = function () {
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    const supportAPNG = ctx.getImageData(0, 0, 1, 1).data[3] === 0
    resolve(supportAPNG)
  }

  // frame 1 (skipped on apng-supporting browsers): [0, 0, 0, 255]
  // frame 2: [0, 0, 0, 0]
  img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjV' +
  'EwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAA' +
  'AAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg=='
})

export default checkNativeFeatures
