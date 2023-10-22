<template>
    <Navbar></Navbar>
    <main id="editar-acao-voluntariado-view">
        <Header titulo="Voluntariado" icone="bi bi-collection-fill"></Header>
        <Transition>
            <FloatingPanel v-if="organizacoes != null && segmentos != null">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--error" v-if="erroCadastro">
                        <i class="alerta__icone bi bi-x-circle-fill"></i>
                        <p class="alerta__message">Não foi possível cadastrar essa ação</p>
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
                    </ul>
                    <form action="#" method="post" v-if="tab == 'DADOS-GERAIS' || tab == 'CONFIGURACOES'">
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
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="acao.nivel" class="form-input-label">Nível</label>
                                    <select name="acao.nivel" id="acao.nivel" class="form-input" v-model="acao.nivel">
                                        <option :value="null" disabled>Selecione um nível...</option>
                                        <option value="N1">N1</option>
                                        <option value="N2">N2</option>
                                        <option value="N3">N3</option>
                                        <option value="N4">N4</option>
                                    </select>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="acao.fase" class="form-input-label">Fase</label>
                                    <select name="acao.fase" id="acao.fase" class="form-input" v-model="acao.fase">
                                        <option :value="null" disabled>Selecione uma fase...</option>
                                        <option value="CRIADA">Criada</option>
                                        <option value="EM_ANDAMENTO">Em andamento
                                        </option>
                                        <option value="FINALIZADA">Finalizada</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="acao.tipo" class="form-input-label">Tipo</label>
                                    <select name="acao.tipo" id="acao.tipo" class="form-input" v-model="acao.tipo">
                                        <option :value="null" disabled>Selecione um tipo...</option>
                                        <option value="MENTORIA">Mentoria</option>
                                        <option value="DOACAO">Doação</option>
                                        <option value="ENSINO">Ensino</option>
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
                                        <option v-for="segmento in segmentos" v-if="acao != null" :value="segmento.id">{{
                                            segmento.nome }}</option>
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
                                    <label for="acao.campanha" class="form-input-label">Habilitar doações?</label>
                                    <select name="acao.campanha" id="acao.campanha" v-model="acao.campanha"
                                        class="form-input">
                                        <option :value="null" disabled>Escolha uma opção...</option>
                                        <option :value="false">Não</option>
                                        <option :value="true">Sim</option>
                                    </select>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="acao.publica" class="form-input-label">Doações públicas</label>
                                    <select name="acao.publica" id="acao.publica" class="form-input" v-model="acao.publica">
                                        <option :value="null" disabled>Escolha uma opção...</option>
                                        <option :value="false">Não</option>
                                        <option :value="true">Sim</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="acao.tipoMeta" class="form-input-label">Tipo de meta</label>
                                    <select name="acao.tipoMeta" id="acao.tipoMeta" class="form-input"
                                        v-model="acao.tipoMeta">
                                        <option :value="null" disabled>Escolha uma opção...</option>
                                        <option value="DOACOES">Doações</option>
                                        <option value="INSCRITOS">Inscritos</option>
                                        <option value="VALOR">Valor arrecadado</option>
                                    </select>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="acao.meta" class="form-input-label">Meta</label>
                                    <input type="number" name="acao.meta" id="acao.meta" class="form-input"
                                        v-model="acao.meta">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="acao.valorPersonalizado" class="form-input-label">Aceita doações
                                        personalizadas?</label>
                                    <select name="acao.valorPersonalizado" class="form-input" id="acao.valorPersonalizado"
                                        v-model="acao.valorPersonalizado">
                                        <option :value="null" disabled>Escolha uma opção...</option>
                                        <option :value="false">Não</option>
                                        <option :value="true">Sim</option>
                                    </select>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="acao.multiplicador" class="form-input-label">Multiplicador</label>
                                    <input type="number" name="acao.multiplicador" id="acao.multiplicador"
                                        class="form-input" v-model="acao.multiplicador">
                                </div>
                            </div>
                        </div>

                        <button class="primary-button" @click.prevent="cadastrarAcaoVoluntariado()">
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
    name: 'CadastrarAcaoVoluntariadoView',
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
        this.buscarOrganizacoes();
        this.buscarSegmentos();
    },
    data() {
        return {
            tab: "DADOS-GERAIS",
            acao: {
                nomeAcao: null,
                nivel: null,
                fase: null,
                formato: null,
                tipo: null,
                dataInicio: null,
                dataTermino: null,
                horario: null,
                local: null,
                informacoesAdicionais: null,
                imagem: null,
                vagas: null,
                url: null,
                meta: null,
                tipoMeta: null,
                campanha: null,
                publica: null,
                valorPersonalizado: null,
                multiplicador: null,
                sobreOrganizacao: null,
                sobreAcao: null,
                usuarioId: null,
                organizacaoId: null,
                segmento: {
                    id: null,
                },
            },
            horario: {
                masked: null,
                unmasked: null,
                completed: false,
            },
            organizacoes: null,
            segmentos: null,
            erroBuscaAcao: false,
            carregandoRequisicao: false,
            erroCadastro: false,
            rotaAnterior: null,
        }
    },
    methods: {
        selecionarTab: function (tab) {
            this.tab = tab;
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
        buscarSegmentos: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/segmentos")
                .then((response) => {
                    this.segmentos = response.data;
                })
                .catch(() => {
                    this.erroBuscaAcao = true;
                });
        },
        cadastrarAcaoVoluntariado: function () {
            this.acao.segmentoID = this.acao.segmento.id;
            this.acao.usuarioId = 1;
            this.acao.horario = this.horario.masked;

            axios.post(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acoes-voluntariado", this.acao)
                .then((response) => {
                    this.$router.push({ name: 'EditarAcaoVoluntariado', params: { id: response.data }, query: { sucessoCadastro: true } });
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

                    this.erroCadastro = true;
                    window.scrollTo(0, 0);
                });
        },
    }
}
</script>