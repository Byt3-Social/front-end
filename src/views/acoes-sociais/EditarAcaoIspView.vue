<template>
    <Navbar></Navbar>
    <main id="editar-acao-isp-view">
        <Header titulo="Investimento Social Privado" icone="bi bi-wallet2"></Header>
        <Transition>
            <FloatingPanel v-if="erroBuscaAcao">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--info">
                        <i class="alerta__icone bi bi-info-circle-fill"></i>
                        <p class="alerta__message">Não foi possível recuperar as informações da ação</p>
                    </div>
                </template>
            </FloatingPanel>
        </Transition>
        <Transition>
            <FloatingPanel
                v-if="!erroBuscaAcao && acao != null && organizacoes != null && segmentos != null && categorias != null && areas != null && incentivos != null">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--error" v-if="erroAtualizacao">
                        <i class="alerta__icone bi bi-x-circle-fill"></i>
                        <p class="alerta__message">Não foi possível atualizar as informações dessa ação</p>
                    </div>
                    <div class="alerta alerta--sucesso"
                        v-if="!erroAtualizacao && this.$route.query.sucessoAtualizacao && rotaAnterior == null">
                        <i class="alerta__icone bi bi-check-circle-fill"></i>
                        <p class="alerta__message">Ação atualizada com sucesso</p>
                    </div>
                    <div class="alerta alerta--sucesso"
                        v-if="!erroAtualizacao && this.$route.query.sucessoCadastro && rotaAnterior.name == 'CadastrarAcaoIsp'">
                        <i class="alerta__icone bi bi-check-circle-fill"></i>
                        <p class="alerta__message">Ação cadastrada com sucesso</p>
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
                                <label for="acao.nomeAcao" class="form-input-label">Nome da ação</label>
                                <input type="text" name="acao.nomeAcao" id="acao.nomeAcao" class="form-input"
                                    v-model="acao.nomeAcao">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="acao.organizacaoId" class="form-input-label">Organização</label>
                                <select name="acao.organizacaoId" id="acao.organizacaoId" class="form-input"
                                    v-model="acao.organizacaoId">
                                    <option :value="null">Selecione uma organização...</option>
                                    <option v-for="organizacao in organizacoes" :value="organizacao.id"
                                        :selected="acao.organizacaoId == organizacao.id">{{ organizacao.nome }}</option>
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
                                        <option value="CADASTRADO" :selected="acao.status == 'CADASTRADA'">Cadastrada
                                        </option>
                                        <option value="AGUARDANDO_APORTE" :selected="acao.status == 'AGUARDANDO_APORTE'">
                                            Aguardando aporte</option>
                                        <option value="EM_ANDAMENTO" :selected="acao.status == 'EM_ANDAMENTO'">Em andamento
                                        </option>
                                        <option value="FINALIZADO" :selected="acao.status == 'FINALIZADA'">Finalizada
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
                                    <option value="NACIONAL" :selected="acao.abrangencia == 'NACIONAL'">Nacional
                                    </option>
                                    <option value="ESTADUAL" :selected="acao.abrangencia == 'ESTADUAL'">Estadual
                                    </option>
                                    <option value="MUNICIPAL" :selected="acao.abrangencia == 'MUNICIPAL'">Municipal
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
                                        v-model="categoriaId">
                                        <option :value="null" disabled>Selecione uma categoria...</option>
                                        <option :value="categoria.id" v-for="categoria in categorias">{{ categoria.nome }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="acao.area" class="form-input-label">Área</label>
                                    <select name="acao.area" id="acao.area" class="form-input" v-model="areaId">
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
                                <select name="acao.incentivo" id="acao.incentivo" class="form-input" v-model="incentivoId">
                                    <option :value="null" disabled>Selecione um incentivo...</option>
                                    <option :value="incentivo.id" v-for="incentivo in incentivos">{{ incentivo.nome }}
                                    </option>
                                </select>
                            </div>

                            <div class="form-row aporte-wrapper">
                                <div class="form-input-wrapper">
                                    <input type="number" name="acao.aporteInicial" id="acao.aporteInicial"
                                        class="form-input" step="0.01" min="1.00" placeholder="Valor" v-model="aporteValor">
                                </div>
                                <div class="form-input-wrapper">
                                    <input type="date" name="acao.aporteInicial" id="acao.aporteInicial" class="form-input"
                                        v-model="aporteData">
                                </div>
                                <div class="form-input-wrapper">
                                    <button type="button" class="documento__solicitar--button"
                                        @click.prevent="incluirAporte()">Registrar</button>
                                </div>
                            </div>

                            <table class="table table-borderless">
                                <thead>
                                    <tr>
                                        <td>Valor</td>
                                        <td>Data</td>
                                        <td>Ações</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="aporteInicial != null && aporteInicial != ''">
                                        <td>
                                            {{ new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            }).format(aporteInicial) }}
                                        </td>
                                        <td>
                                            {{ (new
                                                Date(acao.createdAt)).toLocaleDateString('pt-BR',
                                                    options) }}
                                        </td>
                                    </tr>
                                    <tr v-for="(aporte, index) in acao.aportes">
                                        <td>
                                            {{ new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            }).format(aporte.valor) }}
                                        </td>
                                        <td>
                                            {{ (new
                                                Date(aporte.data)).toLocaleDateString('pt-BR',
                                                    options) }}
                                        </td>
                                        <td>
                                            <button type="button" class="acao" @click.prevent="excluirAporte(index)">
                                                <i class="bi bi-x-circle-fill acao__icone acao--excluir"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <p class="text-center"
                                v-if="(aporteInicial == null || aporteInicial == '') && acao.aportes.length < 1">
                                Não há registros de aportes</p>
                        </div>

                        <button class="primary-button" @click.prevent="atualizarAcaoIsp(acao.id)">
                            <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                            <span v-show="!carregandoRequisicao">Salvar</span>
                        </button>
                    </form>
                    <div class="tabs__content" v-if="tab == 'ARQUIVOS'">
                        <SingleFileUploader arquivoSolicitado="Contrato" icone="file-text" pasta="contratos"
                            v-model:arquivo="acao.contrato" @excluirArquivo="excluirArquivo($event, 'contrato')"
                            @uploadArquivo="uploadArquivo($event, 'contrato')"
                            @download="downloadArquivo($event, 'contrato')"
                            :pdsign="pdsign != null && acao.contrato != null ? matchProcessoPDSign(acao.contrato.pdsignProcessoId) : null">
                        </SingleFileUploader>

                        <MultiFileUploader arquivoSolicitado="Arquivo" icone="file-plus" pasta="documentos"
                            v-model:arquivos="acao.arquivos" @excluirArquivo="excluirArquivo($event, 'documento')"
                            @uploadArquivo="uploadArquivo($event, 'documento')"
                            @download="downloadArquivo($event, 'documento')"></MultiFileUploader>
                    </div>
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
    name: 'EditarAcaoIspView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
        SingleFileUploader,
        MultiFileUploader,
    },
    created() {
        this.buscarAcaoIsp(this.$route.params.id);
        this.buscarProcessoPDSign(this.$route.params.id);
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
            acao: null,
            organizacoes: null,
            segmentos: null,
            estados: null,
            categorias: null,
            areas: null,
            incentivos: null,
            categoriaId: null,
            areaId: null,
            incentivoId: null,
            locaisImpactados: [],
            aporteInicial: null,
            aporteValor: null,
            aporteData: null,
            pdsign: null,
            options: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            },
            erroBuscaAcao: false,
            erroAtualizacao: false,
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
        buscarProcessoPDSign: function (id) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acao-isp/" + id + "/pdsign")
                .then((response) => {
                    this.pdsign = response.data;
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
        buscarSegmentos: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/segmentos")
                .then((response) => {
                    this.segmentos = response.data;
                })
                .catch(() => {

                });
        },
        buscarCategorias: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/categorias")
                .then((response) => {
                    this.categorias = response.data;
                })
                .catch(() => {

                });
        },
        buscarAreas: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/areas")
                .then((response) => {
                    this.areas = response.data;
                })
                .catch(() => {

                });
        },
        buscarIncentivos: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/incentivos")
                .then((response) => {
                    this.incentivos = response.data;
                })
                .catch(() => {

                });
        },
        buscarEstados: function () {
            axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
                .then((response) => {
                    this.estados = response.data;
                })
                .catch(() => {

                });
        },
        buscarAcaoIsp: function (id) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acoes-isp/" + id)
                .then((response) => {
                    var acao = response.data;
                    this.acao = acao;

                    this.categoriaId = this.acao.categoria != null ? this.acao.categoria.id : null;
                    this.areaId = this.acao.area != null ? this.acao.area.id : null;
                    this.incentivoId = this.acao.incentivo != null ? this.acao.incentivo.id : null;

                    acao.locaisImpactados.forEach(local => {
                        this.locaisImpactados.push(local.local);
                    });

                    this.acao.locaisImpactados = this.locaisImpactados;
                    this.aporteInicial = acao.aporteInicial;
                })
                .catch(() => {
                    this.erroBuscaAcao = true;
                });
        },
        matchProcessoPDSign: function (id) {
            for (let index = 0; index < this.pdsign.length; index++) {
                const processo = this.pdsign[index];

                if (processo.id == id) {
                    return processo;
                }
            }
        },
        incluirAporte: function () {
            if (this.aporteData != null && this.aporteValor != null && this.aporteData != '' && this.aporteValor != '') {
                var aporte = {
                    data: this.aporteData,
                    valor: this.aporteValor
                }

                this.acao.aportes.push(aporte);
            }
        },
        excluirAporte: function (index) {
            this.acao.aportes.splice(index, 1);
        },
        uploadArquivo: function (e, tipo) {
            var body = new FormData();
            body.append('arquivo', e);

            axios.post(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acoes/" + this.acao.id + "/arquivos?acao=isp&upload=" + tipo, body, { "Content-Type": "multipart/form-data" })
                .then((response) => {
                    if (tipo == 'contrato') {
                        this.acao.contrato = response.data;
                        this.pdsign = [
                            { id: this.acao.contrato.pdsignProcessoId, status: 'RUNNING' }
                        ];
                    } else {
                        this.acao.arquivos.push(response.data);
                    }
                })
                .catch(() => {

                });
        },
        excluirArquivo: function (event, tipo) {
            var id;
            if (tipo == 'contrato') {
                id = event;
            } else {
                id = this.acao.arquivos[event].id;
            }

            axios.delete(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acoes/arquivos/" + id + "?tipo=" + tipo)
                .then(() => {
                    if (tipo == 'contrato') {
                        this.acao.contrato = null;
                        this.pdsign = null;
                    } else {
                        this.acao.arquivos.splice(event, 1);
                    }
                })
                .catch(() => {

                });
        },
        downloadArquivo: function (event, tipo) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acoes/arquivos/" + event + "?download=" + tipo)
                .then((response) => {
                    window.location.href = response.data;
                })
                .catch(() => {

                });
        },
        atualizarAcaoIsp: function (id) {
            this.acao.categoria = this.categoriaId;
            this.acao.area = this.areaId;
            this.acao.incentivo = this.incentivoId;

            axios.put(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acoes-isp/" + id, this.acao)
                .then(() => {
                    this.$router.push({ name: 'EditarAcaoIsp', params: { id: id }, query: { sucessoAtualizacao: true, timestamp: Date.now() } });
                })
                .catch((error) => {
                    document.querySelectorAll(".field-error__message").forEach(field => {
                        field.remove();
                    });

                    document.querySelectorAll(".field-error").forEach(field => {
                        field.classList.remove("field-error");
                    });

                    if (error.response && error.response.status != null && error.response.status == 400 && error.response.data != null) {
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

                    this.erroAtualizacao = true;
                    window.scrollTo(0, 0);
                });
        },
    }
}
</script>