import { createRouter, createWebHistory } from 'vue-router'
import decode from 'jwt-decode';
import axios from 'axios';

import ColaboradorLoginView from '@/views/autenticacao/ColaboradorLoginView'
import OrganizacaoLoginView from '@/views/autenticacao/OrganizacaoLoginView'

import CadastrarOrganizacaoView from '@/views/prospeccao/CadastrarOrganizacaoView'
import ListarOrganizacoesView from '@/views/prospeccao/ListarOrganizacoesView'
import EditarOrganizacaoView from '@/views/prospeccao/EditarOrganizacaoView'
import ListarIndicacoesView from '@/views/prospeccao/ListarIndicacoesView'
import EditarIndicacaoView from '@/views/prospeccao/EditarIndicacaoView'

import ListarProcessosView from '@/views/compliance/ListarProcessosView'
import VisualizarProcessoView from '@/views/compliance/VisualizarProcessoView'

import ListarAcoesVoluntariadoView from '@/views/acoes-sociais/ListarAcoesVoluntariadoView'
import EditarAcaoVoluntariadoView from '@/views/acoes-sociais/EditarAcaoVoluntariadoView'
import CadastrarAcaoVoluntariadoView from '@/views/acoes-sociais/CadastrarAcaoVoluntariadoView'
import VisualizarDoacaoView from '@/views/acoes-sociais/VisualizarDoacaoView'
import ListarAcoesIspView from '@/views/acoes-sociais/ListarAcoesIspView'
import EditarAcaoIspView from '@/views/acoes-sociais/EditarAcaoIspView'
import CadastrarAcaoIspView from '@/views/acoes-sociais/CadastrarAcaoIspView'

import ListarAcompanhamentosView from '@/views/acompanhamento/ListarAcompanhamentosView'
import CadastrarAcompanhamentoView from '@/views/acompanhamento/CadastrarAcompanhamentoView'
import VisualizarAcompanhamentoView from '@/views/acompanhamento/VisualizarAcompanhamentoView'

import ColaboradorHomeView from '@/views/colaborador/ColaboradorHomeView'
import DoarView from '@/views/colaborador/DoarView'
import HubAcoesView from '@/views/colaborador/HubAcoesView'
import AcaoView from '@/views/colaborador/AcaoView'
import IndicarOrganizacaoView from '@/views/colaborador/IndicarOrganizacaoView'

import OrganizacaoHomeView from '@/views/organizacao/OrganizacaoHomeView'
import PreencherAcompanhamentoView from '@/views/organizacao/PreencherAcompanhamentoView'
import AgendarReuniaoView from '@/views/organizacao/AgendarReuniaoView'
import PreencherProcessoView from '@/views/organizacao/PreencherProcessoView'
import ConcluirIndicacaoView from '@/views/organizacao/ConcluirIndicacaoView'

import NotFoundView from '@/views/NotFoundView'

const routes = [
    /* Login */
    {
        path: '/colaborador/login',
        name: 'ColaboradorLogin',
        component: ColaboradorLoginView,
        meta: {
            title: "B3 Social | Login"
        }
    },
    {
        path: '/organizacao/login',
        name: 'OrganizacaoLogin',
        component: OrganizacaoLoginView,
        meta: {
            title: "B3 Social | Login"
        }
    },
    /* Prospecção */
    {
        path: '/admin/organizacoes/cadastrar',
        name: 'CadastrarOrganizacao',
        component: CadastrarOrganizacaoView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Cadastrar Organização"
        }
    },
    {
        path: '/admin/organizacoes',
        name: 'ListarOrganizacoes',
        component: ListarOrganizacoesView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Organizações"
        }
    },
    {
        path: '/admin/organizacoes/:id',
        name: 'EditarOrganizacao',
        component: EditarOrganizacaoView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Editar Organização"
        }
    },
    {
        path: '/admin/indicacoes',
        name: 'ListarIndicacoes',
        component: ListarIndicacoesView,
        meta: {
            title: "B3 Social | Indicações"
        }
    },
    {
        path: '/admin/indicacoes/:id',
        name: 'EditarIndicacao',
        component: EditarIndicacaoView,
        meta: {
            title: "B3 Social | Editar Indicação"
        }
    },
    {
        path: '/organizacao/indicacoes/:id/concluir',
        name: 'ConcluirIndicacao',
        component: ConcluirIndicacaoView,
        meta: {
            title: "B3 Social | Concluir Indicação"
        }
    },
    /* Compliance */
    {
        path: '/admin/processos',
        name: 'ListarProcessos',
        component: ListarProcessosView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Processos"
        }
    },
    {
        path: '/admin/processos/:id',
        name: 'VisualizarProcesso',
        component: VisualizarProcessoView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Visualizar Processo"
        }
    },
    /* Ações sociais */
    {
        path: '/admin/acoes/voluntariado',
        name: 'ListarAcoesVoluntariado',
        component: ListarAcoesVoluntariadoView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Ações de Voluntariado"
        }
    },
    {
        path: '/admin/acoes/voluntariado/cadastrar',
        name: 'CadastrarAcaoVoluntariado',
        component: CadastrarAcaoVoluntariadoView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Cadastrar Ação de Voluntariado"
        }
    },
    {
        path: '/admin/acoes/voluntariado/:id',
        name: 'EditarAcaoVoluntariado',
        component: EditarAcaoVoluntariadoView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Editar Ação de Voluntariado"
        }
    },
    {
        path: '/admin/acoes/voluntariado/doacoes/:id',
        name: 'VisualizarDoacao',
        component: VisualizarDoacaoView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Doação"
        }
    },
    {
        path: '/admin/acoes/isp',
        name: 'ListarAcoesIsp',
        component: ListarAcoesIspView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Ações de ISP"
        }
    },
    {
        path: '/admin/acoes/isp/:id',
        name: 'EditarAcaoIsp',
        component: EditarAcaoIspView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Editar Ações de ISP"
        }
    },
    {
        path: '/admin/acoes/isp/cadastrar',
        name: 'CadastrarAcaoIsp',
        component: CadastrarAcaoIspView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Cadastrar Ação de ISP"
        }
    },
    /* Acompanhamento */
    {
        path: '/admin/acompanhamentos',
        name: 'ListarAcompanhamentos',
        component: ListarAcompanhamentosView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Acompanhamentos"
        }
    },
    {
        path: '/admin/acompanhamentos/solicitar',
        name: 'CadastrarAcompanhamento',
        component: CadastrarAcompanhamentoView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Solicitar Acompanhamento"
        }
    },
    {
        path: '/admin/acompanhamentos/:id',
        name: 'VisualizarAcompanhamento',
        component: VisualizarAcompanhamentoView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Visualizar Acompanhamento"
        }
    },

    /* Colaborador */
    {
        path: '/colaborador',
        name: 'ColaboradorHome',
        component: ColaboradorHomeView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | O jeito B3"
        }
    },
    {
        path: '/colaborador/doacoes/:id',
        name: 'Doar',
        component: DoarView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Doar"
        }
    },
    {
        path: '/colaborador/acoes',
        name: 'HubAcoes',
        component: HubAcoesView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Hub de Ações"
        }
    },
    {
        path: '/colaborador/acoes/:id',
        name: 'Acao',
        component: AcaoView,
        meta: {
            requiresAuth: true,
            authScope: 'colaborador',
            title: "B3 Social | Ação"
        }
    },
    {
        path: '/colaborador/organizacao/indicar',
        name: 'IndicarOrganizacao',
        component: IndicarOrganizacaoView,
        meta: {
            title: "B3 Social | Indicar Organização"
        }
    },
    /* Organização */
    {
        path: '/organizacao',
        name: 'OrganizacaoHome',
        component: OrganizacaoHomeView,
        meta: {
            requiresAuth: true,
            authScope: 'organizacao',
            title: "B3 Social | Início"
        }
    },
    {
        path: '/organizacao/acompanhamentos/:id',
        name: 'PreencherAcompanhamento',
        component: PreencherAcompanhamentoView,
        meta: {
            requiresAuth: true,
            authScope: 'organizacao',
            title: "B3 Social | Preencher Acompanhamento"
        }
    },
    {
        path: '/organizacao/reunioes/:id',
        name: 'AgendarReuniao',
        component: AgendarReuniaoView,
        meta: {
            requiresAuth: true,
            authScope: 'organizacao',
            title: "B3 Social | Agendar Reunião"
        }
    },
    {
        path: '/organizacao/processos/:id',
        name: 'PreencherProcesso',
        component: PreencherProcessoView,
        meta: {
            requiresAuth: true,
            authScope: 'organizacao',
            title: "B3 Social | Preencher Processo"
        }
    },

    {
        path: '/:pathMatch(.*)*',
        component: NotFoundView,
        meta: {
            title: "B3 Social | Não Encontrada"
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    },
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || "B3 Social | O jeito B3";

    if (to.meta.requiresAuth) {
        var usuario;

        if (to.meta.authScope == 'colaborador') {
            usuario = JSON.parse(localStorage.getItem('B3Social-Colaborador'));
        } else if (to.meta.authScope == 'organizacao') {
            usuario = JSON.parse(localStorage.getItem('B3Social-Organizacao'));
        }

        if (usuario) {
            var decodedToken = decode(usuario.token);

            if ((decodedToken.exp * 1000) < Date.now()) {
                if (to.meta.authScope == 'colaborador') {
                    localStorage.removeItem('B3Social-Colaborador');
                    next('/colaborador/login');
                } else if (to.meta.authScope == 'organizacao') {
                    localStorage.removeItem('B3Social-Organizacao');
                    next('/organizacao/login');
                }
            } else {
                axios.defaults.headers.common['Authorization'] = `Bearer ${usuario.token}`;

                if (to.meta.authScope == 'colaborador') {
                    axios.defaults.headers.common['B3Social-User'] = 'colaborador';
                } else {
                    axios.defaults.headers.common['B3Social-User'] = 'organizacao';
                }

                next();
            }
        } else {
            if (to.meta.authScope == 'colaborador') {
                next('/colaborador/login');
            } else if (to.meta.authScope == 'organizacao') {
                next('/organizacao/login');
            }

        }
    } else {
        next();
    }
});

export default router
