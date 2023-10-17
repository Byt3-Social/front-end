<template>
    <Navbar></Navbar>
    <main id="editar-acao-isp-view">
        <Header titulo="Investimento Social Privado" icone="bi bi-wallet2"></Header>
        <Transition>
            <FloatingPanel
                v-if="organizacoes != null && segmentos != null && categorias != null && areas != null && incentivos != null">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--error" v-if="erroCadastro">
                        <i class="alerta__icone bi bi-x-circle-fill"></i>
                        <p class="alerta__message">Não foi possível atualizar as informações dessa ação</p>
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
                    </ul>
                    <form action="#" method="post" v-if="tab == 'DADOS-GERAIS' || tab == 'FINANCEIRO'">
                        <div class="tabs__content" v-if="tab == 'DADOS-GERAIS'">
                            <div class="form-input-wrapper">
                                <label for="acao.nomeAcao" class="form-input-label">Nome da ação</label>
                                <input type="text" name="acao.nomeAcao" id="acao.nomeAcao" class="form-input"
                                    v-model="acao.nomeAcao" autofocus>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="acao.organizacaoId" class="form-input-label">Organização</label>
                                <select name="acao.organizacaoId" id="acao.organizacaoId" class="form-input"
                                    v-model="acao.organizacaoId">
                                    <option :value="null">Selecione uma organização...</option>
                                    <option v-for="organizacao in organizacoes" :value="organizacao.id">{{ organizacao.nome
                                    }}</option>
                                </select>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="acao.descricao" class="form-input-label">Descrição</label>
                                <textarea name="acao.descricao" id="acao.descricao" class="form-input"
                                    v-model="acao.descricao"></textarea>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="acao.status" class="form-input-label">Status</label>
                                    <select name="acao.status" id="acao.status" class="form-input" v-model="acao.status">
                                        <option :value="null" disabled>Selecione um status...</option>
                                        <option value="CADASTRADO">Cadastrada
                                        </option>
                                        <option value="AGUARDANDO_APORTE">
                                            Aguardando aporte</option>
                                        <option value="EM_ANDAMENTO">Em andamento
                                        </option>
                                        <option value="FINALIZADO">Finalizada
                                        </option>
                                    </select>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="acao.qtdePessoasImpactadas" class="form-input-label">Quantidade de pessoas
                                        impactadas</label>
                                    <input type="number" name="acao.qtdePessoasImpactadas" id="acao.qtdePessoasImpactadas"
                                        class="form-input" v-model="acao.qtdePessoasImpactadas">
                                </div>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="acao.abrangencia" class="form-input-label">Abrangência</label>
                                <select name="acao.abrangencia" id="acao.abrangencia" class="form-input"
                                    v-model="acao.abrangencia">
                                    <option :value="null" disabled>Selecione uma abrangência...</option>
                                    <option value="NACIONAL">Nacional
                                    </option>
                                    <option value="ESTADUAL">Estadual
                                    </option>
                                    <option value="MUNICIPAL">Municipal
                                    </option>
                                </select>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="acao.locaisImpactados" class="form-input-label">Locais impactados</label>
                                <select name="acao.locaisImpactados" id="acao.locaisImpactados" class="form-input"
                                    v-model="acao.locaisImpactados" multiple>
                                    <option value="BR">Brasil</option>
                                    <option :value="estado.sigla" v-for="estado in estados">{{ estado.nome }}</option>
                                </select>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="acao.categoria" class="form-input-label">Categoria</label>
                                    <select name="acao.categoria" id="acao.categoria" class="form-input"
                                        v-model="acao.categoria">
                                        <option :value="null" disabled>Selecione uma categoria...</option>
                                        <option :value="categoria.id" v-for="categoria in categorias">{{ categoria.nome }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="acao.area" class="form-input-label">Área</label>
                                    <select name="acao.area" id="acao.area" class="form-input" v-model="acao.area">
                                        <option :value="null" disabled>Selecione uma área...</option>
                                        <option :value="area.id" v-for="area in areas">{{ area.nome }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="tabs__content" v-if="tab == 'FINANCEIRO'">
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="acao.tipoInvestimento" class="form-input-label">Tipo de investimento</label>
                                    <select name="acao.tipoInvestimento" id="acao.tipoInvestimento" class="form-input"
                                        v-model="acao.tipoInvestimento">
                                        <option :value="null" disabled>Selecione o método de investimento...</option>
                                        <option value="PRIVADO">Privado</option>
                                        <option value="INCENTIVO">Fundo/Incentivo fiscal</option>
                                    </select>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="acao.aporteInicial" class="form-input-label">Aporte inicial</label>
                                    <input type="number" name="acao.aporteInicial" id="acao.aporteInicial"
                                        class="form-input" v-model="acao.aporteInicial" step="0.01" min="1.00">
                                </div>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="acao.incentivo" class="form-input-label">Incentivo fiscal</label>
                                <select name="acao.incentivo" id="acao.incentivo" class="form-input"
                                    v-model="acao.incentivo">
                                    <option :value="null" disabled>Selecione um incentivo...</option>
                                    <option :value="incentivo.id" v-for="incentivo in incentivos">{{ incentivo.nome }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <button class="primary-button" @click.prevent="cadastrarAcaoIsp()">
                            <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                            <span v-show="!carregandoRequisicao">Cadastrar</span>
                        </button>
                    </form>
                </template>
            </FloatingPanel>
        </Transition>
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
import SingleFileUploader from '@/components/SingleFileUploader.vue';
import MultiFileUploader from '@/components/MultiFileUploader.vue';

export default {
    name: 'CadastrarAcaoIspView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
        SingleFileUploader,
        MultiFileUploader,
    },
    created() {
        this.buscarOrganizacoes();
        this.buscarSegmentos();
        this.buscarAreas();
        this.buscarCategorias();
        this.buscarIncentivos();
        this.buscarEstados();
    },
    data() {
        return {
            tab: "DADOS-GERAIS",
            acao: {
                nomeAcao: null,
                descricao: null,
                abrangencia: null,
                tipoInvestimento: null,
                qtdePessoasImpactadas: null,
                aporteInicial: null,
                status: null,
                organizacaoId: null,
                categoria: null,
                area: null,
                incentivo: null,
                locaisImpactados: [],
            },
            organizacoes: null,
            segmentos: null,
            estados: null,
            categorias: null,
            areas: null,
            incentivos: null,
            erroBuscaAcao: false,
            erroCadastro: false,
        }
    },
    methods: {
        selecionarTab: function (tab) {
            this.tab = tab;
        },
        buscarOrganizacoes: function () {
            axios.get("http://localhost:8082/organizacoes")
                .then((response) => {
                    this.organizacoes = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        buscarSegmentos: function () {
            axios.get("http://localhost:8081/segmentos")
                .then((response) => {
                    this.segmentos = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        buscarCategorias: function () {
            axios.get("http://localhost:8081/categorias")
                .then((response) => {
                    this.categorias = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        buscarAreas: function () {
            axios.get("http://localhost:8081/areas")
                .then((response) => {
                    this.areas = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        buscarIncentivos: function () {
            axios.get("http://localhost:8081/incentivos")
                .then((response) => {
                    this.incentivos = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        buscarEstados: function () {
            axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
                .then((response) => {
                    console.log(response.data);
                    this.estados = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        cadastrarAcaoIsp: function () {
            axios.post("http://localhost:8081/acoes-isp", this.acao)
                .then((response) => {
                    this.$router.push({ name: 'EditarAcaoIsp', params: { id: response.data }, query: { sucessoCadastro: true, timestamp: Date.now() } });
                })
                .catch((error) => {
                    console.log(error);
                    this.erroCadastro = true;
                    window.scrollTo(0, 0);

                    document.querySelectorAll(".field-error__message").forEach(field => {
                        field.remove();
                    });

                    document.querySelectorAll(".field-error").forEach(field => {
                        field.classList.remove("field-error");
                    });

                    if (error.response.status != null && error.response.status == 400 && error.response.data != null) {
                        error.response.data.forEach(fieldError => {
                            var campo = document.getElementById("acao." + fieldError.field);

                            if (campo != null) {
                                var span = document.createElement("span");
                                span.classList.add("field-error__message");
                                span.innerText = fieldError.message;

                                campo.after(span);
                                campo.classList.add("field-error");
                            }
                        });
                    }
                });
        },
    }
}
</script>