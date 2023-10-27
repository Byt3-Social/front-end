<template>
    <Navbar></Navbar>
    <main id="preencher-acompanhamento-view">
        <Header titulo="Acompanhamento" icone="bi bi-file-earmark-bar-graph-fill"></Header>
        <Transition>
            <FloatingPanel v-if="erroBuscaAcompanhamento">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--info">
                        <i class="alerta__icone bi bi-info-circle-fill"></i>
                        <p class="alerta__message">Não foi possível recuperar as informações desse acompanhamento</p>
                    </div>
                </template>
            </FloatingPanel>
        </Transition>
        <Transition>
            <FloatingPanel
                v-if="!erroBuscaAcompanhamento && acompanhamento != null && organizacoes != null && acoes != null">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--sucesso" v-if="this.$route.query.sucessoSolicitacao && rotaAnterior == null">
                        <i class="alerta__icone bi bi-check-circle-fill"></i>
                        <p class="alerta__message">Reunião solicitada com sucesso</p>
                    </div>
                    <div class="alerta alerta--error" v-if="erroAtualizacao">
                        <i class="alerta__icone bi bi-x-circle-fill"></i>
                        <p class="alerta__message">Não foi possível salvar esse acompanhamento</p>
                    </div>
                    <ul class="tabs">
                        <li class="tabs__item">
                            <button class="tabs__button" :class="tab == 'INDICADORES' ? 'active' : ''"
                                @click="selecionarTab('INDICADORES')">Indicadores</button>
                        </li>
                        <li class="tabs__item">
                            <button class="tabs__button" :class="tab == 'ARQUIVOS' ? 'active' : ''"
                                @click="selecionarTab('ARQUIVOS')">Arquivos</button>
                        </li>
                    </ul>

                    <div class="tabs__content" v-if="tab == 'INDICADORES'">
                        <div class="bloco">
                            <label class="bloco__atributo">Ação social</label>
                            <p class="bloco__atributo--preenchido">{{ matchAcao(acompanhamento.acaoId) }}</p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Organização</label>
                            <p class="bloco__atributo--preenchido">{{ acompanhamento.organizacaoId != null ?
                                matchOrganizacao(acompanhamento.organizacaoId) : '-' }}</p>
                        </div>
                        <div class="bloco info-adicional">
                            <label class="bloco__atributo">Informações adicionais</label>
                            <p class="bloco__atributo--preenchido">
                                {{ acompanhamento.informacoesAdicionais != null &&
                                    acompanhamento.informacoesAdicionais != '' ? acompanhamento.informacoesAdicionais :
                                    '-' }}
                            </p>
                        </div>

                        <hr class="divisor">

                        <div class="form-row">
                            <div class="form-input-wrapper">
                                <label for="acompanhamento.representante.nome" class="form-input-label">Nome
                                    (Representante)</label>
                                <input type="text" name="acompanhamento.representante.nome"
                                    id="acompanhamento.representante.nome" class="form-input"
                                    v-model="acompanhamento.representante.nome">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="acompanhamento.representante.email" class="form-input-label">Email
                                    (Representante)</label>
                                <input type="text" name="acompanhamento.representante.email"
                                    id="acompanhamento.representante.email" class="form-input"
                                    v-model="acompanhamento.representante.email">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input-wrapper">
                                <label for="acompanhamento.representante.telefone" class="form-input-label">Telefone
                                    (Representante)</label>
                                <input type="text" name="acompanhamento.representante.telefone"
                                    id="acompanhamento.representante.telefone" class="form-input" v-maska="telefone"
                                    data-maska="['(##) ####-####', '(##) #####-####']"
                                    v-model="acompanhamento.representante.telefone">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="acompanhamento.representante.cargo" class="form-input-label">Cargo
                                    (Representante)</label>
                                <input type="email" name="acompanhamento.representante.cargo"
                                    id="acompanhamento.representante.cargo" class="form-input"
                                    v-model="acompanhamento.representante.cargo">
                            </div>
                        </div>

                        <div class="indicadores">
                            <div class="form-input-wrapper" v-for="indicador in acompanhamento.indicadoresSolicitados">
                                <label :for="`acompanhamento.indicador.${indicador.indicador.nome}`"
                                    class="form-input-label">
                                    {{ indicador.indicador.nome }}
                                </label>
                                <input type="text" :name="`acompanhamento.indicador.${indicador.indicador.nome}`"
                                    :id="`acompanhamento.indicador.${indicador.indicador.nome}`" class="form-input"
                                    v-model="indicador.valor">
                            </div>
                        </div>

                        <button class="secondary-button" @click.prevent="this.$router.push({ name: 'OrganizacaoHome' })">
                            Voltar
                        </button>

                        <button class="primary-button" @click.prevent="preencherAcompanhamento()">
                            <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                            <span v-show="!carregandoRequisicao">Salvar</span>
                        </button>
                    </div>
                    <div class="tabs__content" v-if="tab == 'ARQUIVOS'">
                        <MultiFileUploader arquivoSolicitado="Arquivo" icone="file-plus" pasta="arquivos"
                            v-model:arquivos="acompanhamento.arquivos" @excluirArquivo="excluirArquivo($event)"
                            @uploadArquivo="uploadArquivo($event)" :download="false"></MultiFileUploader>
                    </div>
                </template>
            </FloatingPanel>
        </Transition>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/organizacao/preencher-acompanhamento-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';
import utils from '@/helpers/maska';
import MultiFileUploader from '@/components/MultiFileUploader.vue';

export default {
    name: 'PreencherAcompanhamentoView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
        MultiFileUploader,
    },
    created() {
        this.buscarAcompanhamento(this.$route.params.id);
        this.buscarAcoes();
        this.buscarOrganizacoes();
    },
    data() {
        return {
            tab: 'INDICADORES',
            acompanhamento: null,
            organizacoes: null,
            telefone: {
                masked: null,
                unmasked: null,
                completed: false,
            },
            acoes: null,
            options: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
            },
            erroBuscaAcompanhamento: false,
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
        buscarAcompanhamento: function (id) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acompanhamento/acompanhamentos/" + id)
                .then((response) => {
                    this.acompanhamento = response.data;
                })
                .catch(() => {
                    this.erroBuscaAcompanhamento = true;
                });
        },
        preencherAcompanhamento: function () {
            this.carregandoRequisicao = true;

            this.acompanhamento.representante.telefone = this.telefone.unmasked;

            axios.put(process.env.VUE_APP_API_BASE_URL + "/acompanhamento/acompanhamentos/" + this.acompanhamento.id, this.acompanhamento)
                .then(() => {
                    this.carregandoRequisicao = false;
                    this.$router.push({ name: 'OrganizacaoHome', query: { sucessoPreenchimento: true } });
                })
                .catch((error) => {
                    this.carregandoRequisicao = false;
                    window.scrollTo(0, 0);
                    this.erroAtualizacao = true;
                });
        },
        uploadArquivo: function (e) {
            var body = new FormData();
            body.append('arquivo', e);

            axios.post(process.env.VUE_APP_API_BASE_URL + "/acompanhamento/acompanhamentos/" + this.acompanhamento.id + "/arquivos", body, { "Content-Type": "multipart/form-data" })
                .then((response) => {
                    this.acompanhamento.arquivos.push(response.data);
                })
                .catch(() => {

                });
        },
        excluirArquivo: function (event) {
            axios.delete(process.env.VUE_APP_API_BASE_URL + "/acompanhamento/acompanhamentos/arquivos/" + this.acompanhamento.arquivos[event].id)
                .then(() => {
                    this.acompanhamento.arquivos.splice(event, 1);
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
    }
}
</script>