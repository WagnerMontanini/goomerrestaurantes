export default {
    SET_RESTAURANTS (state, restaurants) {
        state.items = restaurants
    },

    SET_RESTAURANT_SELECTED (state, restaurants) {
        state.restaurantSelected = Object.assign(state.restaurantSelected, restaurants)
    },

    REMOVE_RESTAURANT_SELECTED (state) {
        state.restaurantSelected = {
            name: '',
            products: {
                data: []
            },
        },
    
        state.categoriesRestaurantSelected = {
            data: []
        }
    },

    SET_CATEGORIES_RESTAURANT (state, categories) {
        state.categoriesRestaurantSelected = categories
    },

    SET_PRODUCTS_RESTAURANT (state, products) {
        state.restaurantSelected.products = products
    },

}