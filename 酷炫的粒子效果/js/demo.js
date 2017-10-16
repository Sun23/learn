var container = document.getElementById("container"),
    x = 0,
    vy = -2,
    par = [],
    hue = 0;

var c = document.createElement("canvas");
c.width = 300;
c.height = 100;
c.id = "js-canvas";

container.appendChild(c);

var ctx = c.getContext("2d");

ctx.fillRect(0, 40, x, 20);

window.requestAnimationFrame(move);

function move() {
    
        ctx.clearRect(0, 0, c.width, c.height);
        x += 2;
        ctx.fillRect(0, 40, x, 20);
        hue = (x > 300) ? 0 : hue;  
        x = (x > 310) ? 0 : x;
        ctx.fillStyle = "hsla(" + hue++ + ", 100%, 40%, 1)";

        par.push({
            //用数组模拟队列
            px: x - 5,
            py: 50,
            pvy: vy,
            pcolor: "hsla(" + (hue + 30) + ", 100%, 70%, 1)"
        });
    
        var n = par.length;
        while (n--) {
            //切记要随机差异化粒子y轴速度，否则就变成一根抛物线了
            par[n].pvy += (Math.random() + 0.1) / 5;
            par[n].py += par[n].pvy;
            if (par[n].py > c.height) {
                par.splice(n, 1); //掉到画布之外了，清除该粒子
                continue;
            }
            ctx.fillStyle = par[n].pcolor;
            ctx.fillRect(par[n].px, par[n].py, 5, 5);
        }

        window.requestAnimationFrame(move);
}
