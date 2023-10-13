import { createRouter, createWebHistory } from 'vue-router'

import ColaboradorLoginView from '@/views/autenticacao/ColaboradorLoginView'
import OrganizacaoLoginView from '@/views/autenticacao/OrganizacaoLoginView'

import CadastrarOrganizacaoView from '@/views/prospeccao/CadastrarOrganizacaoView'
import ListarOrganizacoesView from '@/views/prospeccao/ListarOrganizacoesView'
import EditarOrganizacaoView from '@/views/prospeccao/EditarOrganizacaoView'

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
        name: 'ColaboradorLogin',
        component: ColaboradorLoginView
    },
    {
        path: '/organizacao/login',
        name: 'OrganizacaoLogin',
        component: OrganizacaoLoginView
    },
    {
        path: '/colaborador/organizacoes/cadastrar',
        name: 'CadastrarOrganizacao',
        component: CadastrarOrganizacaoView
    },
    {
        path: '/colaborador/organizacoes',
        name: 'ListarOrganizacoes',
        component: ListarOrganizacoesView,
    },
    {
        path: '/colaborador/organizacoes/:id',
        name: 'EditarOrganizacao',
        component: EditarOrganizacaoView
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
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    },
})

export default router
