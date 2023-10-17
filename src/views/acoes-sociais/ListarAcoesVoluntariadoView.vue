<template>
    <Navbar></Navbar>
    <main id="listar-acoes-voluntariado-view">
        <Header titulo="Voluntariado" icone="bi bi-collection-fill"></Header>
        <Transition>
            <FloatingPanel v-if="erroBuscaAcoes">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--info">
                        <i class="alerta__icone bi bi-info-circle-fill"></i>
                        <p class="alerta__message">Não foi possível recuperar as ações cadastradas</p>
                    </div>
                </template>
            </FloatingPanel>
        </Transition>
        <Transition>
            <FloatingPanel v-if="!erroBuscaAcoes && acoes != null && organizacoes != null">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--sucesso"
                        v-if="this.$route.query.sucessoExclusao && rotaAnterior == null">
                        <i class="alerta__icone bi bi-check-circle-fill"></i>
                        <p class="alerta__message">Ação excluída com sucesso</p>
                    </div>
                    <div class="alerta alerta--error" v-if="this.$route.query.falhaExclusao && rotaAnterior == null">
                        <i class="alerta__icone bi bi-x-circle-fill"></i>
                        <p class="alerta__message">Falha ao excluir a ação solicitada</p>
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
                        <tbody>
                            <tr v-for="(acao, index) in acoes">
                                <td>{{ acao.nomeAcao }}</td>
                                <td>{{ acao.organizacaoId != null && acao.organizacaoId != "" ?
                                    matchOrganizacao(acao.organizacaoId) : "-" }}</td>
                                <td>
                                    <span :class="`status status--${acao.fase}`">{{
                                        acao.fase.replace("EM_ANDAMENTO", "EM ANDAMENTO") }}</span>
                                </td>
                                <td>
                                    <router-link :to="{ name: 'EditarAcaoVoluntariado', params: { id: acao.id } }"
                                        class="acao">
                                        <i class="acao__icone bi bi-pencil-square acao--editar"></i>
                                    </router-link>
                                    <button type="button" class="acao" @click.prevent="excluirAcao(index, acao.id)">
                                        <i class="bi bi-trash2-fill acao__icone acao--excluir"></i>
                                    </button>
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
import '../../assets/styles/acoes-sociais/listar-acoes-voluntariado-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';

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
            erroBuscaAcoes: false,
            rotaAnterior: null,
            sucessoExclusao: false,
            falhaExclusao: false,
        }
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
        buscarAcoes: function () {
            axios.get("http://localhost:8081/acoes-voluntariado")
                .then((response) => {
                    this.acoes = response.data;
                })
                .catch((error) => {
                    this.erroBuscaAcoes = true;
                });
        },
        buscarOrganizacoes: function () {
            axios.get("http://localhost:8082/organizacoes")
                .then((response) => {
                    this.organizacoes = response.data;
                })
                .catch((error) => {
                    this.erroBuscaAcoes = true;
                });
        },
        excluirAcao: function (index, id) {
            axios.delete("http://localhost:8081/acoes-voluntariado/" + id)
                .then((response) => {
                    this.acoes.splice(index, 1);

                    this.$router.push({ name: 'ListarAcoesVoluntariado', query: { sucessoExclusao: true, timestamp: Date.now() } });
                })
                .catch((error) => {
                    console.log(error);
                    this.$router.push({ name: 'ListarAcoesVoluntariado', query: { falhaExclusao: true, timestamp: Date.now() } });
                });
        },
        matchOrganizacao: function (id) {
            for (let index = 0; index < this.organizacoes.length; index++) {
                const organizacao = this.organizacoes[index];

                if (organizacao.id == id) {
                    return organizacao.nome;
                }
            }
        },
    }
}
</script>