<template>
    <div class="row">

      <div class="col-lg-12">

        <h1 class="my-4 title-tenant">Bem-vindo ao Lista Rango</h1>

        <div class="landing-header-search">
          <input type="text" name="restaurant_name" placeholder="Buscar estabelecimento" ><a href="#" @click.prevent="goRestaurant(restaurants)"><i class="fas fa-search"></i></a>
        </div>

        <div class="row my-4">
          
          <div class="col-lg-4 col-md-6 mb-4" v-for="(restaurants, index) in restaurants.restaurants" :key="index">
            <div v-if="restaurants.is_accepted != 0">
              <a href="#" @click.prevent="goStoreRestaurants(restaurants)">
                <div class="restaurant-card" >
                    <img v-if="restaurants.image"
                      class="card-img-top"
                      :src="restaurants.image"
                      :alt="restaurants.name">
                    <img v-else
                      class="card-img-top"
                      src="@/assets/imgs/goomer-restaurant.png"
                      :alt="restaurants.name">
                  <div class="restaurant-card-body">            
                    {{ restaurants.name }}
                  </div>
                  <div class="restaurant-card-address">
                    {{ restaurants.address }} 
                  </div>
                </div>
              </a>
            </div>
            <div v-else>
              <div class="restaurant-card-close-text">
                  FECHADO
              </div>
              <div class="restaurant-card-close" >
                <img v-if="restaurants.image"
                    class="card-img-top-close"
                    :src="restaurants.image"
                    :alt="restaurants.name">
                  <img v-else
                    class="card-img-top-close"
                    src="@/assets/imgs/goomer-restaurant.png"
                    :alt="restaurants.name">
                  <div class="restaurant-card-body">            
                    {{ restaurants.name }}
                  </div>
                  <div class="restaurant-card-address">
                    {{ restaurants.address }} 
                  </div>
              </div>
            </div>
          </div>

        </div>
        <!-- /.row -->

      </div>
      <!-- /.col-lg-9 -->

    </div>
    <!-- /.row -->
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  mounted() {
    if (this.restaurants.name) {
      return this.$router.push({
        name: 'products',
        params: {
          restaurants_id: this.restaurants.id
        }
      })
    }

    this.getRestaurants()
          .catch(response => this.$vToastify.error('Falha ao Carregar Restaurantes', 'Erro'))
  },

  computed: {
    ...mapState({
      restaurants: state => state.restaurants.items,
      restaurant: state => state.restaurants.restaurantsSelected,
    })
  },

  methods: {
    ...mapActions([
      'getRestaurants'
    ]),

    ...mapMutations({
      setRestaurants: 'SET_RESTAURANT_SELECTED'
    }),

    goStoreRestaurants (restaurants) {
      this.setRestaurants(restaurants)

      this.$router.push({ name: 'products', params: { restaurants_id:restaurants.id  } })
    }
  }
}
</script>