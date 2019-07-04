var Snow = {
    wrap : document.createElement('div'),
    offset : 0,
    createSnowOffset : 0,
    clientWidth : document.body.clientWidth,
    createSnow : function(){
        var _this = this;
        setInterval(function(){
            var snowFlake = document.createElement('div');
            var size = parseInt(Math.random() * 5) + 4;
    
            snowFlake.style.position = 'fixed';
            snowFlake.style.top = -size + 'px';
            snowFlake.style.left = parseInt(Math.random() * _this.clientWidth) +_this.createSnowOffset+ 'px';
            snowFlake.style.width = size + 'px';
            snowFlake.style.height = size + 'px';
            // borderRadius 设置圆角
            snowFlake.style.borderRadius = '100%';
            snowFlake.style.background = '#fff';
            snowFlake.style.zIndex = '99999';
    
            _this.wrap.appendChild(snowFlake);
            _this.move(snowFlake,Math.random() * 1.5 -1);
        },parseInt(Math.random() * 500) +500);
    },
    move : function(ele,thisOffset){
        var _this = this;
        // setInterval() 定时循环
        var timer = setInterval(function(){
            // parseFloat 解析一个字符串，并返回一个浮点数 （偏移量为 1）
            ele.style.top = parseFloat(ele.style.top)+ 1 + 'px';

            ele.style.left = parseFloat(ele.style.left)+ _this.offset + thisOffset + 'px';
            
            // 当雪超出屏幕高度时 就用 removeChild() 删除，并用 clearInterval()关闭定时器
            if(parseInt(ele.style.top) > screen.height){
                _this.wrap.removeChild(ele);
                clearInterval(timer);

            }

        },parseInt(Math.random() * 15)+ 30); //Math.random() 返回介于 0（包含） ~ 1（不包含） 之间的一个随机数

    },
    init : function(){

        document.body.appendChild(this.wrap);

        var _this = this;
        // 当浏览器窗口大小发生改变时，重新赋值 clientWidth
        window.addEventListener('resize',function(){
            _this.clientWidth = document.body.clientWidth;
        })

        // 添加 鼠标移动监听事件
        window.addEventListener('mousemove',function(e){
            // e.clientX 是当前光标所在的 X坐标 ；e.clientX 除以窗口的宽度 ，得到对应小数
            // 这样 坐标的值就会在 0-1 范围中
            var xPos = e.clientX / _this.clientWidth;
            
            // 当坐标值为负数时就会向左偏移，正为右
            // 判断在那个范围内 乘以不同的倍数，赋予偏移量
            _this.offset = (xPos - 0.5) * (xPos > 0.35 && xPos < 0.65 ? 6 : 8);

            if(xPos >0.35 && xPos <0.65){
                createSnowOffset = 0;
                return;
            }
            _this.createSnowOffset = (xPos - 0.5 > 0 ? -_this.clientWidth * 0.4 : _this.clientWidth *0.4);
        });

        this.createSnow();
    }
}



    





Snow.init();




/*  不推荐使用 onmousemove  因为他会覆盖掉window 中所有的mousemove事件
window.onmousemove = function(e){
    console.log(2);
} */

