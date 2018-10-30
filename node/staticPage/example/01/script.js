function getEvent(e){
  return window.event || e;
}
function getTarget(e) {
  return e.target || e.srcElement;
}
// offsetWidht 获取的是 width + padding + border

function getStyle(obj,attr){
  return getComputedStyle ? getComputedStyle(obj,false)[attr] : obj.currentStyle[attr];
}
function getScroll() {
  return {
    top: document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
    left: document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft,
  }
}

var option = {
  target: {},
  create: {},
  index: null,
  list: []
};

var $id = function(id) {
  return document.getElementById(id);
};

var drag = $id('drag');
var inner = $id('inner');
var div = $id('div');

drag.addEventListener('click', function(e) {
  div.style.top = drag.offsetTop + 'px';
});

for (var j = 0; j< drag.children.length; j++) {
  drag.children[j].addEventListener('dragstart', function(e) {
    e.stopPropagation();
    var ev = getEvent(e);
    option.target.height = this.clientHeight;
    option.target.width = this.clientWidth;

    ev.dataTransfer.setData("Text" , 'height-30');
  });
}


// 源对象
drag.addEventListener('dragstart', function(e) {
  var ev = getEvent(e);
  console.log('111111111111');
  ev.dataTransfer.setData("Text", ev.target.id);
});

// 移动时
drag.addEventListener('drag', function(e) {
  var ev = getEvent(e);
  option.target.height = ev.target.clientHeight;
  option.target.width = ev.target.clientWidth;
});

// 释放时
drag.addEventListener('dragend', function(ev) {
  option.target.top = ev.target.offsetTop;
  option.target.left = ev.target.offsetLeft;
});


var createDiv = function(option) {
  var div = document.createElement('div');
  div.style.width = option.width + 'px';
  div.style.height = option.height + 'px';
  div.style.backgroundColor = '#ddd';
  div.style.borderWidth = '1px';
  div.style.borderColor = 'red';
  div.style.borderStyle = 'dashed';
  div.setAttribute("class","box");
  return div;
};




function init () {
  var child = inner.getElementsByClassName('list');
  for (var i = 0; i< child.length; i++) {
    option.list.push({
      width: child[i].clientWidth,
      height: child[i].clientHeight,
      top: child[i].pageY,
      left: child[i].pageX,
    });

  }
}
init();



// 目标对象
// 进入
inner.addEventListener('dragenter', function(ev) {
  var div = createDiv(option.target);
  var box = document.getElementsByClassName('box');
  if(ev.target.className === 'box' || ev.target === this) {
    return
  }
  if(box.length > 0) {
    inner.removeChild(box[0]);
  }
  if(ev.target !== this) {
    if(ev.target.previousElementSibling && ev.target.previousElementSibling.className !== 'box' || !ev.target.previousElementSibling) {
      inner.insertBefore(div, ev.target)
    }
  }
});

// 释放
inner.addEventListener('drop', function(ev) {
  ev.preventDefault();
  var data=ev.dataTransfer.getData("Text");
  var targetBox = inner.getElementsByClassName('box')[0];
  var index = null;
  for(var i = 0; i < inner.children.length; i++) {
    if(inner.children[i].className === 'box') {
      index = i;
    }
  }
  if(index !== null && index > -1 ) {
    inner.removeChild(targetBox)
  }
  if(index === null) {
    return
  }

  inner.insertBefore(document.getElementsByClassName(data)[0], inner.children[index]);
});
// 离开
inner.addEventListener('dragleave', function(ev) {
  console.log('dragleave', ev.target.className);
});


var dragover = function(ev) {
  ev.preventDefault();
  $id('show').innerText = getMousePos(ev).x + ',' + getMousePos(ev).y;
}
// 结束
inner.addEventListener('dragover', dragover);

function move() {
  console.log('ffffffffffffffffffff')
}
document.body.addEventListener('mousemove', _.debounce(move, 1000));
//  _.throttle(move, 1000);   节流
//  _.debounce(move, 1000);   空闲执行


function throttle(method, delay, time) {
  var timeout,startTime = new Date();
  return function() {
    var context = this,
      args = arguments,
      curTime = new Date();
    clearTimeout(timeout);
    // 如果达到了规定的触发时间间隔，触发 handler
    if (curTime - startTime >= time) {
      method.apply(context, args);
      startTime = curTime;
      // 没达到触发间隔，重新设定定时器
    } else {
      timeout = setTimeout(method, delay);
    }
  };
};
function getMousePos(event) {
  var e = event || window.event;
  var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
  var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  var x = e.pageX || e.clientX + scrollX;
  var y = e.pageY || e.clientY + scrollY;
  //alert('x: ' + x + '\ny: ' + y);
  return { 'x': x, 'y': y };
}