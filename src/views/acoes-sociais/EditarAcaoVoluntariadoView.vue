<template>
    <Navbar></Navbar>
    <main id="editar-acao-voluntariado-view">
        <Header titulo="Voluntariado" icone="bi bi-collection-fill"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <div class="alerta alerta--error" v-if="erroCadastro">
                    <i class="alerta__icone bi bi-x-circle-fill"></i>
                    <p class="alerta__message">Não foi possível editar as informações dessa organização</p>
                </div>
                <ul class="tabs">
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'DADOS-GERAIS' ? 'active' : ''"
                            @click="selecionarTab('DADOS-GERAIS')">Dados gerais</button>
                    </li>
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'CONFIGURACOES' ? 'active' : ''"
                            @click="selecionarTab('CONFIGURACOES')">Configurações</button>
                    </li>
                    <li class="tabs__item" v-if="acao != null && acao.campanha">
                        <button class="tabs__button" :class="tab == 'DOACOES' ? 'active' : ''"
                            @click="selecionarTab('DOACOES')">Doações</button>
                    </li>
                    <li class="tabs__item" v-if="acao != null && !acao.campanha">
                        <button class="tabs__button" :class="tab == 'INSCRICOES' ? 'active' : ''"
                            @click="selecionarTab('INSCRICOES')">Inscrições</button>
                    </li>
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'ARQUIVOS' ? 'active' : ''"
                            @click="selecionarTab('ARQUIVOS')">Arquivos</button>
                    </li>
                </ul>
                <form action="#" method="post" v-if="tab == 'DADOS-GERAIS' || tab == 'CONFIGURACOES'">
                    <div class="tabs__content" v-if="tab == 'DADOS-GERAIS'">
                        <div class="form-input-wrapper">
                            <label for="nomeAcao" class="form-input-label">Nome da ação</label>
                            <input type="text" name="nomeAcao" id="nomeAcao" class="form-input" v-if="acao"
                                v-model="acao.nome_acao">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="organizacao" class="form-input-label">Organização</label>
                            <select name="organizacao" id="organizacao" class="form-input">
                                <option value="">Selecione uma organização...</option>
                                <option v-for="organizacao in organizacoes" v-if="acao != null" :value="organizacao.id"
                                    :selected="acao.organizacao_id == organizacao.id">{{ organizacao.nome }}</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <div class="form-input-wrapper">
                                <label for="nivel" class="form-input-label">Nível</label>
                                <select name="nivel" id="nivel" class="form-input">
                                    <option value="">Selecione um nível...</option>
                                    <option value="N1">N1</option>
                                    <option value="N2">N2</option>
                                    <option value="N3">N3</option>
                                    <option value="N4">N4</option>
                                </select>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="fase" class="form-input-label">Fase</label>
                                <select name="fase" id="fase" class="form-input">
                                    <option value="">Selecione uma fase...</option>
                                    <option value="CRIADA">Criada</option>
                                    <option value="EM_ANDAMENTO">Em andamento</option>
                                    <option value="FINALIZADA">Finalizada</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input-wrapper">
                                <label for="fase" class="form-input-label">Tipo</label>
                                <select name="fase" id="fase" class="form-input">
                                    <option value="">Selecione um tipo...</option>
                                    <option value="MENTORIA">Mentoria</option>
                                    <option value="DOACAO">Doação</option>
                                    <option value="ENSINO">Ensino</option>
                                </select>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="formato" class="form-input-label">Formato</label>
                                <select name="formato" id="formato" class="form-input">
                                    <option value="">Selecione um nível...</option>
                                    <option value="PRESENCIAL">Presencial</option>
                                    <option value="REMOTO">Remoto</option>
                                    <option value="HIBRIDO">Híbrido</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input-wrapper">
                                <label for="segmento" class="form-input-label">Segmento</label>
                                <select name="segmento" id="segmento" class="form-input">
                                    <option value="">Selecione um segmento...</option>
                                    <option v-for="segmento in segmentos" v-if="acao != null" :value="segmento.id"
                                        :selected="acao.segmento.id == segmento.id">{{ segmento.nome }}</option>
                                </select>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="vagas" class="form-input-label">Quantidade de vagas</label>
                                <input type="number" name="vagas" id="vagas" class="form-input" v-if="acao != null"
                                    v-model="acao.vagas">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input-wrapper">
                                <label for="inicio" class="form-input-label">Início</label>
                                <input type="date" name="inicio" id="inicio" class="form-input" v-model="nome">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="termino" class="form-input-label">Término </label>
                                <input type="date" name="termino" id="termino" class="form-input" v-model="nome">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Local</label>
                                <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Horário</label>
                                <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input-wrapper">
                                <label for="name" class="form-input-label">Sobre a organização</label>
                                <textarea name="name" id="name" class="form-input"></textarea>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="name" class="form-input-label">Sobre a ação</label>
                                <textarea name="name" id="name" class="form-input"></textarea>
                            </div>
                        </div>
                        <div class="form-input-wrapper">
                            <label for="name" class="form-input-label">Informações adicionais</label>
                            <textarea name="name" id="name" class="form-input"></textarea>
                        </div>
                    </div>
                    <div class="tabs__content" v-if="tab == 'CONFIGURACOES'">
                        <div class="form-row">
                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Habilitar doações?</label>
                                <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Doações públicas</label>
                                <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Tipo de meta</label>
                                <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Meta</label>
                                <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Aceita doações personalizadas?</label>
                                <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Multiplicador</label>
                                <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                            </div>
                        </div>

                        <div class="documento">
                            <div class="documento__solicitado">
                                <i class="bi bi-file-image documento__icone"></i>
                                <p class="documento__nome">Imagem</p>
                            </div>
                            <div class="documento__enviado" v-if="acao != null && acao.imagem != null">
                                <div class="documento__detalhes">
                                    <i class="bi bi-image"></i>
                                    <div class="documento__info">
                                        <p>{{(acao.imagem.split("/imagens/"))[1]}}</p>
                                    </div>
                                </div>
                                <div class="documento__acoes">
                                    <button type="button" @click.prevent="baixarDocumento(0)">
                                        <i class="bi bi-x-circle-fill documento__icone documento__icone--reset"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button class="primary-button" @click.prevent="atualizarEmpresa()">
                        <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                        <span v-show="!carregandoRequisicao">Salvar</span>
                    </button>
                </form>
                <div class="tabs__content" v-if="tab == 'DOACOES'">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <td>Doador</td>
                                <td>Valor</td>
                                <td>Método</td>
                                <td>Status</td>
                                <td>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="doacao in acao.doacaos">
                                <td>{{ doacao.doador.nome }}</td>
                                <td>R$ {{ doacao.valor.toFixed(2).replace(".", ",") }}</td>
                                <td>{{ doacao.metodo.replace("CARTAO_CREDITO", "CRÉDITO") }}</td>
                                <td><span :class="`status status--${doacao.status}`">{{ doacao.status.replace("PAID",
                                    "PAGO").replace("WAITING", "PROCESSANDO").replace("CANCELED", "CANCELADO") }}</span>
                                </td>
                                <td>
                                    <router-link :to="{ name: 'VisualizarDoacao', params: { id: doacao.id } }" class="acao">
                                        <i class="acao__icone bi bi-receipt acao--visualizar"></i>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <p class="doacoes--vazio"
                        v-if="acao.doacaos == null || (acao.doacaos != null && acao.doacaos.length == 0)">
                        Não há doações recebidas até o momento</p>
                </div>
                <div class="tabs__content" v-if="tab == 'INSCRICOES'">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <td>Colaborador</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="inscricao in acao.inscricoes">
                                <td>{{ inscricao.usuario_id }}</td>
                                <td><span :class="`status status--${inscricao.status}`">{{ inscricao.status }}</span></td>
                            </tr>
                        </tbody>
                    </table>

                    <p class="doacoes--vazio"
                        v-if="acao.inscricoes == null || (acao.inscricoes != null && acao.inscricoes.length == 0)">
                        Não há doações recebidas até o momento</p>
                </div>
                <div class="tabs__content" v-if="tab == 'ARQUIVOS'">
                    <div class="documento">
                        <div class="documento__solicitado">
                            <i class="bi bi-file-text documento__icone"></i>
                            <p class="documento__nome">Contrato</p>
                        </div>
                        <div class="documento__enviado" v-if="acao != null && acao.contrato != null">
                            <div class="documento__detalhes">
                                <i class="bi bi-file-pdf-fill"></i>
                                <div class="documento__info">
                                    <p>{{ (acao.contrato.caminho_s3.split("/contratos/"))[1] }}</p>
                                </div>
                            </div>
                            <div class="documento__acoes">
                                <button type="button" @click.prevent="baixarDocumento(0)">
                                    <i class="bi bi-cloud-arrow-down-fill documento__icone documento__icone--download"></i>
                                </button>
                                <button type="button" @click.prevent="baixarDocumento(0)">
                                    <i class="bi bi-x-circle-fill documento__icone documento__icone--reset"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="documento">
                        <div class="documento__solicitado">
                            <i class="bi bi-file-plus documento__icone"></i>
                            <p class="documento__nome">Arquivos</p>
                        </div>
                        <div class="documento__enviado" v-if="acao.arquivos != null" v-for="arquivo in acao.arquivos">
                            <div class="documento__detalhes">
                                <i class="bi bi-file-pdf-fill"></i>
                                <div class="documento__info">
                                    <p>{{ (arquivo.caminho_s3.split("/documentos/"))[1] }}</p>
                                    <p>{{ arquivo.tamanho }} bytes</p>
                                </div>
                            </div>
                            <div class="documento__acoes">
                                <button type="button" @click.prevent="baixarDocumento(0)">
                                    <i class="bi bi-cloud-arrow-down-fill documento__icone documento__icone--download"></i>
                                </button>
                                <button type="button" @click.prevent="baixarDocumento(0)">
                                    <i class="bi bi-x-circle-fill documento__icone documento__icone--reset"></i>
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
import '../../assets/styles/acoes-sociais/editar-acao-voluntariado-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';

export default {
    name: 'EditarAcaoVoluntariadoView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel
    },
    created() {
        this.buscarAcaoVoluntariado(this.$route.params.id);
        this.buscarOrganizacoes();
        this.buscarSegmentos();
    },
    data() {
        return {
            tab: "DADOS-GERAIS",
            acao: null,
            organizacoes: null,
            segmentos: null,
        }
    },
    methods: {
        selecionarTab: function (tab) {
            this.tab = tab;
        },
        buscarOrganizacoes: function () {
            this.carregandoRequisicao = true;

            axios.get("http://localhost:8082/organizacoes")
                .then((response) => {
                    console.log(response);
                    this.organizacoes = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });

            this.carregandoRequisicao = false;
        },
        buscarSegmentos: function () {
            this.carregandoRequisicao = true;

            axios.get(process.env.VUE_APP_API_BASE_URL + "/segmentos")
                .then((response) => {
                    console.log(response);
                    this.segmentos = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });

            this.carregandoRequisicao = false;
        },
        buscarAcaoVoluntariado: function (id) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-voluntariado/" + id)
                .then((response) => {
                    console.log(response.data);
                    var acao = response.data;

                    this.acao = acao;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        atualizarEmpresa: function () {

        }
    }
}
</script>