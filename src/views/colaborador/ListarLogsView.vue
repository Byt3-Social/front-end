<template>
    <Navbar></Navbar>
    <main id="listar-logs-view">
        <Header titulo="Logs" icone="bi bi-eye-fill"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <p class="text-center">Sistema de logs em operação e dentro da normalidade</p>
                <p class="text-center">{{ (currentTime).toLocaleDateString("pt-BR", options) }}</p>

                <div class="accordion" id="accordionExample">
                    <div class="accordion-item" v-for="log in logs">
                        <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + log.id" aria-expanded="false" :aria-controls="'collapse' + log.id">
                            {{ (new Date(log.requestAt)).toLocaleDateString("pt-BR", options) }} ({{ log.ipAddress }}) - {{ log.actionDescription }}
                        </button>
                        </h2>
                        <div :id="'collapse' + log.id" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div class="left">
                                    <div class="bloco">
                                        <label class="bloco__atributo">Ação</label>
                                        <p class="bloco__atributo--preenchido">
                                            {{ log.action.replaceAll("_", " ") }}
                                        </p>
                                    </div>

                                    <div class="bloco">
                                        <label class="bloco__atributo">Microsserviço</label>
                                        <p class="bloco__atributo--preenchido">
                                            {{ log.microservice.replace("[", "").replace("]", "") }}
                                        </p>
                                    </div>

                                    <div class="bloco">
                                        <label class="bloco__atributo">Método da requisição</label>
                                        <p class="bloco__atributo--preenchido">
                                            {{ log.requestMethod }}
                                        </p>
                                    </div>

                                    <div class="bloco">
                                        <label class="bloco__atributo">Recurso</label>
                                        <p class="bloco__atributo--preenchido">
                                            {{ log.requestPath }}
                                        </p>
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="bloco">
                                        <label class="bloco__atributo">Origem</label>
                                        <p class="bloco__atributo--preenchido">
                                            {{ log.requestOrigin }}
                                        </p>
                                    </div>

                                    <div class="bloco">
                                        <label class="bloco__atributo">Status da requisição</label>
                                        <p class="bloco__atributo--preenchido">
                                            {{ log.statusCode.replaceAll("_", " ") }}
                                        </p>
                                    </div>

                                    <div class="bloco">
                                        <label class="bloco__atributo">Tipo de usuário</label>
                                        <p class="bloco__atributo--preenchido">
                                            {{ log.userType.replace("[", "").replace("]", "") }}
                                        </p>
                                    </div>

                                    <div class="bloco">
                                        <label class="bloco__atributo">Usuário</label>
                                        <p class="bloco__atributo--preenchido">
                                            {{ log.user.replace("[", "").replace("]", "") }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="pagination-section">
                    <!-- <router-link class="pagination-action" :to="{ name: 'ListarLogs', query: { page: prevPage } }">
                        <i class="bi bi-arrow-left-circle-fill"></i>
                    </router-link>
                    <router-link class="pagination-action" :to="{ name: 'ListarLogs', query: { page: nextPage } }">
                        <i class="bi bi-arrow-right-circle-fill"></i>
                    </router-link> -->

                    <button class="pagination-action" @click.prevent="getPreviousPage()">
                        <i class="bi bi-arrow-left-circle-fill"></i>
                    </button>
                    <button class="pagination-action" @click.prevent="getNextPage()">
                        <i class="bi bi-arrow-right-circle-fill"></i>
                    </button>
                </div>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/colaborador/listar-logs-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';

export default {
    name: 'ListarLogsView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
    },
    data() {
        return {
            logs: null,
            rotaAnterior: null,
            options: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            },
            prevPage: -1,
            nextPage: 1,
            currentPage: 0,
            currentTime: new Date(),
        }
    },
    beforeRouteEnter(to, from, next) {
        next(route => {
            route.rotaAnterior = from;
        })
    },
    created() {
        this.buscarLogs(this.$route.query.page);
    },
    mounted: function() {
        setInterval(this.updateDateTime, 1000);
    },
    methods: {
        buscarLogs: function(page) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/logging/logs")
                .then((response) => {
                    this.logs = response.data;
                })
                .catch(() => {

                });
        },
        getPreviousPage: function() {
            if(this.currentPage == 0) {
                return;
            }

            axios.get(process.env.VUE_APP_API_BASE_URL + "/logging/logs?page=" + --this.currentPage)
                .then((response) => {
                    this.logs = response.data;
                })
                .catch(() => {

                });
        },
        getNextPage: function() {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/logging/logs?page=" + ++this.currentPage)
                .then((response) => {
                    this.logs = response.data;
                })
                .catch(() => {

                });
        },
        updateDateTime: function() {
            this.currentTime = new Date();
        },
    }
}
</script>