<template>
    <div>
        <div class=" text-light" style="margin: 5px">
            Preço Total: <b>R$ {{ totalCart | formatprice }}</b>
        </div>
        <a href="#" class="btn btn-success" @click.prevent="openModalCheckout">Finalizar</a>

        <modal name="checkout">
            <div class="px-md-5 my-4" v-if="loading">
                <p>Gerando o pedido... (aguarde!)</p>
            </div>
            <div class="px-md-5 my-4" v-else>
                <div class="row">
                    <div class="col-12">
                        <p><strong>Total de produtos:</strong> {{ products.length }}</p>
                        <p><strong>Preço total:</strong> R$ {{ totalCart | formatprice }}</p>
                        <div class="form-group">
                            <textarea name="comment" v-model="comment" class="form-control" cols="30" rows="2" placeholder="Comentário (Opicional)"></textarea>
                        </div>
                        <button class="btn btn-info btn-full" @click.prevent="createOrder">Fazer Pedido</button>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            products: state => state.cart.products,
            restaurant: state => state.restaurants.restaurantSelected
        }),

        totalCart () {
            let total = 0

            this.products.map((itemCart, index) => {
                total += itemCart.qty * itemCart.product.price
            })

            return total
        },
    },


    data() {
        return {
            comment: '',
            loading: false
        }
    },
    
    methods: {
        openModalCheckout () {
            this.$modal.show('checkout')
        },

        closeModalCheckout () {
            this.$modal.hide('checkout')
        },
    }
}
</script>