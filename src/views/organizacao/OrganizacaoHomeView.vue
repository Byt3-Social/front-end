<template>
    <Navbar></Navbar>
    <main id="organizacao-home-view">
        <Header titulo="Portal B3" icone="bi bi-building-fill"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <ul class="tabs">
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'PROCESSOS' ? 'active' : ''"
                            @click="selecionarTab('PROCESSOS')">Processos</button>
                    </li>
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'ACOES' ? 'active' : ''"
                            @click="selecionarTab('ACOES')">Ações sociais</button>
                    </li>
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'REUNIOES' ? 'active' : ''"
                            @click="selecionarTab('REUNIOES')">Reuniões</button>
                    </li>
                </ul>
                <div class="tabs__content" v-if="tab == 'PROCESSOS'">
                    <div class="alerta alerta--info">
                        <p>Há um processo de análise documental aberto para essa organização. Por favor, verifique!</p>
                    </div>
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <td>Data de abertura</td>
                                <td>Status</td>
                                <td>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>14 de novembro de 2023</td>
                                <td>
                                    <span :class="`status status--WAITING`">ABERTO</span>
                                </td>
                                <td>
                                    <button type="button" class="acao">
                                        <i class="acao__icone bi bi-pencil-square acao--editar"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="tabs__content" v-if="tab == 'ACOES'">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <td>Ação</td>
                                <td>Status</td>
                                <td>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Arrecadação de cesta básica</td>
                                <td>
                                    <span :class="`status status--WAITING`">EM ANDAMENTO</span>
                                </td>
                                <td>
                                    <a href="#">Acompanhamento disponível</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Arrecadação de cesta básica</td>
                                <td>
                                    <span :class="`status status--PAID`">FINALIZADO</span>
                                </td>
                                <td>
                                    -
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="tabs__content" v-if="tab == 'REUNIOES'">
                    <div class="reuniao">
                        <i class="bi bi-microsoft-teams"></i>
                        <div class="reuniao__detalhes">
                            <p>Microsoft Teams</p>
                            <a href="#">Clique aqui para agendar um horário</a>
                        </div>
                    </div>
                    <div class="reuniao">
                        <i class="bi bi-microsoft-teams"></i>
                        <div class="reuniao__detalhes">
                            <p>Microsoft Teams</p>
                            <p>11 de outubro de 2023 às 20:30</p>
                            <a href="#">Entrar na reunião</a>
                        </div>
                    </div>
                    <div class="reuniao">
                        <i class="bi bi-microsoft-teams"></i>
                        <div class="reuniao__detalhes">
                            <p>Microsoft Teams</p>
                            <p>11 de outubro de 2023 às 20:30</p>
                            <p>Acesso expirado</p>
                        </div>
                    </div>
                </div>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/organizacao/organizacao-home-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';

export default {
    name: 'OrganizacaoHomeView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel
    },
    data() {
        return {
            tab: 'PROCESSOS'
        }
    },
    methods: {
        selecionarTab: function (tab) {
            this.tab = tab;
        },
    }
}
</script>