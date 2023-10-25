<template>
    <Navbar></Navbar>
    <main id="cadastrar-acompanhamento-view">
        <Header titulo="Acompanhamento" icone="bi bi-file-earmark-bar-graph-fill"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <form action="#" method="post">
                    <div class="form-input-wrapper">
                        <label for="acao.id" class="form-input-label">Selecione uma ação social</label>
                        <select name="acao.id" id="acao.id" class="form-input" v-model="acompanhamento.acaoId">
                            <option :value="null">Selecione uma ação social...</option>
                            <option v-for="acao in acoes" :value="acao.id">{{ acao.nomeAcao }}</option>
                        </select>
                    </div>

                    <div class="form-input-wrapper">
                        <label for="organizacao.nome" class="form-input-label">Organização vinculada</label>
                        <input type="text" name="organizacao.nome" id="organizacao.nome" class="form-input"
                            :value="acompanhamento.acaoId != null ? matchOrganizacao(encontrarOrganizacao(acompanhamento.acaoId)) : `-`"
                            disabled>
                    </div>

                    <Transition>
                        <div v-if="this.acompanhamento.acaoId != null">
                            <div class="documento__solicitar">
                                <select name="acompanhamento.indicador" id="acompanhamento.indicador" class="form-input"
                                    v-model="novoIndicador">
                                    <option :value="null">Selecione um indicador...</option>
                                    <option v-for="indicador in indicadores" :value="indicador.id"
                                        :disabled="acompanhamento.novosIndicadoresSolicitados.some(indicadorSolicitado => indicadorSolicitado == indicador.id)">
                                        {{ indicador.nome }}</option>
                                </select>
                                <button type="button" class="documento__solicitar--button"
                                    @click.prevent="solicitarIndicador()">Solicitar</button>
                            </div>

                            <table class="table table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col">Indicador</th>
                                        <th scope="col">Remover</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(indicador, index) in acompanhamento.novosIndicadoresSolicitados">
                                        <td>{{ matchIndicador(indicador) }}</td>
                                        <td>
                                            <button type="button" class="acao" @click.prevent="removerIndicador(index)">
                                                <i class="bi bi-x-circle-fill acao__icone acao--excluir"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="form-input-wrapper">
                                <label for="acompanhamento.informacoesAdicionais" class="form-input-label">Informações
                                    Adicionais</label>
                                <p>Utilize esse espaço caso queira solicitar o envio de algum documento por parte da
                                    organização</p>
                                <textarea name="acompanhamento.informacoesAdicionais"
                                    id="acompanhamento.informacoesAdicionais" class="form-input"
                                    v-model="acompanhamento.informacoesAdicionais"></textarea>
                            </div>

                            <Transition>
                                <button class="primary-button" @click.prevent="cadastrarAcompanhamento()"
                                    v-if="this.acompanhamento.novosIndicadoresSolicitados.length > 0">
                                    <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                                    <span v-show="!carregandoRequisicao">Solicitar</span>
                                </button>
                            </Transition>
                        </div>
                    </Transition>
                </form>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/acompanhamento/cadastrar-acompanhamento-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';

export default {
    name: 'CadastrarOrganizacaoView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel
    },
    data() {
        return {
            acompanhamento: {
                acaoId: null,
                organizacaoId: null,
                novosIndicadoresSolicitados: [],
                informacoesAdicionais: null,
            },
            organizacoes: null,
            acoes: null,
            indicadores: null,
            novoIndicador: null,
            carregandoRequisicao: false,
            erroCadastro: false,
        }
    },
    created() {
        this.buscarOrganizacoes();
        this.buscarAcoes();
        this.buscarIndicadores();
    },
    methods: {
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
        buscarIndicadores: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acompanhamento/indicadores")
                .then((response) => {
                    this.indicadores = response.data;
                })
                .catch(() => {

                });
        },
        encontrarOrganizacao: function (id) {
            for (let index = 0; index < this.acoes.length; index++) {
                const acao = this.acoes[index];

                if (acao.id == id) {
                    this.acompanhamento.organizacaoId = acao.organizacaoId;
                    return acao.organizacaoId;
                }
            }

            return null;
        },
        matchOrganizacao: function (id) {
            for (let index = 0; index < this.organizacoes.length; index++) {
                const organizacao = this.organizacoes[index];

                if (organizacao.id == id) {
                    return organizacao.nome;
                }
            }
        },
        matchIndicador: function (id) {
            for (let index = 0; index < this.indicadores.length; index++) {
                const indicador = this.indicadores[index];

                if (indicador.id == id) {
                    return indicador.nome;
                }
            }
        },
        solicitarIndicador: function () {
            if (this.novoIndicador != null) {
                this.acompanhamento.novosIndicadoresSolicitados.push(this.novoIndicador);
                this.novoIndicador = null;
            }
        },
        removerIndicador: function (index) {
            this.acompanhamento.novosIndicadoresSolicitados.splice(index, 1);
        },
        cadastrarAcompanhamento: function () {
            axios.post(process.env.VUE_APP_API_BASE_URL + "/acompanhamento/acompanhamentos", this.acompanhamento)
                .then((response) => {
                    this.$router.push({ name: 'ListarAcompanhamentos', query: { sucessoSolicitacao: true } });
                })
                .catch(() => {

                });
        }
    },
}
</script>