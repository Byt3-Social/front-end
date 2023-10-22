<template>
    <Navbar></Navbar>
    <main id="editar-acao-voluntariado-view">
        <Header titulo="Voluntariado" icone="bi bi-collection-fill"></Header>
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
                v-if="!erroBuscaAcao && acao != null && organizacoes != null && segmentos != null && estatisticas != null">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--error" v-if="erroAtualizacao">
                        <i class="alerta__icone bi bi-x-circle-fill"></i>
                        <p class="alerta__message">Não foi possível atualizar as informações dessa ação</p>
                    </div>
                    <div class="alerta alerta--sucesso" v-if="this.$route.query.sucessoAtualizacao && rotaAnterior == null">
                        <i class="alerta__icone bi bi-check-circle-fill"></i>
                        <p class="alerta__message">Ação atualizada com sucesso</p>
                    </div>
                    <div class="alerta alerta--sucesso"
                        v-if="this.$route.query.sucessoCadastro && rotaAnterior.name == 'CadastrarAcaoVoluntariado'">
                        <i class="alerta__icone bi bi-check-circle-fill"></i>
                        <p class="alerta__message">Ação cadastrada com sucesso</p>
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
                    <form action="#" method="post"
                        v-if="tab == 'DADOS-GERAIS' || tab == 'CONFIGURACOES' || tab == 'DOACOES'">
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
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="acao.nivel" class="form-input-label">Nível</label>
                                    <select name="acao.nivel" id="acao.nivel" class="form-input" v-model="acao.nivel">
                                        <option :value="null" disabled>Selecione um nível...</option>
                                        <option value="N1" :selected="acao.nivel == 'N1'">N1</option>
                                        <option value="N2" :selected="acao.nivel == 'N2'">N2</option>
                                        <option value="N3" :selected="acao.nivel == 'N3'">N3</option>
                                        <option value="N4" :selected="acao.nivel == 'N4'">N4</option>
                                    </select>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="acao.fase" class="form-input-label">Fase</label>
                                    <select name="acao.fase" id="acao.fase" class="form-input" v-model="acao.fase">
                                        <option :value="null" disabled>Selecione uma fase...</option>
                                        <option value="CRIADA" :selected="acao.fase == 'CRIADA'">Criada</option>
                                        <option value="EM_ANDAMENTO" :selected="acao.fase == 'EM_ANDAMENTO'">Em andamento
                                        </option>
                                        <option value="FINALIZADA" :selected="acao.fase == 'FINALIZADA'">Finalizada</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="acao.tipo" class="form-input-label">Tipo</label>
                                    <select name="acao.tipo" id="acao.tipo" class="form-input" v-model="acao.tipo">
                                        <option :value="null" disabled>Selecione um tipo...</option>
                                        <option value="MENTORIA" :selected="acao.tipo == 'MENTORIA'">Mentoria</option>
                                        <option value="DOACAO" :selected="acao.tipo == 'DOACAO'">Doação</option>
                                        <option value="ENSINO" :selected="acao.tipo == 'ENSINO'">Ensino</option>
                                    </select>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="acao.formato" class="form-input-label">Formato</label>
                                    <select name="acao.formato" id="acao.formato" class="form-input" v-model="acao.formato">
                                        <option :value="null" disabled>Selecione um nível...</option>
                                        <option value="PRESENCIAL">Presencial</option>
                                        <option value="REMOTO">Remoto</option>
                                        <option value="HIBRIDO">Híbrido</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="acao.segmento" class="form-input-label">Segmento</label>
                                    <select name="acao.segmento" id="acao.segmento" class="form-input"
                                        v-model="acao.segmento.id">
                                        <option value="0" disabled>Selecione um segmento...</option>
                                        <option v-for="segmento in segmentos" :value="segmento.id">{{ segmento.nome }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="acao.vagas" class="form-input-label">Quantidade de vagas</label>
                                    <input type="number" name="acao.vagas" id="acao.vagas" class="form-input"
                                        v-model="acao.vagas">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="acao.inicio" class="form-input-label">Início</label>
                                    <input type="date" name="acao.inicio" id="acao.inicio" class="form-input"
                                        v-model="acao.dataInicio">
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="acao.termino" class="form-input-label">Término </label>
                                    <input type="date" name="acao.termino" id="acao.termino" class="form-input"
                                        v-model="acao.dataTermino">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="acao.local" class="form-input-label">Local</label>
                                    <input type="text" name="acao.local" id="acao.local" class="form-input"
                                        v-model="acao.local">
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="acao.horario" class="form-input-label">Horário</label>
                                    <input type="text" name="acao.horario" id="acao.horario" class="form-input"
                                        v-model="acao.horario" v-maska="horario" data-maska="##:##">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="acao.sobreOrganizacao" class="form-input-label">Sobre a organização</label>
                                    <textarea name="acao.sobreOrganizacao" id="acao.sobreOrganizacao" class="form-input"
                                        v-model="acao.sobreOrganizacao"></textarea>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="acao.sobreAcao" class="form-input-label">Sobre a ação</label>
                                    <textarea name="acao.sobreAcao" id="acao.sobreAcao" class="form-input"
                                        v-model="acao.sobreAcao"></textarea>
                                </div>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="acao.informacoesAdicionais" class="form-input-label">Informações
                                    adicionais</label>
                                <textarea name="acao.informacoesAdicionais" id="acao.informacoesAdicionais"
                                    class="form-input" v-model="acao.informacoesAdicionais"></textarea>
                            </div>
                        </div>
                        <div class="tabs__content" v-if="tab == 'CONFIGURACOES'">
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="acao.url" class="form-input-label">URL</label>
                                    <input type="text" name="acao.url" id="acao.url" class="form-input" v-model="acao.url"
                                        disabled>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="acao.campanha" class="form-input-label">Habilitar doações?</label>
                                    <select name="acao.campanha" id="acao.campanha" v-model="acao.campanha"
                                        class="form-input">
                                        <option :value="null" disabled>Escolha uma opção...</option>
                                        <option :value="false" :selected="acao.campanha == false">Não</option>
                                        <option :value="true" :selected="acao.campanha == true">Sim</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="acao.tipoMeta" class="form-input-label">Tipo de meta</label>
                                    <select name="acao.tipoMeta" id="acao.tipoMeta" class="form-input"
                                        v-model="acao.tipoMeta">
                                        <option :value="null" disabled>Escolha uma opção...</option>
                                        <option value="DOACOES" :disabled="!this.acao.campanha">Doações</option>
                                        <option value="INSCRITOS">Inscritos</option>
                                        <option value="VALOR" :disabled="!this.acao.campanha">Valor arrecadado</option>
                                    </select>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="acao.meta" class="form-input-label">Meta</label>
                                    <input type="number" name="acao.meta" id="acao.meta" class="form-input"
                                        v-model="acao.meta">
                                </div>
                            </div>

                            <ImagemFileUploader arquivoSolicitado="Imagem" v-model:urlImagem="acao.imagem"
                                @uploadImagem="uploadImagem" @excluirImagem="excluirImagem()"></ImagemFileUploader>
                        </div>
                        <div class="tabs__content" v-if="tab == 'DOACOES'">
                            <ul class="tabs">
                                <li class="tabs__item">
                                    <button type="button" class="tabs__button"
                                        :class="subTab == 'ESTATISTICAS' ? 'active' : ''"
                                        @click.prevent="selecionarSubTab('ESTATISTICAS')">Estatísticas</button>
                                </li>
                                <li class="tabs__item">
                                    <button type="button" class="tabs__button" :class="subTab == 'DOACOES' ? 'active' : ''"
                                        @click.prevent="selecionarSubTab('DOACOES')">Doações</button>
                                </li>
                                <li class="tabs__item">
                                    <button type="button" class="tabs__button" :class="subTab == 'AJUSTES' ? 'active' : ''"
                                        @click.prevent="selecionarSubTab('AJUSTES')">Ajustes</button>
                                </li>
                            </ul>

                            <div class="tabs__content" v-if="subTab == 'ESTATISTICAS'">
                                <div class="cards">
                                    <div class="card-item">
                                        <p class="card__titulo">Arrecadado</p>
                                        <p class="card__valor">
                                            {{ new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            }).format(estatisticas.arrecadado.valor) }}
                                        </p>
                                        <p>
                                            {{ estatisticas.arrecadado.quantidade }} doações
                                        </p>
                                    </div>
                                    <div class="card-item">
                                        <p class="card__titulo">Processando</p>
                                        <p class="card__valor">
                                            {{ new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            }).format(estatisticas.processando.valor) }}
                                        </p>
                                        <p>
                                            {{ estatisticas.processando.quantidade }} doações
                                        </p>
                                    </div>
                                    <div class="card-item">
                                        <p class="card__titulo">Cancelada</p>
                                        <p class="card__valor">
                                            {{ new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            }).format(estatisticas.cancelado.valor) }}
                                        </p>
                                        <p>
                                            {{ estatisticas.cancelado.quantidade }} doações
                                        </p>
                                    </div>
                                </div>

                                <div class="graficos">
                                    <div>
                                        <apexchart width="500" type="line" :options="options" :series="series"></apexchart>
                                        <p class="text-center">
                                            <strong>Total arrecadado x Dia</strong>
                                        </p>
                                    </div>
                                    <div>
                                        <apexchart width="500" type="pie" :options="optionsDonut" :series="seriesDonut">
                                        </apexchart>
                                        <p class="text-center">
                                            <strong>Pencentual de doações por método de pagamento</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="tabs__content" v-if="subTab == 'DOACOES'">
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
                                            <td>
                                                {{ new Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                }).format(doacao.valor) }}
                                            </td>
                                            <td>{{ doacao.metodo.replace("CARTAO_CREDITO", "CRÉDITO") }}</td>
                                            <td><span :class="`status status--${doacao.status}`">{{
                                                doacao.status.replace("PAID",
                                                    "PAGO").replace("WAITING", "PROCESSANDO").replace("CANCELED",
                                                        "CANCELADO")
                                            }}</span>
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'VisualizarDoacao', params: { id: doacao.id } }"
                                                    class="acao">
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
                            <div class="tabs__content" v-if="subTab == 'AJUSTES'">
                                <div class="form-input-wrapper">
                                    <label for="acao.publica" class="form-input-label">Doações públicas</label>
                                    <select name="acao.publica" id="acao.publica" class="form-input" v-model="acao.publica">
                                        <option :value="null" disabled>Escolha uma opção...</option>
                                        <option :value="false" :selected="acao.publica == false">Não</option>
                                        <option :value="true" :selected="acao.publica == true">Sim</option>
                                    </select>
                                </div>

                                <div class="form-row">
                                    <div class="form-input-wrapper">
                                        <label for="acao.valorPersonalizado" class="form-input-label">Aceita doações
                                            personalizadas?</label>
                                        <select name="acao.valorPersonalizado" class="form-input"
                                            id="acao.valorPersonalizado" v-model="acao.valorPersonalizado">
                                            <option :value="null" disabled>Escolha uma opção...</option>
                                            <option :value="false" :selected="acao.valorPersonalizado == false">Não</option>
                                            <option :value="true" :selected="acao.valorPersonalizado == true">Sim</option>
                                        </select>
                                    </div>
                                    <div class="form-input-wrapper">
                                        <label for="acao.multiplicador" class="form-input-label">Multiplicador</label>
                                        <input type="number" name="acao.multiplicador" id="acao.multiplicador"
                                            class="form-input" v-model="acao.multiplicador">
                                    </div>
                                </div>

                                <div class="opcao-contribuicao-wrapper">
                                    <div class="form-input-wrapper">
                                        <label for="opcao.valor" class="form-input-label">Valor</label>
                                        <input type="number" name="opcao.valor" id="opcao.valor" class="form-input"
                                            v-model="opcao.valor" step="0.01" min="1.00" placeholder="Ex: 10,00">
                                    </div>
                                    <div class="form-input-wrapper">
                                        <label for="opcao.descricao" class="form-input-label">Descrição</label>
                                        <input type="text" name="opcao.descricao" id="opcao.descricao" class="form-input"
                                            v-model="opcao.descricao" placeholder="Opcional">
                                    </div>
                                    <div class="form-input-wrapper">
                                        <button class="primary-button incluir-opcao"
                                            @click.prevent="incluirOpcaoContribuicao()">
                                            Incluir
                                        </button>
                                    </div>
                                </div>

                                <table class="table table-borderless">
                                    <thead>
                                        <tr>
                                            <td>Valor</td>
                                            <td>Remover</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(opcao, index) in acao.opcoesContribuicao">
                                            <td>
                                                <p class="opcao__valor">
                                                    {{ new Intl.NumberFormat('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    }).format(opcao.valor) }}
                                                </p>
                                                <p v-if="opcao.descricao != null && opcao.descricao != ''">{{
                                                    opcao.descricao }}</p>
                                            </td>
                                            <td>
                                                <button type="button" class="acao"
                                                    @click.prevent="removerOpcaoContribuicao(index)">
                                                    <i class="bi bi-x-circle-fill acao__icone acao--excluir"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr v-if="this.acao.valorPersonalizado">
                                            <td>Aceita valor personalizado</td>
                                            <td>-</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p class="text-center"
                                    v-if="this.acao.opcoesContribuicao.length < 1 && !this.acao.valorPersonalizado">
                                    Não há valores de contribuição disponíveis</p>
                            </div>
                        </div>
                        <button class="primary-button" @click.prevent="atualizarAcaoVoluntariado(acao.id)"
                            v-if="tab == 'DADOS-GERAIS' || tab == 'CONFIGURACOES' || (tab == 'DOACOES' && subTab == 'AJUSTES')">
                            <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                            <span v-show="!carregandoRequisicao">Salvar</span>
                        </button>
                    </form>
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
                                    <td><span :class="`status status--${inscricao.status}`">{{ inscricao.status }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <p class="doacoes--vazio"
                            v-if="acao.inscricoes == null || (acao.inscricoes != null && acao.inscricoes.length == 0)">
                            Não há inscritos até o momento</p>
                    </div>
                    <div class="tabs__content" v-if="tab == 'ARQUIVOS'">
                        <SingleFileUploader arquivoSolicitado="Contrato" icone="file-text" pasta="contratos"
                            v-model:arquivo="acao.contrato" @excluirArquivo="excluirArquivo($event, 'contrato')"
                            @uploadArquivo="uploadArquivo($event, 'contrato')"
                            @download="downloadArquivo($event, 'contrato')">
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
import '../../assets/styles/acoes-sociais/editar-acao-voluntariado-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';
import ImagemFileUploader from '@/components/ImagemFileUploader.vue';
import SingleFileUploader from '@/components/SingleFileUploader.vue';
import MultiFileUploader from '@/components/MultiFileUploader.vue';

export default {
    name: 'EditarAcaoVoluntariadoView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
        ImagemFileUploader,
        SingleFileUploader,
        MultiFileUploader,
    },
    created() {
        this.buscarAcaoVoluntariado(this.$route.params.id);
        this.buscarOrganizacoes();
        this.buscarSegmentos();
        this.buscarEstatisticas(this.$route.params.id);
    },
    data() {
        return {
            tab: "DADOS-GERAIS",
            subTab: 'ESTATISTICAS',
            acao: null,
            horario: {
                masked: null,
                unmasked: null,
                completed: false,
            },
            opcao: {
                valor: null,
                descricao: null,
            },
            organizacoes: null,
            estatisticas: null,
            segmentos: null,
            erroBuscaAcao: false,
            carregandoRequisicao: false,
            erroAtualizacao: false,
            rotaAnterior: null,
            options: {
                markers: {
                    size: 5,
                },
                stroke: {
                    curve: 'smooth',
                },
                chart: {
                    fontFamily: 'Inter',
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#00145f', '#cccccc', '#4fc3f6'],
                grid: {
                    show: false
                },
                yaxis: {
                    show: false,
                    title: {
                        text: "Doações",
                        style: {
                            fontSize: '16px',
                        }
                    },
                    labels: {
                        formatter: function (val, index) {
                            return new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(val);
                        }
                    }
                },
                xaxis: {
                    type: 'datetime',
                },
                noData: {
                    text: "Não há estatísticas para essa ação"
                }
            },
            series: [{
                data: [],
                name: 'Valor arrecadado'
            }],
            optionsDonut: {
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#00145f', '#4fc3f6', '#cccccc'],
                grid: {
                    show: false
                },
                labels: ['PIX', 'Cartão de Crédito', 'Boleto'],
                legend: {
                    show: true,
                },
                noData: {
                    text: "Não há estatísticas para essa ação"
                }
            },
            seriesDonut: [],
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
        buscarOrganizacoes: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/prospeccao/organizacoes")
                .then((response) => {
                    this.organizacoes = response.data;
                })
                .catch(() => {
                    this.erroBuscaAcao = true;
                });
        },
        buscarEstatisticas: function (id) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/doacoes/" + id + "/estatisticas")
                .then((response) => {
                    this.estatisticas = response.data;

                    this.series[0].data = this.estatisticas.doacoesPorDia;

                    this.seriesDonut.push(this.estatisticas.doacoesPorMetodoDoacao[0].total);
                    this.seriesDonut.push(this.estatisticas.doacoesPorMetodoDoacao[2].total);
                    this.seriesDonut.push(this.estatisticas.doacoesPorMetodoDoacao[1].total);
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
                    this.erroBuscaAcao = true;
                });
        },
        buscarAcaoVoluntariado: function (id) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acoes-voluntariado/" + id)
                .then((response) => {
                    var acao = response.data;
                    this.acao = acao;

                    this.acao.url = process.env.VUE_APP_ACAO_BASE_URL + this.acao.url;

                    if (acao.segmento == null) {
                        this.acao.segmento = {
                            id: null
                        }
                    }
                })
                .catch(() => {
                    this.erroBuscaAcao = true;
                });
        },
        uploadImagem: function (e) {
            var body = new FormData();
            body.append('imagem', e);

            axios.post(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acoes-voluntariado/" + this.acao.id + "/imagens", body, { "Content-Type": "multipart/form-data" })
                .then((response) => {
                    this.acao.imagem = response.data;
                })
                .catch(() => {
                    
                });
        },
        excluirImagem: function () {
            axios.delete(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acoes-voluntariado/" + this.acao.id + "/imagens")
                .then(() => {
                    this.acao.imagem = null;
                })
                .catch(() => {
                    
                });
        },
        uploadArquivo: function (e, tipo) {
            var body = new FormData();
            body.append('arquivo', e);

            axios.post(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acoes/" + this.acao.id + "/arquivos?acao=voluntariado&upload=" + tipo, body, { "Content-Type": "multipart/form-data" })
                .then((response) => {
                    if (tipo == 'contrato') {
                        this.acao.contrato = response.data;
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
        incluirOpcaoContribuicao: function () {
            if (this.opcao.valor != null && this.opcao.valor != '') {
                var opcao = {
                    valor: this.opcao.valor,
                    descricao: this.opcao.descricao,
                }

                this.acao.opcoesContribuicao.push(opcao);

                this.opcao.valor = null;
                this.opcao.descricao = null;
            }
        },
        removerOpcaoContribuicao: function (index) {
            this.acao.opcoesContribuicao.splice(index, 1);
        },
        atualizarAcaoVoluntariado: function (id) {
            this.acao.segmentoID = this.acao.segmento.id;
            this.acao.usuarioId = 1;
            this.acao.horario = this.horario.masked;

            axios.put(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acoes-voluntariado/" + id, this.acao)
                .then(() => {
                    this.$router.push({ name: 'EditarAcaoVoluntariado', params: { id: id }, query: { sucessoAtualizacao: true, timestamp: Date.now() } });
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