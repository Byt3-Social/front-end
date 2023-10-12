<template>
    <Navbar></Navbar>
    <main id="prospeccao">
        <Header titulo="Processos" icone="bi bi-file-earmark-fill"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <td>Processo</td>
                            <td>Organização</td>
                            <td>Status</td>
                            <td>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Byt3 Social</td>
                            <td>
                                <span class="status status--aberto">Aberto</span>
                            </td>
                            <td>
                                <button class="botao-acoes" type="button">
                                    <i class="bi bi-info-circle-fill acoes__item"></i>
                                </button>
                                <button class="botao-acoes" type="button">
                                    <i class="bi bi-trash2 acoes__item"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Byt3 Social</td>
                            <td>
                                <span class="status status--aprovado">Aprovado</span>
                            </td>
                            <td>
                                <button class="botao-acoes" type="button">
                                    <i class="bi bi-info-circle-fill acoes__item"></i>
                                </button>
                                <button class="botao-acoes" type="button">
                                    <i class="bi bi-trash2 acoes__item"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Byt3 Social</td>
                            <td>
                                <span class="status status--pendente">Pendente</span>
                            </td>
                            <td>
                                <button class="botao-acoes" type="button">
                                    <i class="bi bi-info-circle-fill acoes__item"></i>
                                </button>
                                <button class="botao-acoes" type="button">
                                    <i class="bi bi-trash2 acoes__item"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/listagem-processos.css';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';

export default {
    name: 'ListagemProcessosView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
    },
    data() {
        return {
            tab: 'INDICADORES'
        }
    },
    methods: {
        selecionarTab: function (tab) {
            this.tab = tab;
        }
    }
}
</script>