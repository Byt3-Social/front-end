<template>
    <Navbar></Navbar>
    <main id="organizacao-home-view">
        <Header titulo="Portal B3" icone="bi bi-building-fill"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <div class="alerta alerta--sucesso"
                    v-if="rotaAnterior != null && rotaAnterior.name == 'PreencherAcompanhamento' && this.$route.query.sucessoPreenchimento">
                    <i class="alerta__icone bi bi-check-circle-fill"></i>
                    <p class="alerta__message">Indicadores atualizados com sucesso</p>
                </div>
                <div class="alerta alerta--sucesso"
                    v-if="rotaAnterior != null && rotaAnterior.name == 'AgendarReuniao' && this.$route.query.sucessoAgendamento">
                    <i class="alerta__icone bi bi-check-circle-fill"></i>
                    <p class="alerta__message">Reunião agendada com sucesso</p>
                </div>
                <ul class="tabs">
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'PROCESSOS' ? 'active' : ''"
                            @click="selecionarTab('PROCESSOS')">Processos</button>
                    </li>
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'ACOES' ? 'active' : ''"
                            @click="selecionarTab('ACOES')">Ações sociais</button>
                    </li>
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'REUNIOES' ? 'active' : ''"
                            @click="selecionarTab('REUNIOES')">Reuniões</button>
                    </li>
                </ul>
                <div class="tabs__content" v-if="tab == 'PROCESSOS'">
                    <div class="alerta alerta--info" v-if="processos != null && processos[0].status == 'ABERTO'">
                        <p>Há um processo de análise documental aberto para essa organização. Por favor, verifique!</p>
                    </div>
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <td>Data de abertura</td>
                                <td>Status</td>
                                <td>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="processo in processos">
                                <td>
                                    {{ (new
                                        Date(processo.createdAt)).toLocaleDateString('pt-BR', options)
                                    }}
                                </td>
                                <td>
                                    <span :class="`status status--${processo.status}`">{{
                                        processo.status.replace("EM_ANALISE", "EM ANÁLISE") }}</span>
                                </td>
                                <td>
                                    <router-link :to="{ name: 'PreencherProcesso', params: { id: processo.id } }"
                                        class="acao">
                                        <i class="acao__icone bi bi-pencil-square acao--editar"></i>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="tabs__content" v-if="tab == 'ACOES'">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Ação</th>
                                <th scope="col">Status</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="acao in acoes">
                                <td>
                                    {{ acao.nomeAcao }}
                                </td>
                                <td>
                                    <span :class="`status status--${acao.fase != null ? acao.fase : acao.status}`">
                                        {{ acao.status.replace("_", " ") }}
                                    </span>
                                </td>
                                <td>
                                    <router-link
                                        :to="{ name: 'PreencherAcompanhamento', params: { id: matchAcompanhamento(acao.id) != null ? (matchAcompanhamento(acao.id)).id : null } }"
                                        v-if="(matchAcompanhamento(acao.id))">
                                        Acompanhamento disponível
                                    </router-link>
                                    <span v-else>-</span>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div class="tabs__content" v-if="tab == 'REUNIOES'">
                    <div class="reuniao" v-for="reuniao in reunioes">
                        <i class="bi bi-microsoft-teams"></i>
                        <div class="reuniao__detalhes">
                            <p>Microsoft Teams</p>
                            <p v-if="reuniao.status == 'SOLICITADA'">Aguardando agendamento</p>
                            <p v-if="reuniao.status == 'AGENDADA'">
                                {{ (new Date(reuniao.horarios[0].dataHorario)).toLocaleDateString('pt-BR', optionsDataHora)
                                }}
                            </p>
                            <router-link :to="{ name: 'AgendarReuniao', params: { id: reuniao.id } }" class="acao"
                                v-if="reuniao.status == 'SOLICITADA'">
                                Clique aqui para agendar um horário
                            </router-link>
                            <a :href="reuniao.link" target="__blank"
                                v-if="reuniao.status == 'AGENDADA' && addHours(reuniao.horarios[0].dataHorario, 2) > Date.now()">
                                Entrar na reunião
                            </a>
                            <p
                                v-if="reuniao.status == 'AGENDADA' && addHours(reuniao.horarios[0].dataHorario, 2) < Date.now()">
                                Acesso expirado
                            </p>
                        </div>
                    </div>
                </div>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/organizacao/organizacao-home-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';

export default {
    name: 'OrganizacaoHomeView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel
    },
    data() {
        return {
            tab: 'PROCESSOS',
            processos: null,
            acoes: null,
            acompanhamentos: null,
            reunioes: null,
            options: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            },
            optionsDataHora: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
            },
            rotaAnterior: null,
        }
    },
    beforeRouteEnter(to, from, next) {
        next(route => {
            route.rotaAnterior = from;
        })
    },
    created() {
        this.buscarProcessos();
        this.buscarAcoes();
        this.buscarAcompanhamentos();
        this.buscarReunioes();
    },
    methods: {
        selecionarTab: function (tab) {
            this.tab = tab;
        },
        buscarProcessos: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/compliance/processos/organizacoes")
                .then((response) => {
                    this.processos = response.data;
                })
                .catch(() => {

                });
        },
        buscarAcoes: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acoes-isp/organizacoes")
                .then((response) => {
                    this.acoes = response.data;
                })
                .catch(() => {

                });
        },
        buscarAcompanhamentos: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acompanhamento/acompanhamentos/organizacoes")
                .then((response) => {
                    this.acompanhamentos = response.data;
                })
                .catch(() => {

                });
        },
        buscarReunioes: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acompanhamento/reunioes/organizacoes")
                .then((response) => {
                    this.reunioes = response.data;
                })
                .catch(() => {

                });
        },
        matchAcompanhamento: function (id) {
            for (let index = 0; index < this.acompanhamentos.length; index++) {
                const acompanhamento = this.acompanhamentos[index];

                if (acompanhamento.acaoId == id) {
                    return acompanhamento;
                }
            }
        },
        addHours: function addHours(date, hours) {
            const dateCopy = new Date(date);

            dateCopy.setHours(dateCopy.getHours() + hours);

            return dateCopy;
        },
    }
}
</script>