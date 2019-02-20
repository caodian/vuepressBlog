/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "3d0c5250eec9e7c3e8e80f6bd0ab1ac5"
  },
  {
    "url": "accumulate/index.html",
    "revision": "e24088cba3361068e83eac30e058445e"
  },
  {
    "url": "algorithm/index.html",
    "revision": "c9d4fc63426ecb660048e311fcab8ffc"
  },
  {
    "url": "assets/css/0.styles.7e3ecb07.css",
    "revision": "f57a6d14e56002c6374636aed902ae2b"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.ef62480e.js",
    "revision": "cb19eaa9aa3b58eb9879e658c6cbf21e"
  },
  {
    "url": "assets/js/3.3e6a0e5a.js",
    "revision": "85212ddcc5b2874bdf60d316a56eec72"
  },
  {
    "url": "assets/js/4.5a247fd4.js",
    "revision": "7d0e7480b1e7ae957f5638d4f3b98387"
  },
  {
    "url": "assets/js/5.cadaddbd.js",
    "revision": "b57887c077b395deb71fbc38f39686c5"
  },
  {
    "url": "assets/js/6.384af0a6.js",
    "revision": "d2c7b91225068840aa7b33e68d14b4d1"
  },
  {
    "url": "assets/js/7.2121290f.js",
    "revision": "a24bf1cc7da5744281675d9d507b6549"
  },
  {
    "url": "assets/js/8.74a5d9b0.js",
    "revision": "55d7d2e82a5f9dca8ebfced5317bae02"
  },
  {
    "url": "assets/js/app.4785a1fb.js",
    "revision": "c6deaa362060e18a51d52afe7464df0a"
  },
  {
    "url": "guide.html",
    "revision": "8e8df6adfd77bf10a1a56cf7bece5d69"
  },
  {
    "url": "images/eg1.png",
    "revision": "b6e00451aa6e2fb07803babc3be44fe3"
  },
  {
    "url": "images/eg12.png",
    "revision": "716c3bede731ed6eecb026377f31aac1"
  },
  {
    "url": "images/eg13.png",
    "revision": "022c1e3380b12aa21dd816cd4f1aeaae"
  },
  {
    "url": "images/eg14.png",
    "revision": "c0b03bb9c818398235ae5ac24fe91204"
  },
  {
    "url": "images/eg2.png",
    "revision": "1c31890ab04672b5b9daad1f8216a89b"
  },
  {
    "url": "images/eg3.png",
    "revision": "c3145209954ef832a2c62740a2133a8b"
  },
  {
    "url": "images/eg4.png",
    "revision": "7b4a9dd311c20e60f1f67205845deca1"
  },
  {
    "url": "images/eg5.png",
    "revision": "d70a372965f420d2faaf40259dce9a1c"
  },
  {
    "url": "images/eg6.png",
    "revision": "64c96504fe466f4baa99423a71573892"
  },
  {
    "url": "images/eg7.png",
    "revision": "5814399d3ba9bdcedb588e2b65059e67"
  },
  {
    "url": "images/eg8.png",
    "revision": "cd30b75ad80917829755a2693a374b02"
  },
  {
    "url": "images/photo.jpg",
    "revision": "d4d77052d44bea42bbfc4dba196bde93"
  },
  {
    "url": "index.html",
    "revision": "79b509724d08a2e17af189082ead8ba9"
  },
  {
    "url": "others/index.html",
    "revision": "38dc00d34ab1a6c2995c4b2c23d9bbf2"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
