import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Cart from '@/pages/Cart';
import PageNotFound from '@/pages/PageNotFound';

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/DefaultTemplate'),
        children: [
            
            {
                path: '/carrinho',
                component: Cart,
                name: 'cart',
                meta: {
                    title: 'Carrinho de Compras'
                }
            },
        
            {
                path: '/loja/:restaurants_id',
                component: Products,
                name: 'products',
                props: true,
                meta: {
                    title: 'Produtos'
                }
            },
        
            {
                path: '/',
                component: Home,
                name: 'home',
                meta: {
                    title: 'Home Goomer Restaurantes'
                }
            },
        ]
    },

    {
        path: '*',
        component: PageNotFound,
        meta: {
            title: 'Página não encontrada'
        }
    }
]

export default routes