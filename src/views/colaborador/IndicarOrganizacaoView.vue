<template>
    <Navbar></Navbar>
    <main id="indicar-organizacao-view">
        <Header titulo="Indicação" icone="bi bi-building-fill-up"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <div class="alerta alerta--error" v-show="erroIndicacao">
                    <i class="alerta__icone bi bi-x-circle-fill"></i>
                    <p class="alerta__message">Não foi possível indicar essa organização</p>
                </div>
                <form action="#" method="post">
                    <fieldset class="fieldset">
                        <legend class="fieldset__legend">Indicação</legend>

                        <div class="form-input-wrapper">
                            <label for="indicacao.nomeOrganizacao" class="form-input-label">Nome da organização</label>
                            <input type="text" name="indicacao.nomeOrganizacao" id="nomeOrganizacao" class="form-input" v-model="indicacao.nomeOrganizacao">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="indicacao.responsavel.nome" class="form-input-label">Nome do responsável</label>
                            <input type="text" name="indicacao.responsavel.nome" id="responsavel.nome" class="form-input" v-model="indicacao.responsavel.nome">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="telefoneResponsavel" class="form-input-label">Telefone do responsável</label>
                            <input type="text" name="telefoneResponsavel" id="responsavel.telefone" class="form-input" v-maska="telefoneResponsavel" data-maska="['(##) ####-####', '(##) #####-####']">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="indicacao.responsavel.email" class="form-input-label">Email do responsável</label>
                            <input type="email" name="indicacao.responsavel.email" id="responsavel.email" class="form-input" v-model="indicacao.responsavel.email">
                        </div>
                    </fieldset>

                    <fieldset class="fieldset">
                        <legend class="fieldset__legend">Alinhamento</legend>

                        <div class="form-input-wrapper">
                            <label for="indicacao.categoriaId" class="form-input-label">Em qual categoria a organização indicado se encaixa?</label>
                            <select name="indicacao.categoriaId" id="categoriaId" class="form-input" v-model="indicacao.categoriaId">
                                <option :value="null" selected disabled>Selecione uma categoria...</option>
                                <option v-for="categoria in categorias" :value="categoria.id">{{categoria.nome }}</option>
                            </select>
                        </div>

                        <div class="form-input-wrapper">
                            <label for="indicacao.tipoAcao" class="form-input-label">Em qual tipo de ação social você acredita que a organização indicada melhor se enquadra?</label>
                            <select name="indicacao.tipoAcao" id="tipoAcao" class="form-input" v-model="indicacao.tipoAcao">
                                <option :value="null" selected disabled>Selecione uma opção...</option>
                                <option value="VOLUNTARIADO">Ação de Voluntariado</option>
                                <option value="ISP">Ação de Investimento Social Privado</option>
                                <option value="AMBOS">Ação de Voluntariado / Ação de Investimento Social Privado</option>
                            </select>
                        </div>
                        
                        <div class="form-input-wrapper">
                            <label for="indicacao.abrangencia" class="form-input-label">Qual a abrangência das ações realizadas pela organização indicada?</label>
                            <select name="indicacao.abrangencia" id="abrangencia" class="form-input" v-model="indicacao.abrangencia">
                                <option :value="null" selected disabled>Selecione uma opção...</option>
                                <option value="INTERNACIONAL">Internacional</option>
                                <option value="NACIONAL">Nacional</option>
                                <option value="ESTADUAL">Estadual</option>
                                <option value="REGIONAL">Regional/Local</option>
                            </select>
                        </div>

                        <div class="form-input-wrapper">
                                <label for="indicacao.textoIndicacao" class="form-input-label">
                                    Descreva brevemente o porquê você acredita que a organização indicada está alinhada com o nosso propósito
                                </label>
                                <textarea name="indicacao.textoIndicacao"
                                    id="textoIndicacao" class="form-input" v-model="indicacao.textoIndicacao"></textarea>
                            </div>
                    </fieldset>

                    <div class="form-input-wrapper">
                        <label for="colaborador-indicador" id="colaborador-indicador-label" class="form-input-label">Colaborador Indicador</label>
                        <input type="text" id="colaborador-indicador" class="form-input text-center" :value="indicacao.colaborador" disabled>
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
    created() {
        this.buscarCategorias();

        var usuario;

        if (this.$route.meta.authScope == 'colaborador') {
            usuario = JSON.parse(localStorage.getItem('B3Social-Colaborador'));
            this.indicacao.colaborador = usuario.nome;
        }
    },
    data() {
        return {
            categorias: null,
            indicacao: {
                nomeOrganizacao: null,
                responsavel: {
                    nome: null,
                    email: null,
                    telefone: null
                },
                tipoAcao: null,
                abrangencia: null,
                textoIndicacao: null,
                categoriaId: null,
                colaborador: null,
            },
            telefoneResponsavel: {
                masked: null,
                unmasked: null,
                completed: false,
            },
            carregandoRequisicao: false,
            erroIndicacao: false,
        }
    },
    methods: {
        buscarCategorias: function() {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/prospeccao/indicacoes/categorias")
                .then((response) => {
                    this.categorias = response.data;
                })
                .catch(() => {

                });
        },
        indicarOrganizacao: function() {
            this.indicacao.responsavel.telefone = this.telefoneResponsavel.unmasked;

            axios.post(process.env.VUE_APP_API_BASE_URL + "/prospeccao/indicacoes", this.indicacao)
                .then((response) => {
                    this.$router.push({ name: 'ColaboradorHome', query: { sucessoIndicacao: true } });
                })
                .catch((error) => {
                    document.querySelectorAll(".field-error__message").forEach(field => {
                        field.remove();
                    });

                    document.querySelectorAll(".field-error").forEach(field => {
                        field.classList.remove("field-error");
                    });

                    if (error.response && error.response.status != null && error.response.status == 400 && error.response.data != null) {
                        error.response.data.forEach(fieldError => {
                            var campo = document.getElementById(fieldError.field);

                            if (campo != null) {
                                var span = document.createElement("span");
                                span.classList.add("field-error__message");
                                span.innerText = fieldError.message;

                                campo.after(span);
                                campo.classList.add("field-error");
                            }
                        });
                    }

                    this.carregandoRequisicao = false;
                    this.erroIndicacao = true;
                    window.scrollTo(0, 0);
                });
        }
    }
}
</script>