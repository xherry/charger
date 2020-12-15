import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: () =>
        import ( /* webpackChunkName: "about" */ '../views/Home.vue'),
    redirect: { name: 'Selectlogin' }, // 跳转到下一级第一个
    children: [{
            path: 'Selectlogin',
            name: 'Selectlogin',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/Selectlogin.vue'),
        },
        {
            path: 'login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: login
        }, {
            path: 'index',
            name: 'index',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/index.vue'),
        }, {
            path: 'overview',
            name: 'overview',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/overview.vue')
        }, {
            path: 'setting',
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
        },
        {
            path: 'UserInformation',
            name: 'UserInformation',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/UserInformation.vue')
        },
        {
            path: 'UserAccount',
            name: 'UserAccount',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/UserAccount.vue'),
            redirect: { name: 'Creatusertype' }, // 跳转到下一级第一个
            children: [{
                    path: 'Createuser',
                    name: 'Createuser',
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../views/UserAccount/Createuser.vue')
                }, {
                    path: 'Creatusertype',
                    name: 'Creatusertype',
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../views/UserAccount/Creatusertype.vue')
                },
                {
                    path: 'UserRecords',
                    name: 'UserRecords',
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../views/UserAccount/UserRecords.vue')
                },
            ]
        },
        {
            path: 'ChargerControl',
            name: 'ChargerControl',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/ChargerControl.vue'),
            redirect: { name: 'Individual' }, // 跳转到下一级第一个
            children: [{
                path: 'Individual',
                name: 'Individual',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/ChargerControl/Individual.vue')
            }, {
                path: 'Centre',
                name: 'Centre',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/ChargerControl/Centre.vue')
            }, ]
        },
        {
            path: 'CentreInformation',
            name: 'CentreInformation',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/CentreInformation.vue'),
            redirect: { name: 'Summary' }, // 跳转到下一级第一个
            children: [{
                path: 'Summary',
                name: 'Summary',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/CentreInformation/Summary.vue')
            }, {
                path: 'Detailed',
                name: 'Detailed',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/CentreInformation/Detailed.vue')
            }, ]
        },
        {
            path: 'DataReport',
            name: 'DataReport',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/DataReport.vue'),
            redirect: { name: 'UptodateStatus' }, // 跳转到下一级第一个
            children: [{
                    path: 'dateStatus',
                    name: 'dateStatus',
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../views/DataReport/dateStatus.vue')
                }, {
                    path: 'dSReport',
                    name: 'dSReport',
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../views/DataReport/dSReport.vue')
                },
                {
                    path: 'UptodateStatus',
                    name: 'UptodateStatus',
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../views/DataReport/UptodateStatus.vue')
                },
            ]
        },
    ],
}]

const router = new VueRouter({
    routes
})

export default router