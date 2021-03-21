import axios from 'axios'
import { API_VERSION } from '@/configs/api'

const RESOURCE = 'restaurants'

export default {
    getRestaurants ({ commit }) {
        commit('SET_PRELOADER', true)
        commit('SET_TEXT_PRELOADER', 'Carregando os restaurantes')

        return axios.get(`${API_VERSION}/${RESOURCE}`)
                        .then(response => commit('SET_RESTAURANTS', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
    },

    getRestaurantByToken ({commit}, restaurants_id) {
        commit('SET_PRELOADER', true)
        commit('SET_TEXT_PRELOADER', 'Carregando o restaurante')

        return axios.get(`${API_VERSION}/${RESOURCE}/${restaurants_id}`)
                        .then(response => commit('SET_RESTAURANT_SELECTED', response.data.restaurant))
                        .finally(() => commit('SET_PRELOADER', false))
    },

    getCategoriesByRestaurant ({ commit }, restaurants_id) {
        commit('SET_PRELOADER', true)
        commit('SET_TEXT_PRELOADER', 'Carregando as categorias')

        return axios.get(`${API_VERSION}/${RESOURCE}/${restaurants_id}/categories`)
                        .then(response => commit('SET_CATEGORIES_RESTAURANT', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
    },

    getProductsByRestaurant ({ commit }, params) {
        commit('SET_PRELOADER', true)
        commit('SET_TEXT_PRELOADER', 'Carregando os produtos')
        commit('SET_PRODUCTS_RESTAURANT', {data: []})
        
        return axios.get(`${API_VERSION}/${RESOURCE}/${params.restaurants_id}/products`, { params })
                        .then(response => commit('SET_PRODUCTS_RESTAURANT', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
    },
}