
var EventEmitter = process.EventEmitter
  , MyClass = function (){};

MyClass.prototype.__proto__ = EventEmitter.prototype;

var a = new MyClass;
a.on('some event', function () {
  // do something
});
