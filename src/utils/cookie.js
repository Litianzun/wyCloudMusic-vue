export function getCookie(name) {
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null //eslint-disable-line
}

export function setCookie(name, value, expiredays) {
  var exdate = new Date()

  exdate.setDate(exdate.getDate() + expiredays)

  document.cookie =
    name + '=' + escape(value) + (expiredays == null ? '' : ';expires=' + exdate.toGMTString())
}

export function delCookie(name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
}
