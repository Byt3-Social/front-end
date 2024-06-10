<template>
    <Navbar></Navbar>
    <main id="editar-indicacao-view">
        <Header titulo="Indicação" icone="bi bi-building-fill-gear"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <div class="indicacao">
                    <span class="section__title">Indicação</span>

                    <div class="bloco">
                        <label class="bloco__atributo">Indicação recebida por</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.colaboradorIndicador }}
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
                            {{ indicacao.nomeResponsavel }}
                        </p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Telefone do responsável</label>
                        <p class="bloco__atributo--preenchido">
                            {{ utils.telefoneMask(indicacao.telefoneResponsavel) }}
                        </p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Email do responsável</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.emailResponsavel }}
                        </p>
                    </div>
                </div>

                <div class="alinhamento">
                    <span class="section__title">Alinhamento</span>

                    <div class="bloco">
                        <label class="bloco__atributo">Em qual categoria a organização indicado se encaixa?</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.alinhamento.categoria }}
                        </p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">m qual tipo de ação social você acredita que a organização indicada melhor se enquadra?</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.alinhamento.tipoAcao }}
                        </p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Qual a abrangência das ações realizadas pela organização indicada?</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.alinhamento.abrangencia }}
                        </p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Descreva brevemente o porquê você acredita que a organização indicada está alinhada com o nosso propósito</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.alinhamento.informacoesAdicionais }}
                        </p>
                    </div>
                </div>

                <div class="status">
                    <span class="section__title">Status</span>

                    <div class="bloco">
                        <label class="bloco__atributo">Convite</label>
                        <p class="bloco__atributo--preenchido">
                            Enviado em {{ (new Date(indicacao.convite)).toLocaleDateString("pt-BR", options) }}
                        </p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Formulário de cadastro</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.formulario }}
                        </p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">Status</label>
                        <p class="bloco__atributo--preenchido">
                            {{ indicacao.status }}
                        </p>
                    </div>

                    <div class="acao">
                        <label for="acao" class="form-input-label">Executar ação</label>
                        <select name="acao" id="acao" class="form-input" v-model="acao">
                            <option :value="null">Selecione uma ação...</option>
                            <option value="APROVAR">Aprovar</option>
                            <option value="ARQUIVAR">Arquivar</option>
                            <option value="CONVIDAR">Convidar</option>
                            <option value="REPROVAR">Reprovar</option>
                        </select>

                        <button class="primary-button" :disabled="acao == null" @click.prevent="executarAcao()">
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
            // To do

            // Placeholder data
            this.indicacao = {
                colaboradorIndicador: "Leandro Pereira",
                nomeOrganizacao: "NeuroTech",
                nomeResponsavel: "João da Silva",
                telefoneResponsavel: "66123456789",
                emailResponsavel: "joao.silva@neurotech.com.br",
                alinhamento: {
                    categoria: "Educação",
                    tipoAcao: "Ação de Investimento Social Privado",
                    abrangencia: "Nacional",
                    informacoesAdicionais: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised ni the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                },
                status: "Convidado",
                formulario: "Em preenchimento",
                convite: "2024-01-24T14:35:01"
            }
        },
        executarAcao: function() {
            // To do
        }
    }
}
</script>