CSS代码：
.text-gradient {  
    display: inline-block;
    color: green;
    font-size: 10em;
    font-family: '微软雅黑';
    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(0, 128, 0, 1)), to(rgba(51, 51, 51, 1)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
};
HTML代码：
<h2 class="text-gradient">天赐美妞</h2>
