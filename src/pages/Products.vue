<template>
    <div class="row">
      
      <div class="col-lg-3">

        <h1 class="my-4 title-tenant">
          <a href="#" @click.prevent="removeRestaurantSelected">
              <div class="restaurant-card-product" >
                  <img v-if="restaurant.image"
                    class="card-img-top"
                    :src="restaurant.image"
                    :alt="restaurant.name">
                  <img v-else
                    class="card-img-top"
                    src="@/assets/imgs/goomer-restaurant.png"
                    :alt="restaurant.name">
                <div class="product-card-body">
                  <p class="card-title">            
                    {{ restaurant.name }}
                  </p>
                  <p class="card-text">
                    {{ restaurant.address }} 
                  </p>
                  <div class="card-text">

                    <div class="card-text" v-if="schedule_data.monday.length > 0">
                      <label class="card-day">Segunda:
                        <label class="card-hora" v-for="(time, index) in schedule_data.monday" :key="index">
                          {{ time.open }} às {{time.close}}
                        </label>
                      </label>
                    </div>
                    

                    <div class="card-text" v-if="schedule_data.tuesday.length > 0">
                      <label class="card-day">Terça:
                        <label class="card-hora" v-for="(time, index) in schedule_data.tuesday" :key="index">
                          {{ time.open }} às {{time.close}}
                        </label>
                      </label>
                    </div>
                    

                    <div class="card-text" v-if="schedule_data.wednesday.length > 0">
                      <label class="card-day">Quarta:
                        <label class="card-hora" v-for="(time, index) in schedule_data.wednesday" :key="index">
                          {{ time.open }} às {{time.close}}
                        </label>
                      </label>
                    </div>
                    

                    <div class="card-text" v-if="schedule_data.thursday.length > 0">
                      <label class="card-day">Quinta:
                        <label class="card-hora" v-for="(time, index) in schedule_data.thursday" :key="index">
                          {{ time.open }} às {{time.close}}
                        </label>
                      </label>
                    </div>
                    

                    <div class="card-text" v-if="schedule_data.friday.length > 0">
                      <label class="card-day">Sexta:
                        <label class="card-hora" v-for="(time, index) in schedule_data.friday" :key="index">
                          {{ time.open }} às {{time.close}}
                        </label>
                      </label>
                    </div>
                    

                    <div class="card-text" v-if="schedule_data.saturday.length > 0">
                      <label class="card-day">Sábado:
                        <label class="card-hora" v-for="(time, index) in schedule_data.saturday" :key="index">
                          {{ time.open }} às {{time.close}}
                        </label>
                      </label>
                    </div>
                    

                    <div class="card-text" v-if="schedule_data.sunday.length > 0">
                      <label class="card-day">Domingo:
                        <label class="card-hora" v-for="(time, index) in schedule_data.sunday" :key="index">
                          {{ time.open }} às {{time.close}}
                        </label>
                      </label>
                    </div>
                    
                  </div>
                </div>
              </div>
            </a>
          </h1>
        <div class="list-group">
          <a href="#"
            :class="['list-group-item', categoryInFilter('')]"
            @click.prevent="filterByCategory('')">
            Todas
          </a>
          <a href="#"
            v-for="(category, index) in categories.products_categories" :key="index"
            :class="['list-group-item', categoryInFilter(category.id)]"
            @click.prevent="filterByCategory(category.id)">
            {{ category.name }}
          </a>
        </div>

      </div>
      <!-- /.col-lg-3 -->

      <div class="col-lg-9">

        <div class="landing-header-search">
          <input type="text" name="product_name" placeholder="Buscar no cardápio" ><a href="#" @click.prevent="goProduct(product)"><i class="fas fa-search"></i></a>
        </div>

        <div class="row my-4">

          <div v-if="restaurant.products.products.length === 0">
            Nenhum produto
          </div>

          <div class="col-lg-4 col-md-6 mb-4" v-for="(product, index) in restaurant.products.products" :key="index">
            <a href="#" @click.prevent="addProdCart(product)">
              <div :class="['restaurant-card', 'h-200', {'disabled' : productInCart(product)}]">
                <img v-if="product.image" 
                    class="card-img-top" 
                    :src="product.image" 
                    :alt="product.name">
                  <img v-else
                    class="card-img-top"
                    src="@/assets/imgs/prato-de-restaurante-vegetariano.png"
                    :alt="product.name">
                <div class="product-card-body">
                  <h4 class="card-title">
                    {{ product.name }}
                  </h4>
                  <p class="card-text">{{ product.description }}</p>
                  <div v-if="product.old_price == 0">
                    <h5 class="card-price" >R$ {{ product.price | formatprice }}</h5>
                  </div>
                  <div v-else>
                    <h5 class="card-old-price"> <s>R$ {{ product.old_price | formatprice }}</s></h5>
                    <h5 class="card-price" >R$ {{ product.price | formatprice }} </h5>
                  </div>
                </div>
              </div>
            </a>
          </div>
          

        </div>
        <!-- /.row -->

      </div>
      <!-- /.col-lg-9 -->

    </div>
    <!-- /.row -->
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  props: ['restaurants_id'],

  created() {
    if (this.restaurant.name === '') {
      return this.$router.push({name: 'home'})
    }

    this.getCategoriesByRestaurant(this.restaurant.id)
          .catch(response => this.$vToastify.error('Falha ao Carregar as Categorias', 'Erro'))

    this.loadProducts()

    this.schedule_data = JSON.parse(this.restaurant.schedule_data);
  },

  computed: {
    ...mapState({
      restaurant: state => state.restaurants.restaurantSelected,
      categories: state => state.restaurants.categoriesRestaurantSelected,
      productsCart: state => state.cart.products
    }),
  },

  data() {
    return {
      filters: {
        category: ''
      }
    }
  },

  methods: {
    ...mapActions([
      'getCategoriesByRestaurant',
      'getProductsByRestaurant'
    ]),

    ...mapMutations({
      addProdCart: 'ADD_PRODUCT_CART',
      removeRestaurant: 'REMOVE_RESTAURANT_SELECTED',
    }),

    loadProducts () {

      const params = {
        restaurants_id: this.restaurant.id,
      }

      if (this.filters.category) {
        params.category_id = this.filters.category
      }

      this.getProductsByRestaurant(params)
          .catch(response => this.$vToastify.error('Falha ao Carregar os Produtos', 'Erro'))        
    },

    filterByCategory (id) {
      this.filters.category = id

      this.loadProducts()
    },

    categoryInFilter (id) {
      return id === this.filters.category ? 'active' : ''
    },

    productInCart (product) {
      let inCart = false

      this.productsCart.map((prodCart, index) => {
        if (prodCart.id === product.id)
          inCart = true
      })

      return inCart
    },

    removeRestaurantSelected () {
      this.removeRestaurant()

      this.$router.push({name: 'home'})
    }
  },
}
</script>