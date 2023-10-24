<template>
    <Navbar></Navbar>
    <main id="editar-organizacao-view">
        <Header titulo="Organização" icone="bi bi-building-fill-gear"></Header>
        <Transition>
            <FloatingPanel v-if="erroBuscaOrganizacao">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--info">
                        <i class="alerta__icone bi bi-info-circle-fill"></i>
                        <p class="alerta__message">Não foi possível recuperar as informações da organização</p>
                    </div>
                </template>
            </FloatingPanel>
        </Transition>
        <Transition>
            <FloatingPanel v-if="!erroBuscaOrganizacao && organizacao != null">
                <template v-slot:FloatingPanelContent>
                    <form action="#" method="post">
                        <div class="alerta alerta--error" v-if="erroAtualizacao">
                            <i class="alerta__icone bi bi-x-circle-fill"></i>
                            <p class="alerta__message">Não foi possível atualizar as informações dessa organização</p>
                        </div>
                        <fieldset class="fieldset">
                            <legend class="fieldset__legend">Empresa</legend>

                            <div class="form-input-wrapper">
                                <label for="statusCadastro" class="form-input-label">Status</label>
                                <input type="text" id="statusCadastro"
                                    :class="`form-input status status--${organizacao.statusCadastro}`"
                                    :value="organizacao.statusCadastro != null ? organizacao.statusCadastro.replace('EM_ANALISE', 'EM ANÁLISE') : organizacao.statusCadastro"
                                    disabled>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="createdAt" class="form-input-label">Cadastrada em</label>
                                <input type="text" id="createdAt" class="form-input created-at"
                                    :value="(new Date(organizacao.createdAt)).toLocaleDateString('pt-BR', options)"
                                    disabled>
                            </div>

                            <div class="form-input-wrapper">
                                <label for="nome" class="form-input-label">Razão social</label>
                                <input type="text" name="razaoSocial" id="nome" class="form-input"
                                    v-model="organizacao.nome">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="cnpj" class="form-input-label">CNPJ</label>
                                <input type="text" name="cnpj" id="cnpj" class="form-input" v-maska="cnpj"
                                    data-maska="##.###.###/####-##" :disabled="organizacao.statusCadastro != 'INDICADO'"
                                    v-model="organizacao.cnpj">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="email" class="form-input-label">Email</label>
                                <input type="email" name="email" id="email" class="form-input" v-model="organizacao.email">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="telefone" class="form-input-label">Telefone</label>
                                <input type="text" name="telefone" id="telefone" class="form-input" v-maska="telefone"
                                    data-maska="['(##) ####-####', '(##) #####-####']" v-model="organizacao.telefone">
                            </div>
                        </fieldset>

                        <fieldset class="fieldset">
                            <legend class="fieldset__legend">Responsável</legend>

                            <div class="form-input-wrapper">
                                <label for="responsavel.nome" class="form-input-label">Nome</label>
                                <input type="text" name="responsavel.nome" id="responsavel.nome" class="form-input"
                                    v-model="organizacao.responsavel.nome">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="responsavel.cpf" class="form-input-label">CPF</label>
                                <input type="text" name="responsavel.cpf" id="responsavel.cpf" class="form-input"
                                    v-model="organizacao.responsavel.cpf" v-maska="responsavel.cpf" data-maska="###.###.###-##">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="responsavel.email" class="form-input-label">Email</label>
                                <input type="email" name="responsavel.email" id="responsavel.email" class="form-input"
                                    v-model="organizacao.responsavel.email">
                            </div>
                            <div class="form-input-wrapper">
                                <label for="responsavel.telefone" class="form-input-label">Telefone</label>
                                <input type="text" name="responsavel.telefone" id="responsavel.telefone" class="form-input"
                                    v-maska="responsavel.telefone" data-maska="['(##) ####-####', '(##) #####-####']"
                                    v-model="organizacao.responsavel.telefone">
                            </div>
                        </fieldset>

                        <button class="primary-button" @click.prevent="atualizarOrganizacao()">
                            <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                            <span v-show="!carregandoRequisicao">Salvar</span>
                        </button>
                    </form>
                </template>
            </FloatingPanel>
        </Transition>
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
            organizacao: null,
            cnpj: {
                masked: null,
                unmasked: null,
                completed: false,
            },
            telefone: {
                masked: null,
                unmasked: null,
                completed: false,
            },
            responsavel: {
                cpf: {
                    masked: null,
                    unmasked: null,
                    completed: true,
                },
                telefone: {
                    masked: null,
                    unmasked: null,
                    completed: true,
                },
            },
            options: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
            },
            carregandoRequisicao: false,
            erroBuscaOrganizacao: false,
            erroAtualizacao: false,
        }
    },
    methods: {
        buscarOrganizacao: function (id) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/prospeccao/organizacoes/" + id)
                .then((response) => {
                    this.organizacao = response.data;
                })
                .catch(() => {
                    this.erroBuscaOrganizacao = true;
                });
        },
        atualizarOrganizacao: function () {
            this.carregandoRequisicao = true;

            this.organizacao.cnpj = this.cnpj.unmasked;
            this.organizacao.telefone = this.telefone.unmasked;
            this.organizacao.responsavel.cpf = this.responsavel.cpf.unmasked;
            this.organizacao.responsavel.telefone = this.responsavel.telefone.unmasked;

            axios.put(process.env.VUE_APP_API_BASE_URL + "/prospeccao/organizacoes/" + this.organizacao.id, this.organizacao)
                .then(() => {
                    this.$router.push({ name: 'ListarOrganizacoes', query: { sucessoAtualizacao: true } });
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
                    this.erroAtualizacao = true;
                    window.scrollTo(0, 0);
                });
        }
    }
}
</script>