<template>
    <Navbar></Navbar>
    <main id="visualizar-doacao-view">
        <Header titulo="Doação" icone="bi bi-cash-coin"></Header>
        <Transition>
            <FloatingPanel v-if="erroBuscaDoacao">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--info">
                        <i class="alerta__icone bi bi-info-circle-fill"></i>
                        <p class="alerta__message">Não foi possível recuperar as informações da doação</p>
                    </div>
                </template>
            </FloatingPanel>
        </Transition>
        <Transition>
            <FloatingPanel v-if="!erroBuscaDoacao && doacao != null">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--sucesso" v-if="this.$route.query.sucessoEstorno && rotaAnterior == null">
                        <i class="alerta__icone bi bi-check-circle-fill"></i>
                        <p class="alerta__message">Estorno solicitado com sucesso</p>
                    </div>
                    <div class="detalhes-transacao">
                        <div class="bloco">
                            <label class="bloco__atributo">Doador</label>
                            <p class="bloco__atributo--preenchido">{{ doacao.doador.nome }}</p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">CPF</label>
                            <p class="bloco__atributo--preenchido">{{ utils.cpfMask(doacao.doador.cpf) }}</p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Email</label>
                            <p class="bloco__atributo--preenchido">{{ doacao.doador.email }}</p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Telefone</label>
                            <p class="bloco__atributo--preenchido">{{ utils.telefoneMask(doacao.doador.telefone) }}</p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Referência (PagSeguro)</label>
                            <p class="bloco__atributo--preenchido">{{ doacao.codigo }}</p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Status</label>
                            <p class="bloco__atributo--preenchido">{{ doacao.status.replace("PAID",
                                "PAGO").replace("WAITING", "PROCESSANDO").replace("CANCELED", "CANCELADO") }}</p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Método</label>
                            <p class="bloco__atributo--preenchido">{{ doacao.metodo.replace("CARTAO_CREDITO", "CRÉDITO") }}
                            </p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Valor</label>
                            <p class="bloco__atributo--preenchido">R$ {{ doacao.valor.toFixed(2).replace(".", ",") }}</p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Link</label>
                            <p class="bloco__atributo--preenchido">
                                <a :href="doacao.link" v-if="doacao.metodo == 'BOLETO'" target="_blank">Acesse aqui o boleto
                                    de
                                    pagamento</a>
                                <a :href="doacao.link" v-else-if="doacao.metodo == 'PIX'" target="_blank">Acesse aqui o QR
                                    Code
                                    de pagamento</a>
                                <span v-else>Não se aplica</span>
                            </p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Processado em</label>
                            <p class="bloco__atributo--preenchido">{{ (new
                                Date(doacao.created_at)).toLocaleDateString('pt-BR',
                                    options) }}</p>
                        </div>
                        <div class="bloco">
                            <label class="bloco__atributo">Atualizado em</label>
                            <p class="bloco__atributo--preenchido">{{ (new
                                Date(doacao.updated_at)).toLocaleDateString('pt-BR',
                                    options) }}</p>
                        </div>
                    </div>


                    <button class="danger-button" @click.prevent="estornarDoacao()" v-if="doacao.status != 'CANCELED'">
                        <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                        <span v-show="!carregandoRequisicao">Estornar</span>
                    </button>
                    <button class="primary-button" @click.prevent="$router.go(-1)">
                        Voltar
                    </button>
                </template>
            </FloatingPanel>
        </Transition>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/acoes-sociais/visualizar-doacao-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';
import utils from "@/helpers/maska";

export default {
    name: 'VisualizarDoacaoView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel
    },
    created() {
        this.buscarDoacao(this.$route.params.id);
    },
    data() {
        return {
            doacao: null,
            options: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
            },
            utils: utils,
            erroBuscaDoacao: false,
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
        buscarDoacao: function (id) {
            axios.get("http://localhost:8081/doacoes/" + id)
                .then((response) => {
                    var doacao = response.data;
                    this.doacao = doacao;
                })
                .catch((error) => {
                    this.erroBuscaDoacao = true;
                });
        },
        estornarDoacao: function () {
            this.carregandoRequisicao = true;

            axios.post("http://localhost:8081/doacoes/" + this.doacao.id + "/cancelamentos")
                .then((response) => {
                    console.log(response);
                    this.$router.push({ name: 'VisualizarDoacao', params: { id: this.doacao.id }, query: { sucessoEstorno: true, timestamp: Date.now() } });

                    this.carregandoRequisicao = false;
                })
                .catch((error) => {
                    this.$router.push({ name: 'VisualizarDoacao', params: { id: this.doacao.id }, query: { falhaEstorno: true, timestamp: Date.now() } });

                    this.carregandoRequisicao = false;
                });
        }
    }
}
</script>