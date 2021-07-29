import {
    ADD_COUNTER,
    ADD_TO_CART,
} from './mutation-types.js'

export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            //查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

            if (oldProduct) {
                // oldProduct.count++;
                context.commit(ADD_COUNTER, oldProduct);
                resolve('当前商品数量+1')
            } else {
                payload.count = 1;
                // context.state.cartList.push(payload);
                context.commit(ADD_TO_CART, payload);
                resolve('添加了新的商品')
            }
        })
    }
}