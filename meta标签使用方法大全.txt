# 网页中meta的用法

  1.申明文档使用的字符编码
    第一种：
    <meta charset='utf-8'>
    第二种：
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    而目前我们一般推荐使用第一种写法，也是HTML5使用的写法。

    其他的编码格式：gb2312（简体中文），big5（繁体中文），utf-8 ...

  2.优先使用 IE 最新版本和 Chrome
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    说明：当指定的content值为IE=edge,chrome=1时，优先使用 IE 最新版本和 Chrome。

  3.浏览器内核控制
    添加meta标签的网站可以控制浏览器选择何种内核渲染（国内浏览器很多都是双内核（webkit和Trident），webkit内核高速浏览，IE内核兼容网页和旧版网站）。
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    说明：webkit:极速模式  ie-comp:ie兼容模式  ie-stand:ie标准模式

    国内双核浏览器默认内核模式如下：
    搜狗高速浏览器、QQ浏览器：IE内核（兼容模式）
    360极速浏览器、遨游浏览器：Webkit内核（极速模式）
  
  4.禁止浏览器从本地计算机的缓存中访问页面内容
    <meta http-equiv="Pragma" content="no-cache">

  5.SEO优化
    关键词：<meta name="keywords" content="李先生,老司机,何首污,MR_LP" /> 
            一般这个东西，推荐大家设置 5 ~ 10 组词，当然这些词必须要有代表性，而且不能太长。一般来说不应超过 874 个字符
    描述：<meta name="description" content="我每天都承受着这个年纪不应该有的帅气，我好累" />
          都是写 120 字 ~ 150 字，这段话尽量要流畅完整，并且能体现出当前网页的作用。

    搜索引擎索引方式：
        <meta name="robots" content="index,follow" />
        <!-- 
        all：文件将被检索，且页面上的链接可以被查询； 
        none：文件将不被检索，且页面上的链接不可以被查询； 
        index：文件将被检索； 
        follow：页面上的链接可以被查询； 
        noindex：文件将不被检索； 
        nofollow：页面上的链接不可以被查询。
        -->
  
  6.页面刷新及重定向
    <meta http-equiv="refresh" content="0;url=http://blog.csdn.net/mr_lp/article/details/53218696" />
    说明：content内的数字代表时间（秒），既多少时间后刷新。如果加url,则会重定向到指定网页（搜索引擎能够自动检测，也很容易被引擎视作误导而受到惩罚）

  7.Expires网页过期时间
    <meta http-equiv="Expires" content="Mon,12 May 2016 00:20:00 GMT" />
    说明：设定网页的到期时间，一旦过期则必须到服务器上重新调用。需要注意的是必须使用GMT时间格式，或直接设为0(不缓存)

  8.移动端的meta使用
    <meta name="viewport"
    content="
    height = [pixel_value | device-height] ,
    width = [pixel_value | device-width ] ,
    initial-scale = float_value ,
    minimum-scale = float_value ,
    maximum-scale = float_value ,
    user-scalable = [yes | no] ,
    target-densitydpi = [dpi_value | device-dpi | high-dpi | medium-dpi | low-dpi]
    "
    />

    属性说明：
        width——控制 viewport 的大小，可以指定的一个值或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。
        height——和 width 相对应，指定高度
        target-densitydpi——一个屏幕像素密度是由屏幕分辨率决定的，通常定义为每英寸点的数量（dpi）。Android支持三种屏幕像素密度：低像素密度，中像素密度，高像素密度。一个低像素密度的屏幕每英寸上的像素点更少，而一个高像素密度的屏幕每英寸上的像素点更多。Android Browser和WebView默认屏幕为中像素密度。
        
        下面是 target-densitydpi 属性的取值范围
        device-dpi: 使用设备原本的 dpi 作为目标 dp。 不会发生默认缩放。
        high-dpi: 使用hdpi 作为目标 dpi。 中等像素密度和低像素密度设备相应缩小。
        medium-dpi: 使用mdpi作为目标 dpi。 高像素密度设备相应放大， 像素密度设备相应缩小。 这是默认的target density.
        low-dpi: 使用mdpi作为目标 dpi。中等像素密度和高像素密度设备相应放大。
        <value>: 指定一个具体的dpi 值作为target dpi. 这个值的范围必须在70–400之间。
            
            <meta name="viewport" content="target-densitydpi=device-dpi" />
            <meta name="viewport" content="target-densitydpi=high-dpi" />
            <meta name="viewport" content="target-densitydpi=medium-dpi" />
            <meta name="viewport" content="target-densitydpi=low-dpi" />
            <meta name="viewport" content="target-densitydpi=200″ />
        
        为了防止Android Browser和WebView 根据不同屏幕的像素密度对你的页面进行缩放，你可以将viewport的target-densitydpi 设置为 device-dpi。
        当你这么做了，页面将不会缩放。相反，页面会根据当前屏幕的像素密度进行展示。
        在这种情形下，你还需要将viewport的width定义为与设备的width匹配，这样你的页面就可以和屏幕相适应。
        initial-scale——初始缩放。即页面初始缩放程度。这是一个浮点值，是页面大小的一个乘数。例如，如果你设置初始缩放为“1.0"，那么，web页面在展现的时候就会以target density分辨率的1:1来展现。如果你设置为“2.0"，那么这个页面就会放大为2倍。
        maximum-scale——最大缩放。即允许的最大缩放程度。这也是一个浮点值，用以指出页面大小与屏幕大小相比的最大乘数。例如，如果你将这个值设置为“2.0"，那么这个页面与target size相比，最多能放大2倍。
        user-scalable——用户调整缩放。即用户是否能改变页面缩放程度。如果设置为yes则是允许用户对其进行改变，反之为no。默认值是yes。如果你将其设置为no，那么minimum-scale 和 maximum-scale都将被忽略，因为根本不可能缩放。
        所有的缩放值都必须在0.01–10的范围之内。

        例1.设置屏幕宽度为设备宽度，禁止用户手动调整缩放

            <meta name=”viewport” content=”width=device-width,user-scalable=no” />

        例2.设置屏幕密度为高频，中频，低频自动缩放，禁止用户手动调整缩放

            <meta name=”viewport” content=”width=device-width,target-densitydpi=high-dpi,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no”/>

        如果和initial-scale=1同时使用user-scalable=no或maximum-scale=1，则用户将不能放大/缩小网页来看到全部的内容。
        而且，实际测试中发现，有些安卓系统自带的浏览器并不支持这一条规则，能够对页面进行放大，一旦放大响应的 box 也随之放大，导致页面出现错乱问题，解决方法：定义页面的最小宽度。
        body { 
            min-width: 320px; 
        }

    9.webapp全屏模式
      <meta name="apple-mobile-web-app-capable" content="yes" /> （伪装app，离线应用。）

      在启用全屏模式下设置  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      来设置导航栏的颜色 content的值：default  black  black-translucent

    10.添加主屏标题 （ios）
      <meta name="apple-mobile-web-app-title" content="标题">

    11.忽略数字自动识别为电话号码
      <meta content="telephone=no" name="format-detection" />

    12.忽略识别邮箱
      <meta content="email=no" name="format-detection" />

    13.添加智能 App 广告条 Smart App Banner （ios）
      <meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">

    14.其他
        <!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
        <meta name="HandheldFriendly" content="true">

        <!-- 微软的老式浏览器 -->
        <meta name="MobileOptimized" content="320">

        <!-- uc强制竖屏 -->
        <meta name="screen-orientation" content="portrait">

        <!-- QQ强制竖屏 -->
        <meta name="x5-orientation" content="portrait">

        <!-- UC强制全屏 -->
        <meta name="full-screen" content="yes">

        <!-- QQ强制全屏 -->
        <meta name="x5-fullscreen" content="true">

        <!-- UC应用模式 -->
        <meta name="browsermode" content="application">

        <!-- QQ应用模式 -->
        <meta name="x5-page-mode" content="app">

        <!-- windows phone 点击无高光 -->
        <meta name="msapplication-tap-highlight" content="no">
