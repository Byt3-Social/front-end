<template>
    <Navbar></Navbar>
    <main id="listar-processos-view">
        <Header titulo="Processos" icone="bi bi-file-earmark-fill"></Header>
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
                            <td>CNPJ</td>
                            <td>Organização</td>
                            <td>Status</td>
                            <td>Ações</td>
                        </tr>
                    </thead>
                    <Transition>
                        <tbody v-if="!carregandoRequisicao">
                            <tr v-for="processo in processos">
                                <td>{{ cnpjMask(processo.cnpj) }}</td>
                                <td>{{ processo.nome_empresarial }}</td>
                                <td>
                                    <span :class="`status status--${processo.status}`">{{
                                        processo.status.replace("EM_ANALISE", "EM ANÁLISE") }}</span>
                                </td>
                                <td>
                                    <router-link :to="{ name: 'VisualizarProcesso', params: { id: processo.id } }"
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
import '../../assets/styles/compliance/listar-processos-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';
import { Mask } from "maska";

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
            processos: null,

            carregandoRequisicao: false,

            rotaAnterior: null,
        }
    },
    mounted() {

    },
    beforeRouteEnter(to, from, next) {
        next(route => {
            route.rotaAnterior = from;
        })
    },
    created() {
        this.buscarProcessos();
    },
    methods: {
        cnpjMask: function (cnpj) {
            var mask = new Mask({ mask: "##.###.###/####-##" });

            return mask.masked(cnpj);
        },
        buscarProcessos: function () {
            this.carregandoRequisicao = true;

            axios.get("http://localhost:8083/processos")
                .then((response) => {
                    console.log(response);
                    this.processos = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });

            this.carregandoRequisicao = false;
        }
    }
}
</script>