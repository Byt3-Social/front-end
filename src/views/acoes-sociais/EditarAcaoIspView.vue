<template>
    <Navbar></Navbar>
    <main id="editar-acao-isp-view">
        <Header titulo="Investimento Social Privado" icone="bi bi-wallet2"></Header>
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
                        <button class="tabs__button" :class="tab == 'FINANCEIRO' ? 'active' : ''"
                            @click="selecionarTab('FINANCEIRO')">Financeiro</button>
                    </li>
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'ARQUIVOS' ? 'active' : ''"
                            @click="selecionarTab('ARQUIVOS')">Arquivos</button>
                    </li>
                </ul>
                <form action="#" method="post" v-if="tab == 'DADOS-GERAIS' || tab == 'FINANCEIRO'">
                    <div class="tabs__content" v-if="tab == 'DADOS-GERAIS'">
                        <div class="form-input-wrapper">
                            <label for="nomeAcao" class="form-input-label">Nome da ação</label>
                            <input type="text" name="nomeAcao" id="nomeAcao" class="form-input">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="organizacao" class="form-input-label">Organização</label>
                            <select name="organizacao" id="organizacao" class="form-input">
                                <option value="">Selecione uma organização...</option>
                                <option v-for="organizacao in organizacoes" :value="organizacao.id">
                                    {{ organizacao.nome }}
                                </option>
                            </select>
                        </div>
                        <div class="form-input-wrapper">
                            <label for="name" class="form-input-label">Descrição</label>
                            <textarea name="name" id="name" class="form-input"></textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Status</label>
                                <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Impacto</label>
                                <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Abrangência</label>
                                <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Locais impactados</label>
                                <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Categoria</label>
                                <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Área</label>
                                <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                            </div>
                        </div>
                    </div>

                    <div class="tabs__content" v-if="tab == 'FINANCEIRO'">
                        <div class="form-row">
                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Tipo de investimento</label>
                                <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Aporte inicial</label>
                                <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                            </div>
                        </div>
                        <div class="form-input-wrapper">
                            <label for="nome" class="form-input-label">Incentivo fiscal</label>
                            <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                        </div>
                    </div>

                    <button class="primary-button" @click.prevent="atualizarEmpresa()">
                        <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                        <span v-show="!carregandoRequisicao">Salvar</span>
                    </button>
                </form>
                <div class="tabs__content" v-if="tab == 'ARQUIVOS'">
                    <div class="documento">
                        <div class="documento__solicitado">
                            <i class="bi bi-file-text documento__icone"></i>
                            <p class="documento__nome">Contrato</p>
                        </div>
                        <div class="documento__enviado">
                            <div class="documento__detalhes">
                                <i class="bi bi-file-pdf-fill"></i>
                                <div class="documento__info">
                                    <p>Nome arquivo.pdf</p>
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
                        <div class="documento__enviado">
                            <div class="documento__detalhes">
                                <i class="bi bi-file-pdf-fill"></i>
                                <div class="documento__info">
                                    <p>Nome arquivo.pdf</p>
                                    <p>10 bytes</p>
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
import '../../assets/styles/acoes-sociais/editar-acao-isp-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';

export default {
    name: 'EditarAcaoIspView',
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
            // axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-voluntariado/" + id)
            //     .then((response) => {
            //         console.log(response.data);
            //         var acao = response.data;

            //         this.acao = acao;
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        },
    }
}
</script>