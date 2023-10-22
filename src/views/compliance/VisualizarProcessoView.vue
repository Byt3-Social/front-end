<template>
    <Navbar></Navbar>
    <main id="visualizar-processo-view">
        <Header titulo="Processo" icone="bi bi-file-earmark-break-fill"></Header>
        <Transition>
            <FloatingPanel v-if="erroBuscaProcesso">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--info">
                        <i class="alerta__icone bi bi-info-circle-fill"></i>
                        <p class="alerta__message">Não foi possível recuperar as informações desse processo</p>
                    </div>
                </template>
            </FloatingPanel>
        </Transition>
        <Transition>
            <FloatingPanel v-if="!erroBuscaProcesso && processo != null">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--sucesso" v-if="this.$route.query.sucessoAtualizacao && rotaAnterior == null">
                        <i class="alerta__icone bi bi-check-circle-fill"></i>
                        <p class="alerta__message">Processo atualizado com sucesso</p>
                    </div>
                    <div class="alerta alerta--error" v-if="this.$route.query.falhaSolicitacaoDado && rotaAnterior == null">
                        <i class="alerta__icone bi bi-x-circle-fill"></i>
                        <p class="alerta__message">Falha ao solicitar informação adicional</p>
                    </div>
                    <div class="alerta alerta--error" v-if="this.$route.query.falhaExclusaoDado && rotaAnterior == null">
                        <i class="alerta__icone bi bi-x-circle-fill"></i>
                        <p class="alerta__message">Falha ao excluir informação adicional</p>
                    </div>
                    <div class="alerta alerta--error"
                        v-if="this.$route.query.falhaSolicitacaoDocumento && rotaAnterior == null">
                        <i class="alerta__icone bi bi-x-circle-fill"></i>
                        <p class="alerta__message">Falha ao solicitar documento adicional</p>
                    </div>
                    <div class="alerta alerta--error"
                        v-if="this.$route.query.falhaExclusaoDocumento && rotaAnterior == null">
                        <i class="alerta__icone bi bi-x-circle-fill"></i>
                        <p class="alerta__message">Falha ao excluir documento adicional</p>
                    </div>
                    <div class="alerta alerta--error"
                        v-if="this.$route.query.falhaSolicitacaoReenvio && rotaAnterior == null">
                        <i class="alerta__icone bi bi-x-circle-fill"></i>
                        <p class="alerta__message">Falha ao solicitar reenvio do documento</p>
                    </div>
                    <ul class="tabs">
                        <li class="tabs__item">
                            <button class="tabs__button" :class="tab == 'DADOS-GERAIS' ? 'active' : ''"
                                @click="selecionarTab('DADOS-GERAIS')">Dados gerais</button>
                        </li>
                        <li class="tabs__item">
                            <button class="tabs__button" :class="tab == 'SOCIOS' ? 'active' : ''"
                                @click="selecionarTab('SOCIOS')">Socios</button>
                        </li>
                        <li class="tabs__item">
                            <button class="tabs__button" :class="tab == 'DADOS-COMPLEMENTARES' ? 'active' : ''"
                                @click="selecionarTab('DADOS-COMPLEMENTARES')">Complemento</button>
                        </li>
                        <li class="tabs__item">
                            <button class="tabs__button" :class="tab == 'DOCUMENTOS' ? 'active' : ''"
                                @click="selecionarTab('DOCUMENTOS')">Documentos</button>
                        </li>
                    </ul>
                    <div class="tabs__content" v-if="tab == 'DADOS-GERAIS'">
                        <div :class="`alerta alerta--${status}`">
                            <p class="alerta__message" v-if="status == 'ABERTO'">Processo em
                                fase
                                de preenchimento</p>
                            <p class="alerta__message" v-if="status == 'EM_ANALISE'">Processo
                                em
                                fase de análise</p>
                            <p class="alerta__message" v-if="status == 'PENDENTE'">Processo
                                contém
                                pendências</p>
                            <p class="alerta__message" v-if="status == 'APROVADO'">Processo
                                aprovado</p>
                            <p class="alerta__message" v-if="status == 'REPROVADO'">Processo
                                reprovado</p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">CNPJ</label>
                            <p class="bloco__atributo--preenchido">
                                {{ utils.cnpjMask(processo.cnpj) }}
                            </p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Nome empresarial</label>
                            <p class="bloco__atributo--preenchido">
                                {{ processo.nomeEmpresarial != null && processo.nomeEmpresarial != '' ?
                                    processo.nomeEmpresarial : "Não preenchido" }}
                            </p>
                        </div>

                        <div class="bloco">
                            <label class="bloco__atributo">Nome fantasia</label>
                            <p class="bloco__atributo--preenchido">
                                {{ processo.nomeFantasia != null && processo.nomeFantasia != '' ? processo.nomeFantasia :
                                    "Não preenchido" }}
                            </p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Data de abertura</label>
                            <p class="bloco__atributo--preenchido">
                                {{ processo.dataAbertura != null && processo.dataAbertura != '' ? (new
                                    Date((processo.dataAbertura + "T00:00:00"))).toLocaleDateString("pt-BR") : "Não preenchido"
                                }}
                            </p>
                        </div>

                        <div class="bloco">
                            <label class="bloco__atributo">Porte</label>
                            <p class="bloco__atributo--preenchido">
                                {{ processo.porte != null && processo.porte != '' ? processo.porte : "Não preenchido" }}
                            </p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Endereço</label>
                            <p class="bloco__atributo--preenchido" v-if="processo.endereco != null">
                                {{ processo.endereco.endereco != null && processo.endereco.endereco != '' &&
                                    processo.endereco.numero != null && processo.endereco.numero != '' ?
                                    processo.endereco.endereco + ", " + processo.endereco.numero : "Não preenchido" }}
                            </p>
                            <p class="bloco__atributo--preenchido" v-else>Não preenchido</p>
                        </div>

                        <div class="bloco">
                            <label class="bloco__atributo">Bairro</label>
                            <p class="bloco__atributo--preenchido" v-if="processo.endereco != null">
                                {{ processo.endereco.bairro != null && processo.endereco.bairro != '' ?
                                    processo.endereco.bairro : "Não preenchido" }}
                            </p>
                            <p class="bloco__atributo--preenchido" v-else>Não preenchido</p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Complemento</label>
                            <p class="bloco__atributo--preenchido" v-if="processo.endereco != null">
                                {{ processo.endereco.complemento != null && processo.endereco.complemento != '' ?
                                    processo.endereco.complemento : "Não preenchido"
                                }}
                            </p>
                            <p class="bloco__atributo--preenchido" v-else>Não preenchido</p>
                        </div>

                        <div class="bloco">
                            <label class="bloco__atributo">Cidade</label>
                            <p class="bloco__atributo--preenchido" v-if="processo.endereco != null">
                                {{ processo.endereco.cidade != null && processo.endereco.cidade != '' ?
                                    processo.endereco.cidade : "Não preenchido" }}
                            </p>
                            <p class="bloco__atributo--preenchido" v-else>Não preenchido</p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Estado</label>
                            <p class="bloco__atributo--preenchido" v-if="processo.endereco != null">
                                {{ processo.endereco.estado != null && processo.endereco.estado != '' ?
                                    processo.endereco.estado : "Não preenchido" }}
                            </p>
                            <p class="bloco__atributo--preenchido" v-else>Não preenchido</p>
                        </div>

                        <div class="bloco">
                            <label class="bloco__atributo">Email</label>
                            <p class="bloco__atributo--preenchido">
                                {{ processo.email != null && processo.email != '' ? processo.email : "Não preenchido" }}
                            </p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Telefone</label>
                            <p class="bloco__atributo--preenchido">
                                {{ processo.telefone != null && processo.telefone != '' ?
                                    utils.telefoneMask(processo.telefone) : "Não preenchido" }}
                            </p>
                        </div>

                        <div class="bloco">
                            <label class="bloco__atributo">Representante</label>
                            <p class="bloco__atributo--preenchido">
                                {{ processo.responsavel.nome != null && processo.responsavel.nome != '' ?
                                    processo.responsavel.nome : "Não preenchido" }}
                            </p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Email (Representante)</label>
                            <p class="bloco__atributo--preenchido">
                                {{ processo.responsavel.email != null && processo.responsavel.email != '' ?
                                    processo.responsavel.email : "Não preenchido" }}
                            </p>
                        </div>

                        <div class="bloco">
                            <label class="bloco__atributo">Telefone (Representante)</label>
                            <p class="bloco__atributo--preenchido">
                                {{ processo.responsavel.telefone != null && processo.responsavel.telefone != '' ?
                                    utils.telefoneMask(processo.responsavel.telefone)
                                    : "Não preenchido"
                                }}
                            </p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Última atualização</label>
                            <p class="bloco__atributo--preenchido">
                                {{ (new Date(processo.updatedAt)).toLocaleDateString("pt-BR") }}
                            </p>
                        </div>

                        <div class="status">
                            <label for="status" class="form-input-label">Atualize o status do processo</label>
                            <select name="status" id="status" class="form-input" v-model="processo.status">
                                <option value="ABERTO" :selected="processo.status == 'ABERTO'">ABERTO
                                </option>
                                <option value="EM_ANALISE" :selected="processo.status == 'EM_ANALISE'">
                                    EM
                                    ANÁLISE</option>
                                <option value="PENDENTE" :selected="processo.status == 'PENDENTE'">
                                    PENDENTE
                                </option>
                                <option value="REPROVADO" :selected="processo.status == 'REPROVADO'">
                                    REPROVADO</option>
                                <option value="APROVADO" :selected="processo.status == 'APROVADO'">
                                    APROVADO
                                </option>
                            </select>

                            <button class="primary-button" @click.prevent="atualizarStatusOrganizacao(processo.id)"
                                :disabled="status == processo.status">
                                <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                                <span v-show="!carregandoRequisicao">Atualizar</span>
                            </button>
                        </div>
                    </div>
                    <div class="tabs__content" v-if="tab == 'SOCIOS'">
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <td>CPF</td>
                                    <td>Nome</td>
                                    <td>Qualificação</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="socio in processo.socios">
                                    <td>{{ utils.cpfMask(socio.cpf) }}</td>
                                    <td>{{ socio.nome }}</td>
                                    <td>{{ socio.qualificacao }}</td>
                                </tr>
                            </tbody>
                        </table>

                        <p class="socios--vazio" v-if="processo.socios.length == 0">
                            Não há sócios cadastrados</p>
                    </div>
                    <div class="tabs__content" v-if="tab == 'DADOS-COMPLEMENTARES'">
                        <div class="documento__solicitar">
                            <select name="dado" id="dado" class="form-input" v-model="novoDado">
                                <option disabled value="0">Selecione um dado...</option>
                                <option v-for="dado in dados"
                                    v-show="!processo.dadosSolicitados.some(dadoSolicitado => dadoSolicitado.dado.id == dado.id)"
                                    :value="dado.id">{{ dado.nome }}</option>
                            </select>
                            <button type="button" class="documento__solicitar--button"
                                @click.prevent="vincularDadoSolicitado(processo.id, novoDado)">Solicitar</button>
                        </div>

                        <DadoSolicitado v-for="(dado, index) in processo.dadosSolicitados" :key="index"
                            :nome="dado.dado.nome" :tipo="dado.dado.tipo"
                            :valor="dado.valor != null && dado.valor != '' ? dado.valor : 'Não preenchido'"
                            @excluir="desvincularDadoSolicitado(processo.id, dado.id, index)">
                        </DadoSolicitado>
                    </div>
                    <div class="tabs__content" v-if="tab == 'DOCUMENTOS'">
                        <div class="documento__solicitar">
                            <select name="documento" id="documento" class="form-input" v-model="novoDocumento">
                                <option value="0" disabled>Selecione um documento...</option>
                                <option v-for="documento in documentos"
                                    v-show="!processo.documentosSolicitados.some(documentoSolicitado => documentoSolicitado.documento.id == documento.id)"
                                    :value="documento.id">
                                    {{ documento.nome }}</option>
                            </select>
                            <button type="button" class="documento__solicitar--button"
                                @click.prevent="vincularDocumentoSolicitado(processo.id, novoDocumento)">Solicitar</button>
                        </div>

                        <DocumentoSolicitado v-for="(documento, index) in processo.documentosSolicitados" :key="index"
                            :nome="documento.documento.nome" :status="documento.status"
                            :nomeOriginal="documento.nomeArquivoOriginal" :tamanhoArquivo="documento.tamanhoArquivo"
                            :assinaturaDigital="documento.assinaturaDigital"
                            @excluir="desvincularDocumentoSolicitado(processo.id, documento.id, index)"
                            @download="baixarDocumentoSolicitado(documento.id)"
                            @reset="reenviarDocumentoSolicitado(documento.id, index)">
                        </DocumentoSolicitado>
                    </div>
                </template>
            </FloatingPanel>
        </Transition>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/compliance/visualizar-processo-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';
import utils from "@/helpers/maska";
import DadoSolicitado from '@/components/DadoSolicitado.vue';
import DocumentoSolicitado from '@/components/DocumentoSolicitado.vue'

export default {
    name: 'VisualizarProcessoView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
        DadoSolicitado,
        DocumentoSolicitado,
    },
    created() {
        this.buscarProcesso(this.$route.params.id);
        this.buscarDocumentos();
        this.buscarDados();
    },
    data() {
        return {
            tab: "DADOS-GERAIS",
            processo: null,
            status: null,
            documentos: [],
            dados: [],
            novoDado: 0,
            novoDocumento: 0,
            carregandoRequisicao: false,
            erroBuscaProcesso: false,
            utils: utils,
            rotaAnterior: null,
        }
    },
    beforeRouteEnter(to, from, next) {
        next(route => {
            route.rotaAnterior = from;
        })
    },
    methods: {
        selecionarTab: function (tab) {
            this.tab = tab;
        },
        buscarProcesso: function (id) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/compliance/processos/" + id)
                .then((response) => {
                    var processo = response.data;

                    this.processo = processo;
                    this.status = processo.status;
                })
                .catch(() => {
                    this.erroBuscaProcesso = true;
                });
        },
        buscarDocumentos: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/compliance/documentos")
                .then((response) => {
                    this.documentos = response.data;
                })
                .catch(() => {

                });
        },
        buscarDados: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/compliance/dados")
                .then((response) => {
                    this.dados = response.data;
                })
                .catch(() => {

                });
        },
        atualizarStatusOrganizacao: function (id) {
            var json = {
                status: this.processo.status
            };

            axios.put(process.env.VUE_APP_API_BASE_URL + "/compliance/processos/" + id + "/status", json)
                .then(() => {
                    this.$router.push({ name: 'VisualizarProcesso', params: { id: id }, query: { sucessoAtualizacao: true, timestamp: Date.now() } });
                })
                .catch(() => {

                });
        },
        desvincularDadoSolicitado: function (processoId, dadoId, index) {
            axios.delete(process.env.VUE_APP_API_BASE_URL + "/compliance/processos/" + processoId + "/dados-solicitados/" + dadoId)
                .then(() => {
                    this.processo.dadosSolicitados.splice(index, 1);
                })
                .catch(() => {
                    this.$router.push({ name: 'VisualizarProcesso', params: { id: processoId }, query: { falhaExclusaoDado: true, timestamp: Date.now() } });
                });
        },
        vincularDadoSolicitado: function (processoId, dadoId) {
            axios.post(process.env.VUE_APP_API_BASE_URL + "/compliance/processos/" + processoId + "/dados/" + dadoId)
                .then((response) => {
                    this.processo.dadosSolicitados.push(response.data);
                })
                .catch(() => {
                    this.$router.push({ name: 'VisualizarProcesso', params: { id: processoId }, query: { falhaSolicitacaoDado: true, timestamp: Date.now() } });
                });
        },
        desvincularDocumentoSolicitado: function (processoId, documentoId, index) {
            axios.delete(process.env.VUE_APP_API_BASE_URL + "/compliance/processos/" + processoId + "/documentos-solicitados/" + documentoId)
                .then(() => {
                    this.processo.documentosSolicitados.splice(index, 1);
                })
                .catch(() => {
                    this.$router.push({ name: 'VisualizarProcesso', params: { id: processoId }, query: { falhaExclusaoDocumento: true, timestamp: Date.now() } });
                });
        },
        vincularDocumentoSolicitado: function (processoId, documentoId) {
            axios.post(process.env.VUE_APP_API_BASE_URL + "/compliance/processos/" + processoId + "/documentos/" + documentoId)
                .then((response) => {
                    this.processo.documentosSolicitados.push(response.data);
                })
                .catch(() => {
                    this.$router.push({ name: 'VisualizarProcesso', params: { id: processoId }, query: { falhaSolicitacaoDocumento: true, timestamp: Date.now() } });
                });
        },
        baixarDocumentoSolicitado: function (id) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/compliance/documentos-solicitados/" + id + "/aws")
                .then((response) => {
                    window.location.href = response.data;
                })
                .catch(() => {

                });
        },
        reenviarDocumentoSolicitado: function (documentoId, index) {
            axios.post(process.env.VUE_APP_API_BASE_URL + "/compliance/documentos-solicitados/" + documentoId + "/reenvio")
                .then(() => {
                    this.processo.documentosSolicitados[index].status = "PENDENTE_REENVIO";
                })
                .catch(() => {
                    this.$router.push({ name: 'VisualizarProcesso', params: { id: processoId }, query: { falhaSolicitacaoReenvio: true, timestamp: Date.now() } });
                });
        },
    }
}
</script>