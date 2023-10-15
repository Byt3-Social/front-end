<template>
    <Navbar></Navbar>
    <main id="colaborador-home-view">
        <Header titulo="Portal do Colaborador" icone="bi bi-person-fill"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <div class="alerta alerta--info">
                    <p>Acesse agora nosso novo <a href="#">Hub de ações sociais</a>!</p>
                </div>
                <button class="primary-button" @click.prevent="cadastrarEmpresa()">
                        Indique uma organização
                    </button>
                <ul class="tabs">
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'ENGAJAMENTO' ? 'active' : ''"
                            @click="selecionarTab('ENGAJAMENTO')">Engajamento</button>
                    </li>
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'DOACOES' ? 'active' : ''"
                            @click="selecionarTab('DOACOES')">Doações</button>
                    </li>
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'INTERESSES' ? 'active' : ''"
                            @click="selecionarTab('INTERESSES')">Interesses</button>
                    </li>
                </ul>
                <div class="tabs__content" v-if="tab == 'ENGAJAMENTO'">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <td>Ação</td>
                                <td>Data</td>
                                <td>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Reforma da quadra</td>
                                <td>14 de novembro de 2023</td>
                                <td>
                                    <button type="button" class="acao">
                                        <i class="acao__icone bi bi-qr-code acao--editar"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="tabs__content" v-if="tab == 'DOACOES'">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <td>Ação</td>
                                <td>Valor</td>
                                <td>Data</td>
                                <td>Link</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Arrecadação de cesta básica</td>
                                <td>R$ 100,00</td>
                                <td>11 de outubro de 2023</td>
                                <td>
                                    <a href="#">Pague agora</a>
                                </td>
                                <td><span :class="`status status--PAID`">PAGO</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Arrecadação de cesta básica</td>
                                <td>R$ 290,00</td>
                                <td>13 de outubro de 2023</td>
                                <td>
                                    -
                                </td>
                                <td><span :class="`status status--PAID`">PAGO</span>
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
import '../../assets/styles/colaborador/colaborador-home-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';

export default {
    name: 'ColaboradorHomeView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel
    },
    data() {
        return {
            tab: 'ENGAJAMENTO'
        }
    },
    methods: {
        selecionarTab: function (tab) {
            this.tab = tab;
        },
    }
}
</script>