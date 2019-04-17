var xMarquee = function(obj, fx, temp, speed) {
  obj = document.getElementById(obj)
  var xh = obj.innerHTML
  var sid = 'xScroll_' + Math.floor(Math.random() * 10000)
  var neh = ''
  var fc
  if (fx === '' || fx === 'right' || fx === null) {
    neh = '<div style="display:blockfloat:left">' + xh + '</div>'
    obj.innerHTML = '<div id="' + sid + '" style=" width:9900%">' + neh + neh + '<div style="clear:both"></div></div>'
    fc = document.getElementById(sid).childNodes
    if (fc[0].offsetWidth <= obj.offsetWidth) {
      obj.innerHTML = xh
      return
    }
    document.getElementById(sid).style.width = fc[0].offsetWidth * 2 + 'px'
  } else if (fx === 'up' || fx === 'down') {
    neh = '<div style="display:block">' + xh + '</div>'
    obj.innerHTML = '<div id="' + sid + '">' + neh + neh + '<div style="clear:both"></div></div>'
    fc = document.getElementById(sid).childNodes
    if (fc[0].offsetHeight <= obj.offsetHeight) {
      obj.innerHTML = xh
      return
    }
    document.getElementById(sid).style.height = fc[0].offsetHeight * 2 + 'px'
  }
  var t = 0
  if (fx === '' || typeof fx === undefined || fx === null) { fx = 'left' }
  if (temp === '' || typeof temp === undefined || temp === null) { temp = 1 }
  if (speed === '' || typeof speed === undefined || speed === null) { speed = 50 }
  if (fx === 'right') {
    obj.scrollLeft = fc[0].offsetWidth * 2
    t = fc[0].offsetWidth
  }
  if (fx === 'down') {
    obj.scrollTop = fc[0].offsetHeight * 2
    t = fc[0].offsetHeight
  }
  var dos = function(speed) {
    if (fx === 'left') {
      t = t + temp
      if (obj.scrollLeft >= fc[0].offsetWidth) {
        t = temp + 3
        obj.scrollLeft = temp + 3
      } else {
        obj.scrollLeft = t
      }
    }
    if (fx === 'right') {
      t = t - temp
      if (obj.scrollLeft <= 0) {
        t = fc[0].offsetWidth + 3
        obj.scrollLeft = fc[0].offsetWidth + 3
      } else {
        obj.scrollLeft = t
      }
    }
    if (fx === 'up') {
      t = t + temp
      if (obj.scrollTop >= fc[0].offsetHeight) {
        t = temp + 3
        obj.scrollTop = temp + 3
      } else {
        obj.scrollTop = t
      }
    }
    if (fx === 'down') {
      t = t - temp
      if (obj.scrollTop <= 0) {
        t = fc[0].offsetHeight - 3
        obj.scrollTop = fc[0].offsetHeight - 3
      } else {
        obj.scrollTop = t
      }
    }
  }
  var s = window.setInterval(function() { dos(speed) }, speed)
  var over = function() {
    window.clearInterval(s)
  }
  var out = function() {
    s = window.setInterval(function() { dos(speed) }, speed)
  }
  try {
    obj.addEventListener('mouseover', over, false)
    obj.addEventListener('mouseout', out, false)
  } catch (e) {
    obj.attachEvent('o**ouseover', over)
    obj.attachEvent('onmouseout', out)
  }
}

export default xMarquee
