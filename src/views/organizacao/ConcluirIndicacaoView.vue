<template>
    <Navbar></Navbar>
    <main id="concluir-indicacao-view">
        <Header titulo="Indicação - Informações Básicas" icone="bi bi-building-fill-lock"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <form action="#" method="post">
                    <fieldset class="fieldset">
                        <legend class="fieldset__legend">Empresa</legend>

                        <div class="form-input-wrapper">
                            <label for="nome" class="form-input-label">Razão social</label>
                            <input type="text" name="razaoSocial" id="nome" class="form-input" v-model="nome">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="cnpj" class="form-input-label">CNPJ</label>
                            <input type="text" name="cnpj" id="cnpj" class="form-input" v-maska="cnpj"
                                data-maska="##.###.###/####-##">
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

                    <button class="primary-button" @click.prevent="concluir()">
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
            erroCadastro: false,
        }
    },
    methods: {
        concluir: function () {
            var data = {
                nome: this.nome,
                cnpj: this.cnpj.unmasked,
                email: this.email,
                telefone: this.telefone.unmasked,
                responsavel: {
                    nome: this.responsavel.nome,
                    cpf: this.responsavel.cpf.unmasked,
                    email: this.responsavel.email,
                    telefone: this.responsavel.telefone.unmasked
                },
            };

            // To do
        }
    }
}
</script>