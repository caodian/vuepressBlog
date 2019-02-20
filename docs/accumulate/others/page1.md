# 浏览器兼容性

## web移动端Chrome浏览器和safari浏览器在时间转换上的差异性问题

作为一名移动前端开发的人员，平时遇到的兼容性问题不在少数。那么，今天就来说一下最近遇到的一个小坑（关于Android和ios在时间转换上的差异性问题）话不多说，直接上重点。

Chrome浏览器：当使用`new Date('2017-08-01 16:10:02').getTime();` 转换毫秒数的时候，一切正常，得到目标数据。

safari浏览器：当使用`new Date('2017-08-01 16:10:02').getTime();` 转换毫秒数的时候，便报错,信息为"Invalid Date"。

**原因分析**：由于Safari浏览器中对"2017-08-01"的解析不正确造成上述原因，但是Safari浏览器可以完美解析"2017/08/01"格式的字符串，而经过测试，Chrome浏览器中对这两种格式（"2017-08-01"与"2017/08/01"）的字符串均能完美解析，所以将代码改成如下：

`new Date('2017-08-01 16:10:02').replace(/\-/g,'/').getTime();`

 由该问题延伸一个小细节，一般会被忽视。
 
::: warning 注意
new Date('2017-08-01').getTime();
new Date('2017/08/01').getTime();
上面这两个时间转换结果是相同的吗？原因是什么呢？欢迎您通过创建[Issue](https://gitee.com/zhangzhiwei1991/zhangzhiwei1991/issues)或[Pull Request](https://gitee.com/zhangzhiwei1991/zhangzhiwei1991/pulls)的方式告知我。
:::
