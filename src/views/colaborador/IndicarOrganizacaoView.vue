<template>
    <Navbar></Navbar>
    <main id="indicar-organizacao-view">
        <Header titulo="Indicação" icone="bi bi-building-fill-up"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <form action="#" method="post">
                    <fieldset class="fieldset">
                        <legend class="fieldset__legend">Indicação</legend>

                        <div class="form-input-wrapper">
                            <label for="indicacao.nomeOrganizacao" class="form-input-label">Nome da organização</label>
                            <input type="text" name="indicacao.nomeOrganizacao" id="indicacao.nomeOrganizacao" class="form-input" v-model="indicacao.nomeOrganizacao">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="indicacao.nomeResponsavel" class="form-input-label">Nome do responsável</label>
                            <input type="text" name="indicacao.nomeResponsavel" id="indicacao.nomeResponsavel" class="form-input" v-model="indicacao.nomeResponsavel">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="indicacao.telefoneResponsavel" class="form-input-label">Telefone do responsável</label>
                            <input type="text" name="indicacao.telefoneResponsavel" id="indicacao.telefoneResponsavel" class="form-input" v-maska="indicacao.telefoneResponsavel"
                                data-maska="['(##) ####-####', '(##) #####-####']">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="indicacao.emailResponsavel" class="form-input-label">Email do responsável</label>
                            <input type="email" name="indicacao.emailResponsavel" id="indicacao.emailResponsavel" class="form-input" v-model="indicacao.emailResponsavel">
                        </div>
                    </fieldset>

                    <fieldset class="fieldset">
                        <legend class="fieldset__legend">Alinhamento</legend>

                        <div class="form-input-wrapper">
                            <label for="acao.id" class="form-input-label">Em qual categoria a organização indicado se encaixa?</label>
                            <select name="acao.id" id="acao.id" class="form-input" v-model="alinhamento.categoria">
                                <option :value="null" selected disabled>Selecione uma opção...</option>
                                <option value="">Esporte</option>
                                <option value="">STEM</option>
                                <option value="">Educação</option>
                                <option value="">Combate ao abandono</option>
                                <option value="">Combate a evasão escolar</option>
                                <option value="">Alfabetização</option>
                                <option value="">Transversal</option>
                                <option value="">Formação para a vida e para o trabalho</option>
                                <option value="">Doação emergencial</option>
                            </select>
                        </div>

                        <div class="form-input-wrapper">
                            <label for="acao.id" class="form-input-label">Em qual tipo de ação social você acredita que a organização indicada melhor se enquadra?</label>
                            <select name="acao.id" id="acao.id" class="form-input" v-model="alinhamento.tipoAcao">
                                <option :value="null" selected disabled>Selecione uma opção...</option>
                                <option value="">Ação de Voluntariado</option>
                                <option value="">Ação de Investimento Social Privado</option>
                                <option value="">Ação de Voluntariado / Ação de Investimento Social Privado</option>
                            </select>
                        </div>
                        
                        <div class="form-input-wrapper">
                            <label for="acao.id" class="form-input-label">Qual a abrangência das ações realizadas pela organização indicada?</label>
                            <select name="acao.id" id="acao.id" class="form-input" v-model="alinhamento.abrangencia">
                                <option :value="null" selected disabled>Selecione uma opção...</option>
                                <option value="">Nacional</option>
                                <option value="">Estadual</option>
                                <option value="">Regional/Local</option>
                            </select>
                        </div>

                        <div class="form-input-wrapper">
                                <label for="indicacao.informacoesAdicionais" class="form-input-label">
                                    Descreva brevemente o porquê você acredita que a organização indicada está alinhada com o nosso propósito
                                </label>
                                <textarea name="indicacao.informacoesAdicionais"
                                    id="indicacao.informacoesAdicionais" class="form-input"
                                    v-model="alinhamento.informacoesAdicionais"></textarea>
                            </div>
                    </fieldset>

                    <div class="form-input-wrapper">
                        <label for="colaborador-indicador" id="colaborador-indicador-label" class="form-input-label">Colaborador Indicador</label>
                        <input type="text" id="colaborador-indicador" class="form-input text-center" value="Leandro Pereira" disabled>
                    </div>

                    <button class="primary-button" @click.prevent="indicarOrganizacao()">
                        <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                        <span v-show="!carregandoRequisicao">Indicar</span>
                    </button>
                </form>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/colaborador/indicar-organizacao-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';

export default {
    name: 'IndicarOrganizacaoView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel
    },
    data() {
        return {
            indicacao: {
                nomeOrganizacao: null,
                nomeResponsavel: null,
                telefoneResponsavel: {
                    masked: null,
                    unmasked: null,
                    completed: false,
                },
                emailResponsavel: null,
            },
            alinhamento: {
                categoria: null,
                tipoAcao: null,
                abrangencia: null,
                informacoesAdicionais: null,
            },
            carregandoRequisicao: false,
        }
    },
    methods: {
        indicarOrganizacao: function() {
            // To do
        }
    }
}
</script>