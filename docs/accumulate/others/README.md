# 移动端适配方案lib-flexible源码分析
----
移动端适配一直是一个值得探讨的问题，在业余时间我找了一些页面，查看了一些厂商对于移动端H5页面的适配方案，看到了几个典型的例子，今天就来记录一下我看到的第一个典型的例子，也是我们公司目前普通H5项目正在使用的适配方案。

这个适配方案是[lib-flexible](https://github.com/amfe/lib-flexible)，在看这个源码的同时，我想先来回顾一下几个概念：

1. viewport

  在移动设备上，viewport是设备屏幕用来显示我们网页的那一块区域，或者说是浏览器（或者Hybird App内的webview）用来展示我们网页的那部分区域，viewport不局限于浏览器可视区域的大小，可能比浏览器的可视区域大，也可能比浏览器的可视区域小。viewport是一个与html中mate标签相关的概念，如下：
  
  ```html
  <mate name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"/>
  ```
  上面这行代码的作用是让当前viewport的宽度等于设备宽度，页面初始缩放比例为1，viewport最大的缩放比例为1，viewport最小的缩放比例也为1，同时不允许用户拖动缩放。
  
  | 属性 | 作用 | 值类型 |
  |:---|:---:|:---:|
  |width|规定页面的宽度|可以为字符串值"device-width"，或者正整数|
  |initial-scale|规定页面的初始缩放比例|为数字，可以为小数|
  |maximum-scale|规定页面的最大缩放比例|为数字，可以为小数|
  |minimum-scale|规定页面的最小缩放比例|为数字，可以为小数|
  |user-scalable|规定是否允许用户进行拖动缩放|yes或no，yes是允许，no则不允许|
  
  好了，先熟悉到这里，后面如果想对viewport有更深入透彻的研究，可以查看[PPK大神](https://www.quirksmode.org/)的关于viewport的三篇文章。
  
2. 设备像素比

关于设备像素比，我们先卖个关子，后面会说。我们先来看一下另一个值得思考的问题，我们CSS中常用的单位px到底和我们移动设备屏幕上的像素（pixel）是什么关系？CSS里的1px等于移动设备屏幕上的1像素吗？

::: tip 提示
首先,px确实是英文像素（pixel）的缩写；但是！！！我们这里为了将CSS中的px和设备中的物理像素加以区分，CSS中的单位描述我们就用熟悉的px，设备的物理像素，我们则用pixel来加以区分！！！
:::

那么为什么是不一定呢？这里我们又要了解两个相关概念：

(1) **物理像素**：设备的物理像素，顾名思义就是一个移动设备在出厂时就固定了的像素，整个屏幕是由一个挨着一个间隙极小的像素组成的，是屏幕显示中的基本单元，例如某款手机屏幕分辨率：1920*1080像素，这里所说的1920就是该款手机屏幕纵向的像素排布数量，1080就是横向像素排布数量，这里的像素就是我们所说的物理像素pixel。

(2) **独立像素**：独立像素也可以称之为逻辑像素，一个逻辑像素是屏幕接受程序控制的最小单位，简言之我们可以将这里的逻辑像素和我们CSS中的px建立起联系，即CSS中的1px可以控制1个逻辑像素的显示。

书接前文，前面提到我们CSS中的1px不一定等于我们设备的物理像素1pixel，那么什么情况下等于？什么情况下又不等于？

**等于的情况**：早在移动端视网膜屏幕上市以前，绝大部分手机的物理像素和逻辑像素其实是对等的，比如iphone 3 的手机屏幕（物理像素：320x480；逻辑像素：320x480）。这里就是CSS 中的1px等于移动设备的物理像素1pixel。也就是说此时，物理像素÷逻辑像素=1，这个比值就是设备像素比（dpr）。

**不等于的情况**：当 iphone 4 手机问世时，掀起了视网膜平屏幕的浪潮，以iphone 4 手机屏幕为例（物理像素：640x960；逻辑像素：320x480），由此可见iphone 4  相比于iphone 3 的手机屏幕，物理像素多了一倍，但是逻辑像素却没有变化，那么iphone 4 的设备像素比： 物理像素÷逻辑像素=2，也就是说  dpr=2 。当然，随着手机日新月异的发展，dpr=3的情况也是有的，例如总结的下表各主要手机型号的设备像素比：

|手机型号|	物理像素|	独立像素（逻辑像素）|	dpr	倍图|
|:----|:----:|:----:|:----:|
|iphone 5/5S/5E|	 640*1136|	 320*568|	 2|	 @2x|
|iphone 6/7/8|	 750*1334|	 375*667|	 2|	 @2x|
|iphone 6p/7p/8p|	 1242*2208|	 414*736|	 3|	 @3x|

安卓手机由于厂商众多，并且型号尺寸众多，现仅概括几个常见比例供参考（不再列举详细的手机型号），重要的是理解原理：

|手机型号|	物理像素|	逻辑像素|	dpr|	倍图|
|:----|:----:|:----:|:----:|:----:|
|Android 1|	320*480|	320*480|	1|	@1x|
|Android 2|	540*960|	360*640|	1.5|	@1.5x|
|Android 3|	640*960|	320*480|	2|	@2x|
|Android 4|	720*1280|	360*640|	2|	@2x|
|Android 5|	1080*1920|	360*640|	3|	@3x|

好了，巴拉了这么多，该切入正题上lib-flexible源码了，如下：

<highlight-code slot="codeText" lang="javascript">
    ;(function(win, lib) {
        var doc = win.document;
        var docEl = doc.documentElement;
        var metaEl = doc.querySelector('meta[name="viewport"]');  // 获取名为viewport的mate标签
        var flexibleEl = doc.querySelector('meta[name="flexible"]'); // 获取名为flexible的mate标签
        var dpr = 0; // dpr （设备像素比）初始化置为0
        var scale = 0; // scale (缩放比例)
        var tid;
        var flexible = lib.flexible || (lib.flexible = {});
        if (metaEl) { // 如果名为viewport的mate标签存在var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);  // 将name=viewport的mate标签里的，content属性里的initial-scale（初始缩放比）属性处理成数组
            if (match) {
                scale = parseFloat(match[1]); // 获得了页面的初始缩放比例
                dpr = parseInt(1 / scale); // 得到设备像素比
            }
        } else if (flexibleEl) { // 
            var content = flexibleEl.getAttribute('content');
            if (content) {
                var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
                var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
                if (initialDpr) {
                    dpr = parseFloat(initialDpr[1]);
                    scale = parseFloat((1 / dpr).toFixed(2));    
                }
                if (maximumDpr) {
                    dpr = parseFloat(maximumDpr[1]);
                    scale = parseFloat((1 / dpr).toFixed(2));    
                }
            }
        }
        if (!dpr && !scale) { // 当上面条件都不满足时
            var isAndroid = win.navigator.appVersion.match(/android/gi); // 安卓机
            var isIPhone = win.navigator.appVersion.match(/iphone/gi); // IOS机
            var devicePixelRatio = win.devicePixelRatio; // 获取window对象的 devicePixelRatio属性值，这个属性值就是我们所说的设备像素比，简称dpr
            if (isIPhone) {
                // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
                if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
                    dpr = 3; // 
                } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                    dpr = 2;
                } else {
                    dpr = 1;
                }
            } else {
                // 其他设备下，仍旧使用1倍的方案
                dpr = 1;
            }
            scale = 1 / dpr;
        }
        docEl.setAttribute('data-dpr', dpr); // 给页面根元素设置自定义属性data-dpr，值为前面已经赋值好的dpr
        if (!metaEl) { // 当name=viewport的mate标签不存在时，就给页面添加一个，各元素值为前面计算好的scale，并不允许用户拖动缩放
            metaEl = doc.createElement('meta');
            metaEl.setAttribute('name', 'viewport');
            metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
            if (docEl.firstElementChild) {
                docEl.firstElementChild.appendChild(metaEl);
            } else {
                var wrap = doc.createElement('div');
                wrap.appendChild(metaEl);
                doc.write(wrap.innerHTML);
            }
        }
        function refreshRem(){
            var width = docEl.getBoundingClientRect().width;
            if (width / dpr > 540) { // 对于逻辑像素大于540的设备，其宽度就设置为设备像素比乘以540
                width = 540 * dpr;
            }
            var rem = width / 10; // 将屏幕宽度分成10份，每一份为1rem 所以整个屏幕的完整宽度为10rem
            docEl.style.fontSize = rem + 'px'; // 设置根元素字体大小为计算所得的值
            flexible.rem = win.rem = rem;
        }
        win.addEventListener('resize', function() {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }, false);
        win.addEventListener('pageshow', function(e) {
            if (e.persisted) {
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
            }
        }, false);
        if (doc.readyState === 'complete') {
            doc.body.style.fontSize = 12 * dpr + 'px';
        } else {
            doc.addEventListener('DOMContentLoaded', function(e) {
                doc.body.style.fontSize = 12 * dpr + 'px';
            }, false);
        }
        refreshRem();
    　　 // 后面这段代码是将rem单位值转换成px的和将px单位的值换算成rem单位的值
        flexible.dpr = win.dpr = dpr;
        flexible.refreshRem = refreshRem;
        flexible.rem2px = function(d) {
            var val = parseFloat(d) * this.rem;
            if (typeof d === 'string' && d.match(/rem$/)) {
                val += 'px';
            }
            return val;
        }
        flexible.px2rem = function(d) {
            var val = parseFloat(d) / this.rem;
            if (typeof d === 'string' && d.match(/px$/)) {
                val += 'rem';
            }
            return val;
        }
    })(window, window['lib'] || (window['lib'] = {}));
</highlight-code>

 源码的分析已经注释到代码后面的注释中了。通过源码的整体分析，我们会发现，lib-flexible的工作原理可以概括为：
 
::: tip 总结
**通过获取设备像素比dpr进行运算，设置页面里name=viewport的mate标签（包括内部的缩放比例），再在页面根元素--html上添加data-dpr属性以及值，并且设置根元素字体大小，来进行页面适配的。**
:::

随着技术的飞速发展，当前lib-flexible适配方案也在逐渐被更新的适配方案所替代，但是截止目前为止，还没有发现哪种方案能完全满足适配各种机型的需要，也会有一些小的问题。lib-flexible是目前用到的比较成熟的适配方案，所以，让我们一起继续探索吧~