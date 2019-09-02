export default (img) => {
  return new Promise(function (resolve, reject) {
    function load (url) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.responseType = 'arraybuffer'
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(this.response)
        } else {
          reject(new Error('request ArrayBuffer fail'))
        }
      }
      xhr.send()
    }

    load(img)
  })
}
