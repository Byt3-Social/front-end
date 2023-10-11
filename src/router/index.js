import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/autenticacao/LoginView'
import CadastroOrganizacaoView from '@/views/prospeccao/CadastroOrganizacaoView'
import OrganizacaoView from '@/views/compliance/OrganizacaoView.vue'
import HomeView from '@/views/autenticacao/HomeView.vue'

import NotFoundView from '@/views/NotFoundView'

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/organizacoes/cadastrar',
        name: 'CadastroOrganizacao',
        component: CadastroOrganizacaoView
    },
    {
        path: '/organizacao',
        name: 'OrganizacaoView',
        component: OrganizacaoView
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFoundView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
