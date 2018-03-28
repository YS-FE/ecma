
/**
 * 类装饰器
 * 
 * @param {Person} target 
 */
function bye(target){
    // console.log(target);
    target.prototype.sayBye = function(){
        console.log("Bye !");
    };
}


/**
 * 方法的装饰器
 * 
 * @param {Person} target 
 * @param {sayHello} name 
 * @param {desc} description 
 */
function readonly(target, name, description){
    let prev = description.value;
    description.value = function(message){
        console.log(message);
    }
    description.writable = false;
}



/**
 * 高阶函数,可以进行自定义传参
 * 校验参数类型
 * @param {String} type 
 */
function typecheck(type){
    return function(target, name, description){
        let prevFun = description.value;

        description.value = function(cur){
            if (typeof cur !== type ){
                console.error("参数类型错误必须为" + type + "类型");
                return;
            }
            prevFun.call(this, cur);
        }
    }
}



@bye
class Person {
    constructor(name){
        this.name = name;
    }

    @readonly
    sayHello(){
        console.log("hello");
    }

    @typecheck('number')
    setAge(age){
        this.age = age;
    }
}

let one = new Person('lisi');

/**
 *不可修改 
one.sayHello = function(){
    console.log("hehe");
}
 */

one.sayHello("how are you!");
one.sayBye();
one.setAge("20");