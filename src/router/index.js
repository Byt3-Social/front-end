import { createRouter, createWebHistory } from 'vue-router'

import ColaboradorLoginView from '@/views/autenticacao/ColaboradorLoginView'
import OrganizacaoLoginView from '@/views/autenticacao/OrganizacaoLoginView'

import CadastrarOrganizacaoView from '@/views/prospeccao/CadastrarOrganizacaoView'
import ListarOrganizacoesView from '@/views/prospeccao/ListarOrganizacoesView'
import EditarOrganizacaoView from '@/views/prospeccao/EditarOrganizacaoView'

import ListarProcessosView from '@/views/compliance/ListarProcessosView'
import VisualizarProcessoView from '@/views/compliance/VisualizarProcessoView'

import ListarAcoesVoluntariadoView from '@/views/acoes-sociais/ListarAcoesVoluntariadoView'
import EditarAcaoVoluntariadoView from '@/views/acoes-sociais/EditarAcaoVoluntariadoView'
import CadastrarAcaoVoluntariadoView from '@/views/acoes-sociais/CadastrarAcaoVoluntariadoView'
import VisualizarDoacaoView from '@/views/acoes-sociais/VisualizarDoacaoView'
import ListarAcoesIspView from '@/views/acoes-sociais/ListarAcoesIspView'
import EditarAcaoIspView from '@/views/acoes-sociais/EditarAcaoIspView'
import CadastrarAcaoIspView from '@/views/acoes-sociais/CadastrarAcaoIspView'
import DoarView from '@/views/acoes-sociais/DoarView'

import ListarAcompanhamentosView from '@/views/acompanhamento/ListarAcompanhamentosView'
import CadastrarAcompanhamentoView from '@/views/acompanhamento/CadastrarAcompanhamentoView'
import VisualizarAcompanhamentoView from '@/views/acompanhamento/VisualizarAcompanhamentoView'

import ColaboradorHomeView from '@/views/colaborador/ColaboradorHomeView'

import OrganizacaoHomeView from '@/views/organizacao/OrganizacaoHomeView'

import NotFoundView from '@/views/NotFoundView'

const routes = [
    /* Login */
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
    /* Prospecção */
    {
        path: '/admin/organizacoes/cadastrar',
        name: 'CadastrarOrganizacao',
        component: CadastrarOrganizacaoView
    },
    {
        path: '/admin/organizacoes',
        name: 'ListarOrganizacoes',
        component: ListarOrganizacoesView,
    },
    {
        path: '/admin/organizacoes/:id',
        name: 'EditarOrganizacao',
        component: EditarOrganizacaoView
    },
    /* Compliance */
    {
        path: '/admin/processos',
        name: 'ListarProcessos',
        component: ListarProcessosView
    },
    {
        path: '/admin/processos/:id',
        name: 'VisualizarProcesso',
        component: VisualizarProcessoView
    },
    /* Ações sociais */
    {
        path: '/admin/acoes/voluntariado',
        name: 'ListarAcoesVoluntariado',
        component: ListarAcoesVoluntariadoView
    },
    {
        path: '/admin/acoes/voluntariado/cadastrar',
        name: 'CadastrarAcaoVoluntariado',
        component: CadastrarAcaoVoluntariadoView
    },
    {
        path: '/admin/acoes/voluntariado/:id',
        name: 'EditarAcaoVoluntariado',
        component: EditarAcaoVoluntariadoView
    },
    {
        path: '/admin/acoes/voluntariado/doacoes/:id',
        name: 'VisualizarDoacao',
        component: VisualizarDoacaoView
    },
    {
        path: '/admin/acoes/isp',
        name: 'ListarAcoesIsp',
        component: ListarAcoesIspView
    },
    {
        path: '/admin/acoes/isp/:id',
        name: 'EditarAcaoIsp',
        component: EditarAcaoIspView
    },
    {
        path: '/admin/acoes/isp/cadastrar',
        name: 'CadastrarAcaoIsp',
        component: CadastrarAcaoIspView
    },
    {
        path: '/employee/doacoes/:id',
        name: 'Doar',
        component: DoarView
    },
    /* Acompanhamento */
    {
        path: '/admin/acompanhamentos',
        name: 'ListarAcompanhamentos',
        component: ListarAcompanhamentosView
    },
    {
        path: '/admin/acompanhamentos/solicitar',
        name: 'CadastrarAcompanhamento',
        component: CadastrarAcompanhamentoView
    },
    {
        path: '/admin/acompanhamentos/:id',
        name: 'VisualizarAcompanhamento',
        component: VisualizarAcompanhamentoView
    },

    /* Colaborador */
    {
        path: '/colaborador',
        name: 'ColaboradorHome',
        component: ColaboradorHomeView
    },
    /* Organização */
    {
        path: '/organizacao',
        name: 'OrganizacaoHome',
        component: OrganizacaoHomeView
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
