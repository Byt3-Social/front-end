<template>
    <Navbar></Navbar>
    <main id="listar-acompanhamentos-view">
        <Header titulo="Acompanhamento" icone="bi bi-file-earmark-bar-graph-fill"></Header>
        <Transition>
            <FloatingPanel v-if="erroBuscaAcompanhamentos">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--info">
                        <i class="alerta__icone bi bi-info-circle-fill"></i>
                        <p class="alerta__message">Não foi possível recuperar os registros de acompanhamentos solicitados
                        </p>
                    </div>
                </template>
            </FloatingPanel>
        </Transition>
        <Transition>
            <FloatingPanel
                v-if="!erroBuscaAcompanhamentos && organizacoes != null && acoes != null && acompanhamentos != null">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--sucesso"
                        v-if="rotaAnterior != null && rotaAnterior.name == 'CadastrarAcompanhamento' && this.$route.query.sucessoSolicitacao">
                        <i class="alerta__icone bi bi-check-circle-fill"></i>
                        <p class="alerta__message">Acompanhamento solicitado com sucesso</p>
                    </div>
                    <div class="alerta alerta--sucesso" v-if="this.$route.query.sucessoExclusao && rotaAnterior == null">
                        <i class="alerta__icone bi bi-check-circle-fill"></i>
                        <p class="alerta__message">Acompanhamento excluído com sucesso</p>
                    </div>
                    <div class="alerta alerta--error" v-if="this.$route.query.falhaExclusao && rotaAnterior == null">
                        <i class="alerta__icone bi bi-x-circle-fill"></i>
                        <p class="alerta__message">Falha ao excluir o acompanhamento solicitado</p>
                    </div>
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Ação</th>
                                <th scope="col">Organização</th>
                                <th scope="col">Solicitado em</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(acompanhamento, index) in acompanhamentos">
                                <td>{{ matchAcao(acompanhamento.acaoId) }}</td>
                                <td>{{ acompanhamento.organizacaoId != null ? matchOrganizacao(acompanhamento.organizacaoId)
                                    : "-" }}
                                </td>
                                <td>{{ (new Date(acompanhamento.createdAt)).toLocaleDateString('pt-BR', options) }}</td>
                                <td>
                                    <router-link
                                        :to="{ name: 'VisualizarAcompanhamento', params: { id: acompanhamento.id } }"
                                        class="acao">
                                        <i class="acao__icone bi bi-pencil-square acao--editar"></i>
                                    </router-link>
                                    <button type="button" class="acao"
                                        @click.prevent="excluirAcompanhamento(index, acompanhamento.id)">
                                        <i class="bi bi-trash2-fill acao__icone acao--excluir"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </template>
            </FloatingPanel>
        </Transition>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/acompanhamento/listar-acompanhamentos-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';
import utils from '@/helpers/maska';

export default {
    name: 'ListarAcompanhamentosView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
    },
    data() {
        return {
            acompanhamentos: null,
            acoes: null,
            organizacoes: null,
            erroBuscaAcompanhamentos: false,
            utils: utils,
            options: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
            },
            carregandoRequisicao: false,
            rotaAnterior: null,
        }
    },
    beforeRouteEnter(to, from, next) {
        next(route => {
            route.rotaAnterior = from;
        })
    },
    created() {
        this.buscarAcoes();
        this.buscarOrganizacoes();
        this.buscarAcompanhamentos();
    },
    methods: {
        buscarAcompanhamentos: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acompanhamento/acompanhamentos")
                .then((response) => {
                    this.acompanhamentos = response.data;
                })
                .catch(() => {

                });
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
        excluirAcompanhamento: function (index, id) {
            axios.delete(process.env.VUE_APP_API_BASE_URL + "/acompanhamento/acompanhamentos/" + id)
                .then(() => {
                    this.acompanhamentos.splice(index, 1);
                    this.$router.push({ name: 'ListarAcompanhamentos', query: { sucessoExclusao: true, timestamp: Date.now() } });
                })
                .catch(() => {
                    this.$router.push({ name: 'ListarAcompanhamentos', query: { falhaExclusao: true, timestamp: Date.now() } });
                });
        },
    }
}
</script>