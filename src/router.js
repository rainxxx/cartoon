import Vue from 'vue'
import Router from 'vue-router'
import CartoonList from './components/module/CartoonList'
import CartoonEdit from './components/module/CartoonEdit'


Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{path: '/cartoonList', component: CartoonList},
		{path: '/cartoonEdit', component: CartoonEdit}
	]
})