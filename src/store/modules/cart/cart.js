export default {

    state: {
        products: [],
    },

    mutations: {
        ADD_PRODUCT_CART (state, product) {
            state.products.push({
                qty: 1,
                id: product.id,
                product,
            })
        },

        REMOVE_PROD_CART (state, product) {
            state.products = state.products.filter((prodCart, index) => {
                return prodCart.id !== product.id
            })
        },

        INCREMENT_QTY_PROD_CART (state, product) {
            state.products = state.products.map((prodCart, index) => {
                if (prodCart.id === product.id) {
                    state.products[index].qty++
                }

                return state.products[index]
            })
        },

        DECREMENT_QTY_PROD_CART (state, product) {
            state.products = state.products.filter((prodCart, index) => {
                if (prodCart.id === product.id) {
                    state.products[index].qty = state.products[index].qty - 1
                }

                if (state.products[index].qty > 0)
                    return state.products[index]
            })
        },

        CLEAR_CART (state) {
            state.products = []
        },
    },
}