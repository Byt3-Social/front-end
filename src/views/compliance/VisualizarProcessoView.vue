<template>
    <Navbar></Navbar>
    <main id="visualizar-processo-view">
        <Header titulo="Processo" icone="bi bi-file-earmark-break-fill"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
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
                    <div :class="`alerta alerta--${processo != null ? processo.status : ''}`">
                        <p class="alerta__message" v-if="processo != null && processo.status == 'ABERTO'">Processo em fase
                            de preenchimento</p>
                        <p class="alerta__message" v-if="processo != null && processo.status == 'EM_ANALISE'">Processo em
                            fase de análise</p>
                        <p class="alerta__message" v-if="processo != null && processo.status == 'PENDENTE'">Processo contém
                            pendências</p>
                        <p class="alerta__message" v-if="processo != null && processo.status == 'APROVADO'">Processo
                            aprovado</p>
                        <p class="alerta__message" v-if="processo != null && processo.status == 'REPROVADO'">Processo
                            reprovado</p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">CNPJ</label>
                        <p class="bloco__atributo--preenchido">{{ processo != null ? cnpjMask(processo.cnpj) : "" }}</p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Nome empresarial</label>
                        <p class="bloco__atributo--preenchido">{{ processo != null ? (processo.nome_empresarial != null ?
                            processo.nome_empresarial : "Não preenchido") : "" }}</p>
                    </div>

                    <div class="bloco">
                        <label class="bloco__atributo">Nome fantasia</label>
                        <p class="bloco__atributo--preenchido">{{ processo != null ? (processo.nome_fantasia != null ?
                            processo.nome_fantasia : "Não preenchido") : "" }}</p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Data de abertura</label>
                        <p class="bloco__atributo--preenchido">{{ processo != null ? (processo.data_abertura != null ?
                            (new Date(processo.data_abertura)).toLocaleDateString("pt-BR") : "Não preenchido") : "" }}</p>
                    </div>

                    <div class="bloco">
                        <label class="bloco__atributo">Porte</label>
                        <p class="bloco__atributo--preenchido">{{ processo != null ? (processo.porte != null ?
                            processo.porte
                            : "Não preenchido") : "" }}</p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Endereço</label>
                        <p class="bloco__atributo--preenchido">{{ processo != null ? (processo.endereco != null &&
                            processo.numero != null ? processo.endereco + ", " + processo.numero : "Não preenchido") : "" }}
                        </p>
                    </div>

                    <div class="bloco">
                        <label class="bloco__atributo">Bairro</label>
                        <p class="bloco__atributo--preenchido">{{ processo != null ? (processo.bairro != null ?
                            processo.bairro : "Não preenchido") : "" }}</p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Complemento</label>
                        <p class="bloco__atributo--preenchido">{{ processo != null ? (processo.complemento != null ?
                            processo.complemento : "Não preenchido") : "" }}</p>
                    </div>

                    <div class="bloco">
                        <label class="bloco__atributo">Cidade</label>
                        <p class="bloco__atributo--preenchido">{{ processo != null ? (processo.cidade != null ?
                            processo.cidade : "Não preenchido") : "" }}</p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Estado</label>
                        <p class="bloco__atributo--preenchido">{{ processo != null ? (processo.estado != null ?
                            processo.estado : "Não preenchido") : "" }}</p>
                    </div>

                    <div class="bloco">
                        <label class="bloco__atributo">Email</label>
                        <p class="bloco__atributo--preenchido">{{ processo != null ? (processo.email != null ?
                            processo.email
                            : "Não preenchido") : "" }}</p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Telefone</label>
                        <p class="bloco__atributo--preenchido">{{ processo != null ? (processo.telefone != null ?
                            telefoneMask(processo.telefone) : "Não preenchido") : "" }}</p>
                    </div>

                    <div class="bloco">
                        <label class="bloco__atributo">Representante</label>
                        <p class="bloco__atributo--preenchido">{{ processo != null ? (processo.responsavel.nome != null ?
                            processo.responsavel.nome : "Não preenchido") : "" }}</p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Email (Representante)</label>
                        <p class="bloco__atributo--preenchido">{{ processo != null ? (processo.responsavel.email != null ?
                            processo.responsavel.email : "Não preenchido") : "" }}</p>
                    </div>

                    <div class="bloco">
                        <label class="bloco__atributo">Telefone (Representante)</label>
                        <p class="bloco__atributo--preenchido">{{ processo != null ? (processo.responsavel.telefone != null
                            ?
                            telefoneMask(processo.responsavel.telefone) : "Não preenchido") : "" }}</p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Última atualização</label>
                        <p class="bloco__atributo--preenchido">{{ processo != null ? (processo.updated_at != null ?
                            (new Date(processo.updated_at)).toLocaleDateString("pt-BR") : "Não preenchido") : "" }}</p>
                    </div>

                    <div class="status"
                        v-if="processo != null && (processo.status == 'EM_ANALISE' || processo.status == 'PENDENTE')">
                        <label for="status" class="form-input-label">Atualize o status do processo</label>
                        <select name="status" id="status" class="form-input">
                            <option value="ABERTO" :selected="processo != null && processo.status == 'ABERTO'">ABERTO
                            </option>
                            <option value="EM_ANALISE" :selected="processo != null && processo.status == 'EM_ANALISE'">EM
                                ANÁLISE</option>
                            <option value="PENDENTE" :selected="processo != null && processo.status == 'PENDENTE'">PENDENTE
                            </option>
                            <option value="REPROVADO" :selected="processo != null && processo.status == 'REPROVADO'">
                                REPROVADO</option>
                            <option value="APROVADO" :selected="processo != null && processo.status == 'APROVADO'">APROVADO
                            </option>
                        </select>

                        <button class="primary-button" @click.prevent="cadastrarEmpresa()">
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
                                <td>{{ cpfMask(socio.cpf) }}</td>
                                <td>{{ socio.nome }}</td>
                                <td>{{ socio.qualificacao }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p class="socios--vazio" v-if="processo == null || (processo != null && processo.socios.length == 0)">
                        Não há sócios cadastrados</p>
                </div>
                <div class="tabs__content" v-if="tab == 'DADOS-COMPLEMENTARES'">
                    <div class="bloco bloco--complementar" v-for="dado in processo.dados_solicitados">
                        <div class="bloco__info">
                            <label class="bloco__atributo">{{ dado.dado.nome }}</label>
                            <p class="bloco__atributo--preenchido">{{ dado.valor != null ? dado.valor : "Não preenchido" }}
                            </p>
                        </div>
                        <button type="button">
                            <i class="bi bi-x-circle-fill"></i>
                        </button>
                    </div>
                </div>
                <div class="tabs__content" v-if="tab == 'DOCUMENTOS'">
                    <div class="documento__solicitar">
                        <select name="documento" id="documento" class="form-input">
                            <option value="Teste" selected disabled>Selecione um documento...</option>
                            <option v-for="documento in documentos" value="documento.nome">{{ documento.nome }}</option>
                        </select>
                        <button type="button" class="documento__solicitar--button">Solicitar</button>
                    </div>
                    <div class="documento" v-for="documento in processo.documentos_solicitados">
                        <div class="documento__solicitado">
                            <i class="bi bi-file-plus documento__icone"></i>
                            <p class="documento__nome">{{ documento.documento.nome }}</p>
                        </div>
                        <div class="documento__enviado" v-if="documento.status == 'ENVIADO'">
                            <div class="documento__detalhes">
                                <i class="bi bi-file-pdf-fill"></i>
                                <div class="documento__info">
                                    <p>{{ documento.nome_arquivo_original }}</p>
                                    <p v-if="documento.assinatura_digital != null">Enviado (assinado)</p>
                                    <p v-else="documento.assinatura_digital != null">Enviado (não assinado)</p>
                                    <p>{{ documento.tamanho_arquivo }} bytes</p>
                                </div>
                            </div>
                            <div class="documento__acoes">
                                <button type="button" @click.prevent="baixarDocumento(documento.id)">
                                    <i class="bi bi-cloud-arrow-down-fill documento__icone documento__icone--download"></i>
                                </button>
                                <button type="button">
                                    <i class="bi bi-arrow-counterclockwise documento__icone documento__icone--reset"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </FloatingPanel>
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
import { Mask } from "maska";

export default {
    name: 'VisualizarProcessoView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel
    },
    created() {
        this.buscarProcesso(this.$route.params.id);
        this.buscarDocumentos();
    },
    data() {
        return {
            tab: "DADOS-GERAIS",
            processo: null,
            documentos: [],
            carregandoRequisicao: false,
        }
    },
    methods: {
        selecionarTab: function (tab) {
            this.tab = tab;
        },
        cnpjMask: function (cnpj) {
            var mask = new Mask({ mask: "##.###.###/####-##" });

            return mask.masked(cnpj);
        },
        cpfMask: function (cpf) {
            var mask = new Mask({ mask: "###.###.###-##" });

            return mask.masked(cpf);
        },
        telefoneMask: function (telefone) {
            var mask = new Mask({ mask: ["(##) ####-####", "(##) #####-####"] });

            return mask.masked(telefone);
        },
        buscarProcesso: function (id) {
            axios.get("http://localhost:8083/processos/" + id)
                .then((response) => {
                    console.log(response.data);
                    var processo = response.data;

                    this.processo = processo;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        buscarDocumentos: function (id) {
            axios.get("http://localhost:8083/documentos")
                .then((response) => {
                    console.log(response.data);
                    var documentos = response.data;

                    this.documentos = documentos;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        baixarDocumento: function (id) {
            axios.get("http://localhost:8083/documentos-solicitados/" + id + "/aws-s3")
                .then((response) => {
                    console.log(response.data);

                    window.location.href = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        atualizarProcesso: function () {

        }
    }
}
</script>