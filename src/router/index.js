import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue';

Vue.use(VueRouter)

const routes = [{
        path: '/Home',
        name: 'Home',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Home.vue'),
        redirect: { name: 'index' }, // 跳转到下一级第一个
        children: [{
            path: '/index',
            name: 'index',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/index.vue'),
        }, {
            path: '/overview',
            name: 'overview',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/overview.vue')
        }, {
            path: '/setting',
            name: 'setting',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/setting.vue'),
            redirect: { name: 'Department' }, // 跳转到下一级第一个
            children: [{
                    path: 'Department',
                    name: 'Department',
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../views/setting/Department.vue')
                }, {
                    path: 'ElectricVehicle',
                    name: 'ElectricVehicle',
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../views/setting/ElectricVehicle.vue')
                },
                {
                    path: 'Charger',
                    name: 'Charger',
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../views/setting/Charger.vue')
                },
                {
                    path: 'Numbering',
                    name: 'Numbering',
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../views/setting/Numbering.vue')
                },
                {
                    path: 'Number',
                    name: 'Number',
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../views/setting/Number.vue')
                },
                {
                    path: 'chargerDetails',
                    name: 'chargerDetails',
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../views/setting/chargerDetails.vue')
                },
            ]
        }, ]
    },
    {
        path: '/',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: login
    }
]

const router = new VueRouter({
    routes
})

export default router