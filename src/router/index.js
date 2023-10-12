import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/autenticacao/LoginView'
import LoginOrganizacaoView from '@/views/autenticacao/LoginOrganizacaoView'
import CadastroOrganizacaoView from '@/views/prospeccao/CadastroOrganizacaoView'
import CadastroProcessoView from '@/views/prospeccao/CadastroProcessoView'
import CadastroAcaoVoluntariadoView from '@/views/acoes-sociais/CadastroAcaoVoluntariadoView'
import CadastroAcaoIspView from '@/views/acoes-sociais/CadastroAcaoIspView'
import CadastroAcompanhamentoAcaoView from '@/views/acompanhamento/CadastroAcompanhamentoAcaoView'
import FormularioDoacaoView from '@/views/acoes-sociais/FormularioDoacaoView'
import ListagemProcessosView from '@/views/acoes-sociais/ListagemProcessosView'

import NotFoundView from '@/views/NotFoundView'

const routes = [
    {
        path: '/colaborador/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/organizacao/login',
        name: 'LoginOrganizacao',
        component: LoginOrganizacaoView
    },
    {
        path: '/organizacoes/cadastrar',
        name: 'CadastroOrganizacao',
        component: CadastroOrganizacaoView
    },
    {
        path: '/organizacoes/processo',
        name: 'CadastroProcesso',
        component: CadastroProcessoView
    },
    {
        path: '/acoes/voluntariado',
        name: 'CadastroAcaoVoluntariado',
        component: CadastroAcaoVoluntariadoView
    },
    {
        path: '/acoes/isp',
        name: 'CadastroAcaoIsp',
        component: CadastroAcaoIspView
    },
    {
        path: '/acompanhamentos/novo',
        name: 'CadastroAcompanhamentoAcao',
        component: CadastroAcompanhamentoAcaoView
    },
    {
        path: '/doacoes/:id',
        name: 'Doacao',
        component: FormularioDoacaoView
    },
    {
        path: '/processos',
        name: 'ListagemProcessos',
        component: ListagemProcessosView
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
