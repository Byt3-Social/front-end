<template>
    <Navbar></Navbar>
    <Transition>
        <main id="acao-view" v-if="acao != null">
            <div class="acao__header">
                <div class="bg__overlay"></div>
                <img :src="acao.imagem" alt="">

                <div class="acao__info">
                    <h1>{{ acao.nomeAcao }}</h1>

                    <router-link class="warn-button" :to="{ name: 'Doar', params: { id: this.$route.params.id } }">Fazer uma
                        doação</router-link>
                </div>
            </div>
            <section class="acao__detalhes">
                <div class="wrapper">
                    <div class="secao__texto">
                        <img src="../../assets//images/blob-org.png" alt="">
                        <div class="texto">
                            <h2>Organização</h2>
                            <p>
                                {{ acao.sobreOrganizacao }}
                            </p>
                        </div>
                    </div>
                    <div class="secao__texto">
                        <div class="texto">
                            <h2>Ação Social</h2>
                            <p>
                                {{ acao.sobreAcao }}
                            </p>
                        </div>
                        <img src="../../assets//images/blob-acao.png" alt="">
                    </div>
                </div>
            </section>
        </main>
    </Transition>
    <FooterItem></FooterItem>
</template>

<script>
import '@/assets/styles/colaborador/acao-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import axios from 'axios';

export default {
    name: 'AcaoView',
    components: {
        Navbar,
        FooterItem,
        Header,
    },
    data() {
        return {
            acao: null,
        }
    },
    created() {
        this.buscarAcaoVoluntariado(this.$route.params.id);
    },
    methods: {
        buscarAcaoVoluntariado: function (id) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acoes-voluntariado/" + id)
                .then((response) => {
                    this.acao = response.data;
                })
                .catch(() => {
                    
                });
        },
    }
}
</script>