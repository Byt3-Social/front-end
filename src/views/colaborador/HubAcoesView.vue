<template>
    <Navbar></Navbar>
    <main id="hub-acoes-view" v-if="acoes != null">
        <section class="container__carrossel">
            <Carousel ref="carousel" v-model="currentSlide" snapAlign="center" :items-to-show="1.1" :wrap-around="true">
                <Slide v-for="acao in acoes.doacao" :key="acao.id">
                    <div class="carousel__item">
                        <div class="carousel__conteudoSlide">
                            <div class="slide__image">
                                <div class="bg__overlay"></div>
                                <img :src="acao.imagem" alt="">
                            </div>
                            <div class="slide__info">
                                <h3>Vamos ajudar?</h3>
                                <p>{{ acao.nomeAcao }}</p>

                                <router-link class="cta-link" :to="{ name: 'Acao', params: { id: acao.id } }">Doar</router-link>
                            </div>
                        </div>
                    </div>
                </Slide>
            </Carousel>

            <section class="carrossel__botoes">
                <button @click="prev" class="botao__next">
                    <i class="bi bi-arrow-left"></i>
                </button>
                <button @click="next" class="botao__prev">
                    <i class="bi bi-arrow-right"></i>
                </button>
            </section>
        </section>
        <section class="block__voluntariado">
            <label>
                <p class="p__souvoluntario">#SOUVOLUNTÁRIOB3</p>
            </label>

            <div class="block__cardsvoluntariado">
                <div class="card__Voluntariado" v-for="acao in acoes.voluntariado">
                    <img :src="`${acao.imagem}`">
                    <p class="card__titulo">{{ acao.nomeAcao }}</p>
                    <p class="card__descricao">
                        {{ acao.sobreAcao.substring(0, 100) }}{{ acao.sobreAcao.length >= 100 ? '...' : null }}
                    </p>
                    <button type="button" class="acao cta-btn" data-bs-toggle="modal"
                        :data-bs-target="`#staticBackdrop-${acao.id}`">
                        Participar
                    </button>

                    <div class="modal fade" :id="`staticBackdrop-${acao.id}`" data-bs-backdrop="static"
                        data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5 text-center w-100" id="staticBackdropLabel">
                                        Confirme sua inscrição</h1>
                                </div>
                                <div class="modal-body">
                                    <div class="alerta alerta--sucesso"
                                        v-if="sucessoInscricao || inscricoes.includes(acao.id)"
                                        style="margin-bottom: 1rem;">
                                        <i class="alerta__icone bi bi-check-circle-fill"></i>
                                        <p class="alerta__message">Inscrito</p>
                                    </div>
                                    <div class="alerta alerta--error" v-if="falhaInscricao" style="margin-bottom: 1rem;">
                                        <i class="alerta__icone bi bi-x-circle-fill"></i>
                                        <p class="alerta__message">Falha ao processar inscrição</p>
                                    </div>
                                    <p>
                                        <strong>Data:</strong> {{ acao.dataInicio != null ? new
                                            Date(acao.dataInicio).toLocaleDateString("pt-BR") : 'Não informada' }}
                                    </p>
                                    <p>
                                        <strong>Horário:</strong> {{ acao.horario != null ? acao.horario : 'Não informado'
                                        }}
                                    </p>
                                    <p>
                                        <strong>Descrição:</strong> {{ acao.sobreAcao != null ?
                                            acao.sobreAcao : 'Não informada' }}
                                    </p>

                                    <button type="button" class="secondary-button" data-bs-dismiss="modal"
                                        style="margin-bottom: 1rem;" @click="resetAlertas()">Fechar</button>
                                    <button class="cta-btn w-100" @click.prevent="inscrever(acao.id)"
                                        v-if="!inscricoes.includes(acao.id)">
                                        Inscrever
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import 'vue3-carousel/dist/carousel.css'
import '@/assets/styles/colaborador/hub-acoes-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel/dist/carousel.es';
import axios from 'axios';

export default {
    name: 'HubAcoesSociais',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
        Carousel,
        Slide,
        Navigation,
    },
    data() {
        return {
            currentSlide: 0,
            acoes: null,
            sucessoInscricao: false,
            falhaInscricao: false,
            inscricoes: [],
        }
    },
    created() {
        this.buscarAcoes();
        this.buscarInscricoes();
    },
    methods: {
        next() {
            this.$refs.carousel.next()
        },
        prev() {
            this.$refs.carousel.prev()
        },
        buscarAcoes: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acoes/divulgacao")
                .then((response) => {
                    this.acoes = response.data;
                })
                .catch(() => {

                });
        },
        buscarInscricoes: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/inscricoes/acoes")
                .then((response) => {
                    this.inscricoes = response.data;
                })
                .catch(() => {

                });
        },
        inscrever: function (id) {
            var body = {
                acaoId: id,
            };

            axios.post(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/inscricoes", body)
                .then(() => {
                    this.sucessoInscricao = true;
                    this.inscricoes.push(id)
                })
                .catch(() => {
                    this.falhaInscricao = true;
                });
        },
        resetAlertas: function () {
            this.sucessoInscricao = false;
            this.falhaInscricao = false;
        }
    },
}
</script>
