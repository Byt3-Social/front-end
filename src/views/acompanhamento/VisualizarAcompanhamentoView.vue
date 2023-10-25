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
                    <div class="alerta alerta--sucesso" v-if="this.$route.query.sucessoSolicitacao && rotaAnterior == null">
                        <i class="alerta__icone bi bi-check-circle-fill"></i>
                        <p class="alerta__message">Reunião solicitada com sucesso</p>
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
                                {{ acompanhamento.representante != null ? (acompanhamento.representante.nome != null &&
                                    acompanhamento.representante.nome != '' ?
                                    acompanhamento.representante.nome : 'Não preenchido') : 'Não preenchido' }}
                            </p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Email (Representante)</label>
                            <p class="bloco__atributo--preenchido">
                                {{ acompanhamento.representante != null ? (acompanhamento.representante.email != null &&
                                    acompanhamento.representante.nome != '' ?
                                    acompanhamento.representante.email : 'Não preenchido') : 'Não preenchido' }}
                            </p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Telefone (Representante)</label>
                            <p class="bloco__atributo--preenchido">
                                {{ acompanhamento.representante != null ?
                                    (acompanhamento.representante.telefone != null && acompanhamento.representante.nome != '' ?
                                        utils.telefoneMask(acompanhamento.representante.telefone) : 'Não preenchido') :
                                    'Não preenchido' }}
                            </p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Cargo (Representante)</label>
                            <p class="bloco__atributo--preenchido">
                                {{ acompanhamento.representante != null && acompanhamento.representante.nome != '' ?
                                    (acompanhamento.representante.cargo != null ?
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
                            <p class="bloco__atributo--preenchido">
                                {{ acompanhamento.informacoesAdicionais != null &&
                                    acompanhamento.informacoesAdicionais != '' ? acompanhamento.informacoesAdicionais :
                                    'Não informada' }}
                            </p>
                        </div>

                        <hr class="divisor">

                        <div class="bloco" v-for="indicador in acompanhamento.indicadoresSolicitados">
                            <label class="bloco__atributo">{{ indicador.indicador.nome }}</label>
                            <p class="bloco__atributo--preenchido">{{ indicador.valor != null && indicador.valor != '' ?
                                indicador.valor : 'Não preenchido' }}</p>
                        </div>
                    </div>
                    <div class="tabs__content" v-if="tab == 'REUNIOES'">
                        <ul class="tabs">
                            <li class="tabs__item">
                                <button class="tabs__button" :class="subTab == 'SOLICITAR' ? 'active' : ''"
                                    @click="selecionarSubTab('SOLICITAR')">Solicitar</button>
                            </li>
                            <li class="tabs__item">
                                <button class="tabs__button" :class="subTab == 'SOLICITADAS' ? 'active' : ''"
                                    @click="selecionarSubTab('SOLICITADAS')">Solicitadas</button>
                            </li>
                        </ul>

                        <div class="tabs__content" v-if="subTab == 'SOLICITAR'">
                            <Transition>
                                <div class="disponibilidade">
                                    <label for="#">Informe as opções de horários disponíveis para realizar a reunião</label>
                                    <div class="form-row data-horario-wrapper">
                                        <div class="form-input-wrapper">
                                            <input type="date" name="reuniao.data" id="reuniao.data" class="form-input"
                                                v-model="reuniao.data">
                                        </div>
                                        <div class="form-input-wrapper">
                                            <input type="text" name="reuniao.horario" id="reuniao.horario"
                                                class="form-input" placeholder="Horário" v-maska="horario"
                                                data-maska="##:##" v-model="reuniao.horario">
                                        </div>
                                        <div class="form-input-wrapper">
                                            <button type="button" class="documento__solicitar--button"
                                                @click.prevent="incluirDisponibilidade()">Incluir</button>
                                        </div>
                                    </div>

                                    <table class="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col">Disponibilidade</th>
                                                <th scope="col">Remover</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(disponibilidade, index) in disponibilidadeReuniao">
                                                <td>{{ (new Date(disponibilidade)).toLocaleDateString('pt-BR', options) }}
                                                </td>
                                                <td>
                                                    <button type="button" class="acao"
                                                        @click.prevent="removerDisponibilidade(index)">
                                                        <i class="bi bi-x-circle-fill acao__icone acao--excluir"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p class="text-center" v-if="this.disponibilidadeReuniao.length < 1">
                                        Não há horários disponíveis</p>
                                </div>
                            </Transition>
                            <button class="primary-button solicitar-reuniao" @click.prevent="solicitarReuniao()"
                                v-if="disponibilidadeReuniao.length > 0">
                                <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                                <span v-show="!carregandoRequisicao">Solicitar reunião</span>
                            </button>
                        </div>
                        <div class="tabs__content" v-if="subTab == 'SOLICITADAS'">
                            <div class="reuniao" v-for="reuniao in this.acompanhamento.reunioes">
                                <i class="bi bi-microsoft-teams"></i>
                                <div class="reuniao__detalhes">
                                    <p>Microsoft Teams</p>
                                    <p v-if="reuniao.status == 'SOLICITADA'">Aguardando agendamento</p>
                                    <p v-if="reuniao.status == 'AGENDADA'">{{ (new
                                        Date(encontrarHorario(reuniao.horarios))).toLocaleDateString('pt-BR', options)
                                    }}</p>
                                    <a :href="reuniao.link" target="__blank"
                                        v-if="reuniao.status == 'AGENDADA' && addHours(encontrarHorario(reuniao.horarios), 2) > Date.now()">
                                        Entrar na reunião
                                    </a>
                                    <p
                                        v-if="reuniao.status == 'AGENDADA' && addHours(encontrarHorario(reuniao.horarios), 2) < Date.now()">
                                        Acesso expirado</p>
                                </div>
                            </div>

                            <p class="text-center disponibilidade" v-if="this.acompanhamento.reunioes.length < 1">
                                Não há reuniões registradas para esse acompanhamento</p>
                        </div>
                    </div>
                    <div class="tabs__content" v-if="tab == 'ARQUIVOS'">
                        <MultiFileUploader arquivoSolicitado="Arquivo" icone="file-plus" pasta="arquivos"
                            v-model:arquivos="acompanhamento.arquivos" @excluirArquivo="excluirArquivo($event)"
                            :disabled="true" @download="downloadArquivo($event)"></MultiFileUploader>
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
            subTab: 'SOLICITAR',
            acompanhamento: null,
            organizacoes: null,
            acoes: null,
            reuniao: {
                data: null,
                horario: null
            },
            disponibilidadeReuniao: [],
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
        selecionarSubTab: function (tab) {
            this.subTab = tab;
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
        excluirArquivo: function (event) {
            axios.delete(process.env.VUE_APP_API_BASE_URL + "/acompanhamento/acompanhamentos/arquivos/" + this.acompanhamento.arquivos[event].id)
                .then(() => {
                    this.acompanhamento.arquivos.splice(event, 1);
                })
                .catch(() => {

                });
        },
        downloadArquivo: function (event) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acompanhamento/acompanhamentos/arquivos/" + event)
                .then((response) => {
                    window.location.href = response.data;
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
        addHours: function addHours(date, hours) {
            const dateCopy = new Date(date);

            dateCopy.setHours(dateCopy.getHours() + hours);

            return dateCopy;
        },
        encontrarHorario: function (horarios) {
            for (let index = 0; index < horarios.length; index++) {
                const horario = horarios[index];

                if (horario.escolhido == true) {
                    return horario.dataHorario;
                }
            }
        },
        incluirDisponibilidade: function () {
            if (this.reuniao.data != null && this.reuniao.horario != null) {
                var horario = this.reuniao.data + "T" + this.reuniao.horario;
                this.disponibilidadeReuniao.push(new Date(horario));
                this.reuniao.data = null;
                this.reuniao.horario = null;
            }
        },
        removerDisponibilidade: function (index) {
            this.disponibilidadeReuniao.splice(index, 1);
        },
        solicitarReuniao: function () {
            this.carregandoRequisicao = true;

            var body = {
                acompanhamentoId: this.acompanhamento.id,
                disponibilidades: this.disponibilidadeReuniao
            }

            axios.post(process.env.VUE_APP_API_BASE_URL + "/acompanhamento/reunioes", body)
                .then(() => {
                    this.carregandoRequisicao = false;
                    this.$router.push({ name: 'VisualizarAcompanhamento', params: { id: this.acompanhamento.id }, query: { sucessoSolicitacao: true, timestamp: Date.now() } });
                })
                .catch((error) => {
                    this.carregandoRequisicao = false;
                })
        }
    }
}
</script>