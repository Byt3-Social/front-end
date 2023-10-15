<template>
    <Navbar></Navbar>
    <main id="cadastrar-organizacao-view">
        <Header titulo="Organização" icone="bi bi-building-fill-add"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <div class="alerta alerta--error" v-if="erroCadastro">
                    <i class="alerta__icone bi bi-x-circle-fill"></i>
                    <p class="alerta__message">Não foi possível cadastrar essa organização</p>
                </div>
                <form action="#" method="post">
                    <fieldset class="fieldset">
                        <legend class="fieldset__legend">Empresa</legend>

                        <div class="form-input-wrapper">
                            <label for="nome" class="form-input-label">Razão social</label>
                            <input type="text" name="nome" id="nome" class="form-input" v-model="nome" autofocus>
                        </div>
                        <div class="form-input-wrapper">
                            <label for="cnpj" class="form-input-label">CNPJ</label>
                            <input type="text" name="cnpj" id="cnpj" class="form-input" v-maska="cnpj"
                                data-maska="##.###.###/####-##" autofocus>
                        </div>
                        <div class="form-input-wrapper">
                            <label for="email" class="form-input-label">Email</label>
                            <input type="email" name="email" id="email" class="form-input" v-model="email">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="telefone" class="form-input-label">Telefone</label>
                            <input type="text" name="telefone" id="telefone" class="form-input" v-maska="telefone"
                                data-maska="['(##) ####-####', '(##) #####-####']">
                        </div>
                    </fieldset>

                    <fieldset class="fieldset">
                        <legend class="fieldset__legend">Responsável</legend>

                        <div class="form-input-wrapper">
                            <label for="responsavel.nome" class="form-input-label">Nome</label>
                            <input type="text" name="responsavel.nome" id="responsavel.nome" class="form-input"
                                v-model="responsavel.nome">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="responsavel.email" class="form-input-label">Email</label>
                            <input type="email" name="responsavel.email" id="responsavel.email" class="form-input"
                                v-model="responsavel.email">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="responsavel.telefone" class="form-input-label">Telefone</label>
                            <input type="text" name="responsavel.telefone" id="responsavel.telefone" class="form-input"
                                v-maska="responsavel.telefone" data-maska="['(##) ####-####', '(##) #####-####']">
                        </div>
                    </fieldset>

                    <button class="primary-button" @click.prevent="cadastrarEmpresa()">
                        <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                        <span v-show="!carregandoRequisicao">Cadastrar</span>
                    </button>
                </form>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/prospeccao/cadastrar-organizacao-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';

export default {
    name: 'CadastrarOrganizacaoView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel
    },
    data() {
        return {
            nome: null,
            cnpj: {
                masked: null,
                unmasked: null,
                completed: false,
            },
            email: null,
            telefone: {
                masked: null,
                unmasked: null,
                completed: false,
            },
            responsavel: {
                nome: null,
                email: null,
                telefone: {
                    masked: null,
                    unmasked: null,
                    completed: false,
                },
            },

            carregandoRequisicao: false,
            erroCadastro: false,
        }
    },
    methods: {
        cadastrarEmpresa: function () {
            this.carregandoRequisicao = true;

            var data = {
                nome: this.nome,
                cnpj: this.cnpj.unmasked,
                email: this.email,
                telefone: this.telefone.unmasked,
                responsavel: {
                    nome: this.responsavel.nome,
                    email: this.responsavel.email,
                    telefone: this.responsavel.telefone.unmasked
                },
            };

            axios.post("http://localhost:8082/organizacoes", data)
                .then((response) => {
                    this.$router.push({ name: 'ListarOrganizacoes', query: { sucessoCadastro: true } });
                })
                .catch((error) => {
                    this.erroCadastro = true;
                    window.scrollTo(0, 0);

                    document.querySelectorAll(".form-input").forEach(field => {
                        if (field.nextElementSibling != null) {
                            field.classList.remove("field-error");
                            field.nextElementSibling.remove();
                        }
                    });

                    if (error.response.status != null && error.response.status == 409) {
                        var elemento = document.querySelector(".alerta--error .alerta__message");
                        elemento.innerText = "Organização já cadastrada";
                    }

                    if (error.response.status != null && error.response.status == 400 && error.response.data != null) {
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
                });

            this.carregandoRequisicao = false;
        }
    }
}
</script>