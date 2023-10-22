<template>
    <Navbar></Navbar>
    <main id="agendar-reuniao-view">
        <Header titulo="Reunião" icone="bi bi-microsoft-teams"></Header>
        <Transition>
            <FloatingPanel v-if="erroBuscaReuniao">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--info">
                        <i class="alerta__icone bi bi-info-circle-fill"></i>
                        <p class="alerta__message">Não foi possível recuperar as informações dessa solicitação</p>
                    </div>
                </template>
            </FloatingPanel>
        </Transition>
        <Transition>
            <FloatingPanel v-if="!erroBuscaReuniao && reuniao != null && organizacoes != null && acoes != null">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--error" v-if="erroAgendarReuniao">
                        <i class="alerta__icone bi bi-x-circle-fill"></i>
                        <p class="alerta__message">Não foi possível agendar essa reunião</p>
                    </div>
                    <div class="tabs__content" v-if="tab == 'INDICADORES'">
                        <div class="bloco">
                            <label class="bloco__atributo">Ação social</label>
                            <p class="bloco__atributo--preenchido">{{ matchAcao(reuniao.acompanhamento.acaoId) }}</p>
                        </div>

                        <div class="bloco">
                            <label class="bloco__atributo">Organização</label>
                            <p class="bloco__atributo--preenchido">{{ reuniao.acompanhamento.organizacaoId != null ?
                                matchOrganizacao(reuniao.acompanhamento.organizacaoId) : '-' }}</p>
                        </div>

                        <div class="form-input-wrapper">
                            <label for="reuniao.horario.id" class="form-input-label">Agendar reunião</label>
                            <select name="reuniao.horario.id" id="reuniao.horario.id" v-model="horarioId"
                                class="form-input">
                                <option :value="null" disabled>Escolha um horário...</option>
                                <option :value="horario.id" v-for="horario in reuniao.horarios"
                                    :disabled="new Date(horario.dataHorario) < Date.now() || horario.escolhido">
                                    {{ (new Date(horario.dataHorario)).toLocaleDateString('pt-BR', options) }}
                                </option>
                            </select>
                        </div>

                        <button class="secondary-button" @click.prevent="this.$router.push({ name: 'OrganizacaoHome' })">
                            Voltar
                        </button>

                        <button class="primary-button" @click.prevent="agendarReuniao()">
                            <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                            <span v-show="!carregandoRequisicao">Agendar</span>
                        </button>
                    </div>
                </template>
            </FloatingPanel>
        </Transition>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/organizacao/agendar-reuniao-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';
import utils from '@/helpers/maska';
import MultiFileUploader from '@/components/MultiFileUploader.vue';

export default {
    name: 'AgendarReuniaoView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
        MultiFileUploader,
    },
    created() {
        this.buscarReuniao(this.$route.params.id);
        this.buscarAcoes();
        this.buscarOrganizacoes();
    },
    data() {
        return {
            tab: 'INDICADORES',
            reuniao: null,
            horarioId: null,
            organizacoes: null,
            acoes: null,
            options: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
            },
            erroBuscaReuniao: false,
            erroAgendarReuniao: false,
            utils: utils,
            rotaAnterior: null,
            carregandoRequisicao: false,
            erroAtualizacao: false,
        }
    },
    methods: {
        selecionarTab: function (tab) {
            this.tab = tab;
        },
        buscarAcoes: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acoes-isp")
                .then((response) => {
                    this.acoes = response.data;
                })
                .catch(() => {

                });
        },
        buscarOrganizacoes: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/prospeccao/organizacoes")
                .then((response) => {
                    this.organizacoes = response.data;
                })
                .catch(() => {

                });
        },
        buscarReuniao: function (id) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acompanhamento/reunioes/" + id)
                .then((response) => {
                    this.reuniao = response.data;
                })
                .catch(() => {
                    this.erroBuscaReuniao = true;
                });
        },
        agendarReuniao: function () {
            this.carregandoRequisicao = true;

            axios.put(process.env.VUE_APP_API_BASE_URL + "/acompanhamento/reunioes/" + this.reuniao.id, { horarioId: this.horarioId })
                .then(() => {
                    this.carregandoRequisicao = false;
                    this.$router.push({ name: 'OrganizacaoHome', query: { sucessoAgendamento: true } });
                })
                .catch(() => {
                    this.carregandoRequisicao = false;
                    this.erroAgendarReuniao = true;
                    window.scrollTo(0, 0);
                });
        },
        matchOrganizacao: function (id) {
            for (let index = 0; index < this.organizacoes.length; index++) {
                const organizacao = this.organizacoes[index];

                if (organizacao.id == id) {
                    return organizacao.nome;
                }
            }
        },
        matchAcao: function (id) {
            for (let index = 0; index < this.acoes.length; index++) {
                const acao = this.acoes[index];

                if (acao.id == id) {
                    return acao.nomeAcao;
                }
            }
        },
    }
}
</script>