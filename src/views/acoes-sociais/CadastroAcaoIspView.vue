<template>
    <Navbar></Navbar>
    <main id="prospeccao">
        <Header titulo="Investimento Social Privado" icone="bi bi-wallet2"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <ul class="tabs">
                    <li class="tabs__item">
                        <button type="button" :class="tab == 'DADOS' ? 'active' : ''" @click="selecionarTab('DADOS')">Dados
                            gerais</button>
                    </li>
                    <li class="tabs__item">
                        <button type="button" :class="tab == 'FINANCEIRO' ? 'active' : ''"
                            @click="selecionarTab('FINANCEIRO')">Financeiro</button>
                    </li>
                </ul>

                <form action="#" method="post">
                    <div class="tab-content__dados" v-show="tab == 'DADOS'">
                        <div class="form-input">
                            <label for="name" class="form-input__label">Nome da ação</label>
                            <input type="type" :name="name" id="name" class="form-input__item">
                        </div>
                        <div class="form-input">
                            <label for="name" class="form-input__label">Organização</label>
                            <input type="type" :name="name" id="name" class="form-input__item">
                        </div>
                        <div class="form-input">
                            <label for="name" class="form-input__label">Descrição</label>
                            <textarea name="name" id="name" class="form-input__item"></textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Status</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                            <div class="form-input">
                                <label for="name" class="form-input__label">Impacto</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Abrangência</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                            <div class="form-input">
                                <label for="name" class="form-input__label">Locais impactados</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Categoria</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                            <div class="form-input">
                                <label for="name" class="form-input__label">Área</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                        </div>
                    </div>
                    <div class="tab-content__dados" v-show="tab == 'FINANCEIRO'">
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Tipo de investimento</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                            <div class="form-input">
                                <label for="name" class="form-input__label">Aporte inicial</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Incentivo fiscal</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
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
import '../../assets/styles/cadastro-acao-isp.css';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';

export default {
    name: 'CadastroAcaoIspView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
    },
    data() {
        return {
            tab: 'DADOS'
        }
    },
    methods: {
        selecionarTab: function (tab) {
            this.tab = tab;
        }
    }
}
</script>