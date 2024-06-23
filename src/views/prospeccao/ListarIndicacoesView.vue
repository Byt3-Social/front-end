<template>
    <Navbar></Navbar>
    <main id="listar-indicacoes-view">
        <Header titulo="Indicações" icone="bi bi-building-fill-down"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <div class="alerta alerta--sucesso"
                    v-if="rotaAnterior != null && rotaAnterior.name == 'EditarIndicacao' && this.$route.query.sucessoAtualizacao">
                    <i class="alerta__icone bi bi-check-circle-fill"></i>
                    <p class="alerta__message">Indicação atualizada com sucesso</p>
                </div>
                <div>
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <td>Organização</td>
                                <td>Status</td>
                                <td>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="indicacao in indicacoes">
                                <td>{{ indicacao.nomeOrganizacao }}</td>
                                <td>
                                    <span :class="`status status--${indicacao.status}`">
                                        {{ indicacao.status.replace("CONCLUIDA", "CONCLUÍDA").replace("FORM_PREENCHIDO", "FORM. PREENCHIDO") }}
                                    </span>
                                </td>
                                <td>
                                    <router-link :to="{ name: 'EditarIndicacao', params: { id: indicacao.id } }"
                                        class="acao">
                                        <i class="acao__icone bi bi-search acao--editar"></i>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/prospeccao/listar-indicacoes-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';

export default {
    name: 'ListarIndicacoesView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
    },
    data() {
        return {
            indicacoes: null,
            rotaAnterior: null,
        }
    },
    beforeRouteEnter(to, from, next) {
        next(route => {
            route.rotaAnterior = from;
        })
    },
    created() {
        this.buscarIndicacoes();
    },
    methods: {
        buscarIndicacoes: function() {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/prospeccao/indicacoes")
                .then((response) => {
                    this.indicacoes = response.data;
                })
                .catch(() => {

                });
        }
    }
}
</script>