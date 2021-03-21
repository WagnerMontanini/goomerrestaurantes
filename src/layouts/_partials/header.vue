<template>
    <header>
        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-vue">
            <div class="container">
                <router-link :to="{name: 'home'}" class="navbar-brand">
                    <span class="navbar-brand mb-0 h1" style="font-family: 'Montserrat', sans-serif;">Lista Rango</span>
                </router-link>
                <div>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <router-link :to="{name: 'cart'}" class="nav-link">
                                <i class="fas fa-shopping-cart"></i> 
                                <!-- ({{ productsCart.length }}) -->
                            </router-link>   
                        </li>
                        <li class="nav-item">
                        
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
  </header>
</template>
