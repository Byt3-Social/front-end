<template>
    <Navbar></Navbar>
    <main id="listar-organizacoes-view">
        <Header titulo="Organizações" icone="bi bi-building"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <div class="alerta alerta--sucesso"
                    v-if="rotaAnterior != null && rotaAnterior.name == 'CadastrarOrganizacao' && this.$route.query.sucessoCadastro">
                    <i class="alerta__icone bi bi-check-circle-fill"></i>
                    <p class="alerta__message">Organização cadastrada com sucesso</p>
                </div>
                <div class="alerta alerta--sucesso"
                    v-if="rotaAnterior != null && rotaAnterior.name == 'EditarOrganizacao' && this.$route.query.sucessoAtualizacao">
                    <i class="alerta__icone bi bi-check-circle-fill"></i>
                    <p class="alerta__message">Organização atualizada com sucesso</p>
                </div>
                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <td>Registro</td>
                            <td>Organização</td>
                            <td>Status</td>
                            <td>Ações</td>
                        </tr>
                    </thead>
                    <Transition>
                        <tbody v-if="!carregandoRequisicao">
                            <tr v-for="organizacao in organizacoes">
                                <td>{{ organizacao.id }}</td>
                                <td>{{ organizacao.nome }}</td>
                                <td>
                                    <span :class="`status status--${organizacao.status_cadastro}`">{{
                                        organizacao.status_cadastro.replace("EM_ANALISE", "EM ANÁLISE") }}</span>
                                </td>
                                <td>
                                    <router-link :to="{ name: 'EditarOrganizacao', params: { id: organizacao.id } }"
                                        class="acao">
                                        <i class="acao__icone bi bi-pencil-square acao--editar"></i>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </Transition>
                </table>
                <Transition>
                    <p class="carregando__message" v-if="carregandoRequisicao">Carregando...</p>
                </Transition>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/prospeccao/listar-organizacoes-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';

export default {
    name: 'ListarOrganizacoesView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
    },
    data() {
        return {
            organizacoes: null,

            carregandoRequisicao: false,

            rotaAnterior: null,
        }
    },
    beforeRouteEnter(to, from, next) {
        next(route => {
            route.rotaAnterior = from;
        })
    },
    created() {
        this.buscarOrganizacoes();
    },
    methods: {
        buscarOrganizacoes: function () {
            this.carregandoRequisicao = true;

            axios.get(process.env.VUE_APP_API_BASE_URL + "/organizacoes")
                .then((response) => {
                    console.log(response);
                    this.organizacoes = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });

            this.carregandoRequisicao = false;
        }
    }
}
</script>