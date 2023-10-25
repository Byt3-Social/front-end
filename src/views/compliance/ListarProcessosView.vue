<template>
    <Navbar></Navbar>
    <main id="listar-processos-view">
        <Header titulo="Processos" icone="bi bi-file-earmark-fill"></Header>
        <Transition>
            <FloatingPanel v-if="erroBuscaProcessos">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--info">
                        <i class="alerta__icone bi bi-info-circle-fill"></i>
                        <p class="alerta__message">Não foi possível recuperar os registros de processos</p>
                    </div>
                </template>
            </FloatingPanel>
        </Transition>
        <Transition>
            <FloatingPanel v-if="!erroBuscaProcessos && processos != null">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--sucesso"
                        v-if="rotaAnterior != null && rotaAnterior.name == 'EditarOrganizacao' && this.$route.query.sucessoAtualizacao">
                        <i class="alerta__icone bi bi-check-circle-fill"></i>
                        <p class="alerta__message">Processo atualizado com sucesso</p>
                    </div>
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">CNPJ</th>
                                <th scope="col">Organização</th>
                                <th scope="col">Status</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="processo in processos">
                                <td>{{ utils.cnpjMask(processo.cnpj) }}</td>
                                <td>{{ processo.nomeEmpresarial }}</td>
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
                    </table>
                </template>
            </FloatingPanel>
        </Transition>
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
import utils from '@/helpers/maska'

export default {
    name: 'ListarProcessosView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
    },
    data() {
        return {
            processos: null,
            rotaAnterior: null,
            erroBuscaProcessos: false,
            utils: utils
        }
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
        buscarProcessos: function () {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/compliance/processos")
                .then((response) => {
                    this.processos = response.data;
                })
                .catch(() => {
                    this.erroBuscaProcessos = true;
                });
        }
    }
}
</script>