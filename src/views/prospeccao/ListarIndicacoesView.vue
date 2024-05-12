<template>
    <Navbar></Navbar>
    <main id="listar-indicacoes-view">
        <Header titulo="Indicações" icone="bi bi-building-fill-down"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
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
                                <td>{{ indicacao.nomeEmpresarial }}</td>
                                <td>
                                    <span :class="`status status--${indicacao.status}`">
                                        {{ indicacao.status.replace("CONCLUIDA", "CONCLUÍDA") }}
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
            // To do

            // Placeholder data
            this.indicacoes = [
                {
                    id: 1,
                    nomeEmpresarial: "NeuroTech",
                    status: "INDICADA"
                },
                {
                    id: 2,
                    nomeEmpresarial: "PDTec",
                    status: "CONVIDADA"
                },
                {
                    id: 3,
                    nomeEmpresarial: "BLK",
                    status: "CONCLUIDA"
                },
                {
                    id: 4,
                    nomeEmpresarial: "Neoway",
                    status: "ARQUIVADA"
                },
            ];
        }
    }
}
</script>