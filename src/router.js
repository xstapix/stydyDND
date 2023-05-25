import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: () =>
				import ('./components/folders.vue'),
			alias: '/'
		},
		{
			path: '/folder/:folder_name/',
			component: () =>
				import ('./pages/detailFolder/detailFolder.vue')
		},
	]
})