<template>
    <Navbar></Navbar>
    <main id="concluir-indicacao-view">
        <Header titulo="Indicação - Informações Básicas" icone="bi bi-building-fill-lock"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <div class="alerta alerta--error" v-show="erroPreenchimento">
                    <i class="alerta__icone bi bi-x-circle-fill"></i>
                    <p class="alerta__message">Não foi possível salvar o formulário</p>
                </div>
                <div class="alerta alerta--sucesso mb-0"
                    v-if="rotaAnterior == null && this.sucessoPreenchimento">
                    <i class="alerta__icone bi bi-check-circle-fill"></i>
                    <p class="alerta__message">Formulário salvo com sucesso</p>
                </div>
                <div class="alerta alerta--info mb-0"
                    v-if="!formDisponivel">
                    <i class="alerta__icone bi bi-info-circle-fill"></i>
                    <p class="alerta__message">Acesso inválido</p>
                </div>

                <form action="#" method="post" v-if="formDisponivel != null && formDisponivel && rotaAnterior == null && !sucessoPreenchimento">
                    <fieldset class="fieldset">
                        <legend class="fieldset__legend">Empresa</legend>

                        <div class="form-input-wrapper">
                            <label for="nome" class="form-input-label">Razão social</label>
                            <input type="text" name="razaoSocial" id="nomeOrganizacao" class="form-input" v-model="nome">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="cnpj" class="form-input-label">CNPJ</label>
                            <input type="text" name="cnpj" id="cnpj" class="form-input" v-maska="cnpj"
                                data-maska="##.###.###/####-##">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="email" class="form-input-label">Email</label>
                            <input type="email" name="email" id="emailOrganizacao" class="form-input" v-model="email">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="telefone" class="form-input-label">Telefone</label>
                            <input type="text" name="telefone" id="telefoneOrganizacao" class="form-input" v-maska="telefone"
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
                            <label for="responsavel.cpf" class="form-input-label">CPF</label>
                            <input type="text" name="responsavel.cpf" id="responsavel.cpf" class="form-input"
                                v-maska="responsavel.cpf" data-maska="###.###.###-##">
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

                    <p class="text-center">Atenção: certifique-se de que os dados inseridos estão corretos e verídicos.</p>
                    <p class="text-center">
                        <strong>Uma vez preenchido, este formulário não poderá ser editado.</strong>
                    </p>

                    <button class="primary-button" @click.prevent="concluir(this.$route.params.id)">
                        <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                        <span v-show="!carregandoRequisicao">Concluir</span>
                    </button>
                </form>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/organizacao/concluir-indicacao-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';

export default {
    name: 'ConcluirIndicacaoView',
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
                cpf: {
                    masked: null,
                    unmasked: null,
                    completed: false,
                },
                telefone: {
                    masked: null,
                    unmasked: null,
                    completed: false,
                },
            },

            carregandoRequisicao: false,
            erroPreenchimento: false,
            sucessoPreenchimento: false,
            formDisponivel: null
        }
    },
    async created() {
        await this.verificar(this.$route.params.id);
    },
    methods: {
        verificar: async function(id) {
            await axios.post(process.env.VUE_APP_API_BASE_URL + "/prospeccao/indicacoes/" + id + "/cadastros/verificacoes")
                .then((response) => {
                    this.formDisponivel = response.data;
                })
                .catch((error) => {
                    this.formDisponivel = false;
                });
        },
        concluir: function (id) {
            var data = {
                indicacaoId: id,
                cnpj: this.cnpj.unmasked,
                nomeOrganizacao: this.nome,
                emailOrganizacao: this.email,
                telefoneOrganizacao: this.telefone.unmasked,
                responsavel: {
                    nome: this.responsavel.nome,
                    cpf: this.responsavel.cpf.unmasked,
                    email: this.responsavel.email,
                    telefone: this.responsavel.telefone.unmasked
                },
            };

            axios.post(process.env.VUE_APP_API_BASE_URL + "/prospeccao/indicacoes/" + id + "/cadastros", data)
                .then((response) => {
                    document.querySelectorAll(".field-error__message").forEach(field => {
                        field.remove();
                    });

                    document.querySelectorAll(".field-error").forEach(field => {
                        field.classList.remove("field-error");
                    });

                    this.sucessoPreenchimento = true;
                    this.erroPreenchimento = false;
                    window.scrollTo(0, 0);
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
                    this.erroPreenchimento = true;
                    window.scrollTo(0, 0);
                });
        }
    }
}
</script>