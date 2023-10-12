<template>
    <Navbar></Navbar>
    <main id="prospeccao">
        <Header titulo="Novo Acompanhamento" icone="bi bi-pencil-square"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <ul class="tabs">
                    <li class="tabs__item">
                        <button type="button" :class="tab == 'INDICADORES' ? 'active' : ''"
                            @click="selecionarTab('INDICADORES')">Indicadores</button>
                    </li>
                    <li class="tabs__item">
                        <button type="button" :class="tab == 'ARQUIVOS' ? 'active' : ''"
                            @click="selecionarTab('ARQUIVOS')">Arquivos</button>
                    </li>
                </ul>

                <form action="#" method="post">
                    <div class="tab-content__dados" v-show="tab == 'INDICADORES'">
                        <div class="form-input">
                            <label for="name" class="form-input__label">Selecione um indicador</label>
                            <div class="form-group-icon">
                                <input type="type" :name="name" id="name" class="form-input__item">
                                <button type="button">Adicionar</button>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content__dados" v-show="tab == 'ARQUIVOS'">
                        <div class="form-input">
                            <label for="name" class="form-input__label">Solicite o envio de documentos, caso
                                necessário</label>
                            <textarea name="name" id="name" class="form-input__item"></textarea>
                        </div>
                    </div>
                    <button class="primary-button">Cadastrar</button>
                </form>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/cadastro-acompanhamento-acao.css';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';

export default {
    name: 'CadastroAcompanhamentoAcaoView',
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