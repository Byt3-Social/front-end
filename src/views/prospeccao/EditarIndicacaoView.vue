<template>
    <Navbar></Navbar>
    <main id="editar-indicacao-view">
        <Header titulo="Indicação" icone="bi bi-building-fill-gear"></Header>
        <FloatingPanel v-if="indicacao != null">
            <template v-slot:FloatingPanelContent>
                <div class="alerta alerta--error" v-show="erroAtualizacao">
                    <i class="alerta__icone bi bi-x-circle-fill"></i>
                    <p class="alerta__message">Não foi possível atualizar essa indicação</p>
                </div>
                <br>
                <div class="indicacao">
                    <span class="section__title">Indicação</span>

                    <div class="bloco">
                        <label class="bloco__atributo">Indicação recebida por</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.colaborador }}
                        </p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Nome da organização</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.nomeOrganizacao }}
                        </p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Nome do responsável</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.responsavel.nome }}
                        </p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Telefone do responsável</label>
                        <p class="bloco__atributo--preenchido">
                            {{ utils.telefoneMask(indicacao.responsavel.telefone) }}
                        </p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Email do responsável</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.responsavel.email }}
                        </p>
                    </div>
                </div>

                <div class="alinhamento">
                    <span class="section__title">Alinhamento</span>

                    <div class="bloco">
                        <label class="bloco__atributo">Em qual categoria a organização indicado se encaixa?</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.categoria.nome }}
                        </p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">m qual tipo de ação social você acredita que a organização indicada melhor se enquadra?</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.tipoAcao.replace('VOLUNTARIADO', 'Ação de Voluntariado').replace('ISP', 'Ação de Investimento Social Privado').replace('AMBOS', 'Ação de Voluntariado / Ação de Investimento Social Privado') }}
                        </p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Qual a abrangência das ações realizadas pela organização indicada?</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.abrangencia.replace('INTERNACIONAL', 'Internacional').replace('NACIONAL', 'Nacional').replace('ESTADUAL', 'Estadual').replace('REGIONAL', 'Regional/Local') }}
                        </p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Descreva brevemente o porquê você acredita que a organização indicada está alinhada com o nosso propósito</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.textoIndicacao }}
                        </p>
                    </div>
                </div>

                <div class="status">
                    <span class="section__title">Status</span>

                    <div class="bloco">
                        <label class="bloco__atributo">Convite</label>
                        <p class="bloco__atributo--preenchido" v-if="indicacao.invitedAt != null">
                            Enviado em {{ (new Date(indicacao.invitedAt)).toLocaleDateString("pt-BR", options) }}
                        </p>
                        <p v-else>Não enviado</p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Formulário de cadastro</label>
                        <p class="bloco__atributo--preenchido" v-if="indicacao.invitedAt != null && indicacao.cadastro == null">
                            Aguardando preenchimento
                        </p>
                        <p class="bloco__atributo--preenchido" v-else-if="indicacao.invitedAt != null && indicacao.cadastro != null">
                            Formulário preenchido com sucesso em {{ (new Date(indicacao.cadastro.createdAt)).toLocaleDateString("pt-BR", options) }}

                            <div class="formulario-cadastro">
                                <div class="bloco">
                                    <label class="bloco__atributo">Nome da organização</label>
                                    <p class="bloco__atributo--preenchido">
                                        {{ indicacao.cadastro.nomeOrganizacao }}
                                    </p>
                                </div>
                                <div class="bloco">
                                    <label class="bloco__atributo">CNPJ da organização</label>
                                    <p class="bloco__atributo--preenchido">
                                        {{ utils.cnpjMask(indicacao.cadastro.cnpj) }}
                                    </p>
                                </div>
                                <div class="bloco">
                                    <label class="bloco__atributo">Email da organização</label>
                                    <p class="bloco__atributo--preenchido">
                                        {{ indicacao.cadastro.emailOrganizacao }}
                                    </p>
                                </div>
                                <div class="bloco">
                                    <label class="bloco__atributo">Telefone da organização</label>
                                    <p class="bloco__atributo--preenchido">
                                        {{ utils.telefoneMask(indicacao.cadastro.telefoneOrganizacao) }}
                                    </p>
                                </div>
                                <div class="bloco">
                                    <label class="bloco__atributo">Nome do responsável</label>
                                    <p class="bloco__atributo--preenchido">
                                        {{ indicacao.cadastro.responsavel.nome }}
                                    </p>
                                </div>
                                <div class="bloco">
                                    <label class="bloco__atributo">CPF do responsável</label>
                                    <p class="bloco__atributo--preenchido">
                                        {{ utils.cpfMask(indicacao.cadastro.responsavel.cpf) }}
                                    </p>
                                </div>
                                <div class="bloco">
                                    <label class="bloco__atributo">Email do responsável</label>
                                    <p class="bloco__atributo--preenchido">
                                        {{ indicacao.cadastro.responsavel.email }}
                                    </p>
                                </div>
                                <div class="bloco">
                                    <label class="bloco__atributo">Telefone do responsável</label>
                                    <p class="bloco__atributo--preenchido">
                                        {{ utils.telefoneMask(indicacao.cadastro.responsavel.telefone) }}
                                    </p>
                                </div>
                            </div>
                        </p>
                        <p class="bloco__atributo--preenchido" v-else>
                            Formulário não disponível para preenchimento
                        </p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Status</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.status.replace('INDICADA', 'Indicada').replace('CONVIDADA', 'Convidada').replace('FORM_PREENCHIDO', 'Formulário preenchido').replace('CONCLUIDA', 'Concluída').replace('ARQUIVADA', 'Arquivada') }}
                        </p>
                    </div>

                    <div class="acao" v-if="indicacao.status != 'CONCLUIDA' && indicacao.status != 'ARQUIVADA'">
                        <label for="acao" class="form-input-label">Executar ação</label>
                        <select name="acao" id="acao" class="form-input" v-model="acao">
                            <option :value="null">Selecione uma ação...</option>
                            <option value="APROVAR" :disabled="indicacao.status != 'FORM_PREENCHIDO'">Aprovar</option>
                            <option value="ARQUIVAR" :disabled="indicacao.status != 'INDICADA' && indicacao.status != 'CONVIDADA' && indicacao.status != 'FORM_PREENCHIDO'">Arquivar</option>
                            <option value="CONVIDAR" :disabled="indicacao.status != 'INDICADA'">Convidar</option>
                        </select>

                        <button class="primary-button" :disabled="acao == null" @click.prevent="executarAcao(this.$route.params.id)">
                            <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                            <span v-show="!carregandoRequisicao" v-if="acao == null">Aguardando...</span>
                            <span v-show="!carregandoRequisicao" v-else="acao != null">{{ acao }}</span>
                        </button>
                    </div>
                </div>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/prospeccao/editar-indicacao-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import utils from "@/helpers/maska";
import axios from 'axios';

export default {
    name: 'EditarIndicacaoView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
    },
    data() {
        return {
            indicacao: null,
            options: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
            },
            acao: null,
            utils: utils,
            rotaAnterior: null,
            erroAtualizacao: false,
        }
    },
    beforeRouteEnter(to, from, next) {
        next(route => {
            route.rotaAnterior = from;
        })
    },
    created() {
        this.buscarIndicacao(this.$route.params.id);
    },
    methods: {
        buscarIndicacao: function(id) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/prospeccao/indicacoes/" + id)
                .then((response) => {
                    this.indicacao = response.data;
                })
                .catch(() => {

                });
        },
        executarAcao: function(id) {
            let body = {
                status: null
            };

            if(this.acao == "APROVAR") {
                body.status = "CONCLUIDA";
            } else if(this.acao == "ARQUIVAR") {
                body.status = "ARQUIVADA";
            } else if (this.acao == "CONVIDAR") {
                body.status = "CONVIDADA";
            }

            axios.post(process.env.VUE_APP_API_BASE_URL + "/prospeccao/indicacoes/" + id + "/status", body)
                .then((response) => {
                    this.$router.push({ name: 'ListarIndicacoes', query: { sucessoAtualizacao: true } });
                })
                .catch((error) => {
                    this.erroAtualizacao = true;
                    window.scrollTo(0, 0);
                });
        }
    }
}
</script>