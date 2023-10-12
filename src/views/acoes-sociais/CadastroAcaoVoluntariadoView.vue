<template>
    <Navbar></Navbar>
    <main id="prospeccao">
        <Header titulo="Ação de Voluntariado" icone="bi bi-collection-fill"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <ul class="tabs">
                    <li class="tabs__item">
                        <button type="button" :class="tab == 'DADOS' ? 'active' : ''" @click="selecionarTab('DADOS')">Dados
                            gerais</button>
                    </li>
                    <li class="tabs__item">
                        <button type="button" :class="tab == 'CONFIGURACOES' ? 'active' : ''"
                            @click="selecionarTab('CONFIGURACOES')">Configurações</button>
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
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Nível</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                            <div class="form-input">
                                <label for="name" class="form-input__label">Fase</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Tipo</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                            <div class="form-input">
                                <label for="name" class="form-input__label">Formato</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Segmento</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                            <div class="form-input">
                                <label for="name" class="form-input__label">Quantidade de vagas</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Início</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                            <div class="form-input">
                                <label for="name" class="form-input__label">Término</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Local</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                            <div class="form-input">
                                <label for="name" class="form-input__label">Horário</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Sobre a organização</label>
                                <textarea name="name" id="name" class="form-input__item"></textarea>
                            </div>
                            <div class="form-input">
                                <label for="name" class="form-input__label">Sobre a ação</label>
                                <textarea name="name" id="name" class="form-input__item"></textarea>
                            </div>
                        </div>
                        <div class="form-input">
                            <label for="name" class="form-input__label">Informações adicionais</label>
                            <textarea name="name" id="name" class="form-input__item"></textarea>
                        </div>
                    </div>
                    <div class="tab-content__dados" v-show="tab == 'CONFIGURACOES'">
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Habilitar doações?</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                            <div class="form-input">
                                <label for="name" class="form-input__label">Doações públicas?</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Tipo de meta</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                            <div class="form-input">
                                <label for="name" class="form-input__label">Meta</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Doações de outros valores</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                            <div class="form-input">
                                <label for="name" class="form-input__label">Multiplicador</label>
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
import '../../assets/styles/cadastro-acao-voluntariado.css';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';

export default {
    name: 'CadastroAcaoVoluntariadoView',
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