Function.prototype.myBind = function (context) {
  if (typeof context === 'undefined' || context === null) {
    context = window
  }
  self = this
  return function (...args) {
    return self.apply(context, args)
  }
}


var foo = {
  value: 1
};

function bar(name, age) {
  console.log(1,this.value);
  console.log(2,name);
  console.log(3,age);

}

var bindFoo = bar.myBind(foo, 'daisy');
bindFoo('daisy_2','18');
// 1
// daisy
// 18








var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin