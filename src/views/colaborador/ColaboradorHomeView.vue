<template>
    <Navbar></Navbar>
    <main id="colaborador-home-view">
        <Header titulo="Portal do Colaborador" icone="bi bi-person-fill"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <div class="alerta alerta--info">
                    <p>Acesse agora nosso novo <router-link :to="{ name: 'HubAcoes' }">Hub de ações sociais</router-link>!
                    </p>
                </div>
                <button class="primary-button" @click.prevent="">
                    Indique uma organização
                </button>
                <div class="alerta alerta--sucesso" v-if="this.$route.query.sucessoAtualizacao && rotaAnterior == null">
                    <i class="alerta__icone bi bi-check-circle-fill"></i>
                    <p class="alerta__message">Interesses atualizado com sucesso</p>
                </div>
                <div class="alerta alerta--error" v-if="this.$route.query.falhaAtualizacao && rotaAnterior == null">
                    <i class="alerta__icone bi bi-x-circle-fill"></i>
                    <p class="alerta__message">Falha ao atualizar interesses do colaborador</p>
                </div>
                <ul class="tabs">
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'ENGAJAMENTO' ? 'active' : ''"
                            @click="selecionarTab('ENGAJAMENTO')">Engajamento</button>
                    </li>
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'DOACOES' ? 'active' : ''"
                            @click="selecionarTab('DOACOES')">Doações</button>
                    </li>
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'INTERESSES' ? 'active' : ''"
                            @click="selecionarTab('INTERESSES')">Interesses</button>
                    </li>
                </ul>
                <div class="tabs__content" v-if="tab == 'ENGAJAMENTO'">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <td>Ação</td>
                                <td>Data</td>
                                <td>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="inscricao in inscricoes">
                                <td>{{ inscricao.acao }}</td>
                                <td>
                                    {{ (new
                                        Date(inscricao.createdAt)).toLocaleDateString('pt-BR', options)
                                    }}
                                </td>
                                <td>
                                    <button type="button" class="acao" data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop">
                                        <i class="acao__icone bi bi-qr-code acao--editar"></i>
                                    </button>

                                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static"
                                        data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
                                        aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5 text-center w-100" id="staticBackdropLabel">
                                                        Confirme sua presença!</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <p class="text-center mb-0">Obrigado pela sua inscrição! Utilize esse Qr
                                                        Code para confirmar sua participação no dia da ação.</p>
                                                    <img :src="`data:image/png;base64,${inscricao.qrcode}`" alt="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="tabs__content" v-if="tab == 'DOACOES'">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <td>Ação</td>
                                <td>Valor</td>
                                <td>Data</td>
                                <td>Link</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="doacao in doacoes">
                                <td>
                                    {{ doacao.acao }}
                                </td>
                                <td>
                                    {{ new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(doacao.valor) }}
                                </td>
                                <td>
                                    {{ (new
                                        Date(doacao.createdAt)).toLocaleDateString('pt-BR', options)
                                    }}
                                </td>
                                <td>
                                    <a :href="doacao.link" target="_blank"
                                        v-if="doacao.status == 'WAITING' && doacao.link != null && doacao.link != ''">Pague
                                        agora</a>
                                    <span v-else>-</span>
                                </td>
                                <td>
                                    <span :class="`status status--${doacao.status}`">
                                        {{ doacao.status.replace("PAID", "PAGO").replace("WAITING",
                                            "PROCESSANDO").replace("CANCELED", "CANCELADO") }}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>Arrecadação de cesta básica</td>
                                <td>R$ 290,00</td>
                                <td>13 de outubro de 2023</td>
                                <td>
                                    -
                                </td>
                                <td><span :class="`status status--PAID`">PAGO</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="tabs__content" v-if="tab == 'INTERESSES'">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <td>Interessado</td>
                                <td>Segmento</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="segmento in segmentos">
                                <td>
                                    <input type="checkbox" :name="`segmento.${segmento.id}`" :id="`segmento.${segmento.id}`"
                                        v-model="interesses" :key="`segmento.${segmento.id}`" :value="segmento.id">
                                </td>
                                <td>
                                    <label :for="`segmento.${segmento.id}`">{{ segmento.nome }}</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <button class="secondary-button" @click.prevent="atualizarInteresses()">
                        <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                        <span v-show="!carregandoRequisicao">Atualizar</span>
                    </button>
                </div>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/colaborador/colaborador-home-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';

export default {
    name: 'ColaboradorHomeView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel
    },
    data() {
        return {
            tab: 'ENGAJAMENTO',
            inscricoes: [],
            doacoes: [],
            segmentos: [],
            interesses: [],
            options: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            },
            rotaAnterior: null,
            carregandoRequisicao: false,
        }
    },
    beforeRouteEnter(to, from, next) {
        next(route => {
            route.rotaAnterior = from;
        })
    },
    created() {
        this.buscarInscricoes();
        this.buscarDoacoes();
        this.buscarSegmentos();
        this.buscarInteresses();
    },
    methods: {
        selecionarTab: function (tab) {
            this.tab = tab;
        },
        buscarInscricoes: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/inscricoes")
                .then((response) => {
                    this.inscricoes = response.data;
                })
                .catch(() => {

                });
        },
        buscarDoacoes: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/doacoes")
                .then((response) => {
                    this.doacoes = response.data;
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
        buscarInteresses: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/interesses")
                .then((response) => {
                    this.interesses = response.data;
                })
                .catch(() => {

                });
        },
        atualizarInteresses: function () {
            this.carregandoRequisicao = true;

            var body = {
                interesses: this.interesses,
            };

            axios.post(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/interesses", body)
                .then(() => {
                    this.carregandoRequisicao = false;
                    this.$router.push({ name: 'ColaboradorHome', query: { sucessoAtualizacao: true, timestamp: Date.now() } });
                })
                .catch(() => {
                    this.carregandoRequisicao = false;
                    this.$router.push({ name: 'ColaboradorHome', query: { falhaAtualizacao: true, timestamp: Date.now() } });
                });
        }
    }
}
</script>