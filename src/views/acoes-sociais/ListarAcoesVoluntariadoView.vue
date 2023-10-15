<template>
    <Navbar></Navbar>
    <main id="listar-acoes-voluntariado-view">
        <Header titulo="Voluntariado" icone="bi bi-collection-fill"></Header>
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
                            <td>Ação</td>
                            <td>Organização</td>
                            <td>Fase</td>
                            <td>Ações</td>
                        </tr>
                    </thead>
                    <Transition>
                        <tbody v-if="!carregandoRequisicao">
                            <tr v-for="acao in acoes">
                                <td>{{ acao.nome_acao }}</td>
                                <td>{{ organizacoes != null ? matchOrganizacao(acao.organizacao_id) : "-" }}</td>
                                <td>
                                    <span :class="`status status--${acao.fase}`">{{
                                        acao.fase.replace("EM_ANDAMENTO", "EM ANDAMENTO") }}</span>
                                </td>
                                <td>
                                    <router-link :to="{ name: 'EditarAcaoVoluntariado', params: { id: acao.id } }"
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
import '../../assets/styles/acoes-sociais/listar-acoes-voluntariado-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';
import { Mask } from "maska";

export default {
    name: 'ListarAcoesIspView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
    },
    data() {
        return {
            acoes: null,
            organizacoes: null,

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
        this.buscarAcoes();
        this.buscarOrganizacoes();
    },
    methods: {
        cnpjMask: function (cnpj) {
            var mask = new Mask({ mask: "##.###.###/####-##" });

            return mask.masked(cnpj);
        },
        buscarAcoes: function () {
            this.carregandoRequisicao = true;

            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-voluntariado")
                .then((response) => {
                    console.log(response);
                    this.acoes = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });

            this.carregandoRequisicao = false;
        },
        buscarOrganizacoes: function () {
            this.carregandoRequisicao = true;

            axios.get("http://localhost:8082/organizacoes")
                .then((response) => {
                    console.log(response);
                    this.organizacoes = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });

            this.carregandoRequisicao = false;
        },
        matchOrganizacao: function(id) {
            for (let index = 0; index < this.organizacoes.length; index++) {
                const organizacao = this.organizacoes[index];
                
                if(organizacao.id == id) {
                    return organizacao.nome;
                }
            }
        },
    }
}
</script>