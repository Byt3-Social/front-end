<template>
    <Navbar></Navbar>
    <main id="visualizar-acompanhamento-view">
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
                    <div class="alerta alerta--error" v-if="erroCadastro">
                        <i class="alerta__icone bi bi-x-circle-fill"></i>
                        <p class="alerta__message">Não foi possível editar as informações dessa organização</p>
                    </div>
                    <ul class="tabs">
                        <li class="tabs__item">
                            <button class="tabs__button" :class="tab == 'INDICADORES' ? 'active' : ''"
                                @click="selecionarTab('INDICADORES')">Indicadores</button>
                        </li>
                        <li class="tabs__item">
                            <button class="tabs__button" :class="tab == 'REUNIOES' ? 'active' : ''"
                                @click="selecionarTab('REUNIOES')">Reuniões</button>
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
                        <div class="bloco">
                            <label class="bloco__atributo">Nome (Representante)</label>
                            <p class="bloco__atributo--preenchido">
                                {{ acompanhamento.representante != null ? (acompanhamento.representante.nome != null ?
                                    acompanhamento.representante.nome : 'Não preenchido') : 'Não preenchido' }}
                            </p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Email (Representante)</label>
                            <p class="bloco__atributo--preenchido">
                                {{ acompanhamento.representante != null ? (acompanhamento.representante.email != null ?
                                    acompanhamento.representante.email : 'Não preenchido') : 'Não preenchido' }}
                            </p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Telefone (Representante)</label>
                            <p class="bloco__atributo--preenchido">
                                {{ acompanhamento.representante != null ?
                                    (acompanhamento.representante.telefone != null ?
                                        utils.telefoneMask(acompanhamento.representante.telefone) : 'Não preenchido') :
                                    'Não preenchido' }}
                            </p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Cargo (Representante)</label>
                            <p class="bloco__atributo--preenchido">
                                {{ acompanhamento.representante != null ? (acompanhamento.representante.cargo != null ?
                                    acompanhamento.representante.cargo : 'Não preenchido') : 'Não preenchido' }}
                            </p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Criado em</label>
                            <p class="bloco__atributo--preenchido">{{ (new
                                Date(acompanhamento.createdAt)).toLocaleDateString('pt-BR', options) }}</p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Última atualização</label>
                            <p class="bloco__atributo--preenchido">{{ (new
                                Date(acompanhamento.updatedAt)).toLocaleDateString('pt-BR', options) }}</p>
                        </div>
                        <div class="bloco info-adicional">
                            <label class="bloco__atributo">Informações adicionais</label>
                            <p class="bloco__atributo--preenchido">{{ acompanhamento.informacoesAdicionais != null &&
                                acompanhamento.informacoesAdicionais != '' ? acompanhamento.informacoesAdicionais : 'Não preenchido' }}</p>
                        </div>

                        <hr class="divisor">

                        <div class="bloco" v-for="indicador in acompanhamento.indicadoresSolicitados">
                            <label class="bloco__atributo">{{ indicador.indicador.nome }}</label>
                            <p class="bloco__atributo--preenchido">{{ indicador.valor != null && indicador.valor != '' ?
                                indicador.valor : 'Não preenchido' }}</p>
                        </div>
                    </div>
                    <div class="tabs__content" v-if="tab == 'REUNIOES'">
                        <button class="primary-button solicitar-reuniao" @click.prevent="atualizarEmpresa()">
                            Solicitar reunião
                        </button>
                        <div class="reuniao">
                            <i class="bi bi-microsoft-teams"></i>
                            <div class="reuniao__detalhes">
                                <p>Microsoft Teams</p>
                                <p>Aguardando agendamento</p>
                            </div>
                        </div>
                        <div class="reuniao">
                            <i class="bi bi-microsoft-teams"></i>
                            <div class="reuniao__detalhes">
                                <p>Microsoft Teams</p>
                                <p>11 de outubro de 2023 às 20:30</p>
                                <a href="#">Entrar na reunião</a>
                            </div>
                        </div>
                        <div class="reuniao">
                            <i class="bi bi-microsoft-teams"></i>
                            <div class="reuniao__detalhes">
                                <p>Microsoft Teams</p>
                                <p>11 de outubro de 2023 às 20:30</p>
                                <p>Acesso expirado</p>
                            </div>
                        </div>
                    </div>
                    <div class="tabs__content" v-if="tab == 'ARQUIVOS'">
                        <MultiFileUploader arquivoSolicitado="Arquivo" icone="file-plus" pasta="arquivos"
                            v-model:arquivos="acompanhamento.arquivos" @excluirArquivo="excluirArquivo($event, 'documento')"
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
import '../../assets/styles/acompanhamento/visualizar-acompanhamento-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';
import utils from '@/helpers/maska';
import MultiFileUploader from '@/components/MultiFileUploader.vue';

export default {
    name: 'VisualizarAcompanhamentoView',
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
        }
    },
    methods: {
        selecionarTab: function (tab) {
            this.tab = tab;
        },
        buscarAcoes: function () {
            axios.get("http://localhost:8081/acoes-isp")
                .then((response) => {
                    console.log(response);
                    this.acoes = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        buscarOrganizacoes: function () {
            axios.get("http://localhost:8082/organizacoes")
                .then((response) => {
                    console.log(response);
                    this.organizacoes = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        buscarAcompanhamento: function (id) {
            axios.get("http://localhost:8083/acompanhamentos/" + id)
                .then((response) => {
                    this.acompanhamento = response.data;
                    console.log(response.data);
                })
                .catch((error) => {
                    this.erroBuscaAcompanhamento = true;
                    console.log(error);
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