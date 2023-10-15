<template>
    <Navbar></Navbar>
    <main id="editar-organizacao-view">
        <Header titulo="Organização" icone="bi bi-building-fill-add"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <div class="alerta alerta--error" v-if="erroCadastro">
                    <i class="alerta__icone bi bi-x-circle-fill"></i>
                    <p class="alerta__message">Não foi possível editar as informações dessa organização</p>
                </div>
                <form action="#" method="post">
                    <fieldset class="fieldset">
                        <legend class="fieldset__legend">Empresa</legend>

                        <div class="form-input-wrapper">
                            <label for="status_cadastro" class="form-input-label">Status</label>
                            <input type="text" id="status_cadastro" :class="`form-input status status--${statusCadastro}`"
                                :value="statusCadastro != null ? statusCadastro.replace('EM_ANALISE', 'EM ANÁLISE') : statusCadastro"
                                disabled>
                        </div>
                        <div class="form-input-wrapper">
                            <label for="created_at" class="form-input-label">Cadastrada em</label>
                            <input type="text" id="created_at" class="form-input created-at"
                                :value="(new Date(createdAt)).toLocaleDateString('pt-BR', options)" disabled>
                        </div>

                        <div class="form-input-wrapper">
                            <label for="nome" class="form-input-label">Razão social</label>
                            <input type="text" name="nome" id="nome" class="form-input" v-model="nome">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="cnpj" class="form-input-label">CNPJ</label>
                            <input type="text" name="cnpj" id="cnpj" class="form-input" v-maska="cnpj"
                                data-maska="##.###.###/####-##" :value="cnpj.unmasked" :disabled="statusCadastro != 'INDICADO'">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="email" class="form-input-label">Email</label>
                            <input type="email" name="email" id="email" class="form-input" v-model="email">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="telefone" class="form-input-label">Telefone</label>
                            <input type="text" name="telefone" id="telefone" class="form-input" v-maska="telefone"
                                data-maska="['(##) ####-####', '(##) #####-####']" :value="telefone.unmasked">
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
                                v-maska="responsavel.telefone" data-maska="['(##) ####-####', '(##) #####-####']"
                                :value="responsavel.telefone.unmasked">
                        </div>
                    </fieldset>

                    <button class="primary-button" @click.prevent="atualizarEmpresa()">
                        <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                        <span v-show="!carregandoRequisicao">Editar</span>
                    </button>
                </form>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/prospeccao/editar-organizacao-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';

export default {
    name: 'EditarOrganizacaoView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel
    },
    created() {
        this.buscarOrganizacao(this.$route.params.id);
    },
    data() {
        return {
            id: null,
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
                    completed: true,
                },
            },
            createdAt: null,
            statusCadastro: null,

            carregandoRequisicao: false,
            erroCadastro: false,
            options: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
            },
        }
    },
    methods: {
        buscarOrganizacao: function (id) {
            axios.get("http://localhost:8082/organizacoes/" + id)
                .then((response) => {
                    var organizacao = response.data;

                    this.id = organizacao.id;
                    this.nome = organizacao.nome;
                    this.cnpj.unmasked = organizacao.cnpj;
                    this.email = organizacao.email;
                    this.telefone.unmasked = organizacao.telefone;

                    this.responsavel.nome = organizacao.responsavel.nome;
                    this.responsavel.email = organizacao.responsavel.email;
                    this.responsavel.telefone.unmasked = organizacao.responsavel.telefone;

                    this.createdAt = organizacao.created_at;
                    this.statusCadastro = organizacao.status_cadastro;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        atualizarEmpresa: function () {
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

            axios.put("http://localhost:8082/organizacoes/" + this.id, data)
                .then((response) => {
                    this.$router.push({ name: 'ListarOrganizacoes', query: { sucessoAtualizacao: true } });
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