import Pay from "./Pay"

const obj = {}

obj.install = function (Vue) {

    //1、创建组件构造器
    const payConstructor = Vue.extend(Pay);

    //2、new的方式，根据组件构造器，可以创建出来一个组件对象
    const pay = new payConstructor();

    //3、将组件对象，手动挂载到某一个元素上
    pay.$mount(document.createElement('div'))

    //4、pay.$el对应的就是div
    document.body.appendChild(pay.$el);

    Vue.prototype.$pay = pay;
}

export default obj