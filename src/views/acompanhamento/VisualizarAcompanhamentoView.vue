<template>
    <Navbar></Navbar>
    <main id="visualizar-acompanhamento-view">
        <Header titulo="Acompanhamento" icone="bi bi-file-earmark-bar-graph-fill"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <div class="alerta alerta--error" v-if="erroCadastro">
                    <i class="alerta__icone bi bi-x-circle-fill"></i>
                    <p class="alerta__message">Não foi possível editar as informações dessa organização</p>
                </div>
                <ul class="tabs">
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'INDICADORES' ? 'active' : ''"
                            @click="selecionarTab('INDICADORES')">Indicadores</button>
                    </li>
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'REUNIOES' ? 'active' : ''"
                            @click="selecionarTab('REUNIOES')">Reuniões</button>
                    </li>
                    <li class="tabs__item">
                        <button class="tabs__button" :class="tab == 'ARQUIVOS' ? 'active' : ''"
                            @click="selecionarTab('ARQUIVOS')">Arquivos</button>
                    </li>
                </ul>

                <div class="tabs__content" v-if="tab == 'INDICADORES'">
                    <div class="bloco">
                        <label class="bloco__atributo">CNPJ</label>
                        <p class="bloco__atributo--preenchido">TESTE</p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">CNPJ</label>
                        <p class="bloco__atributo--preenchido">TESTE</p>
                    </div>
                    <div class="bloco">
                        <label class="bloco__atributo">CNPJ</label>
                        <p class="bloco__atributo--preenchido">TESTE</p>
                    </div>
                </div>
                <div class="tabs__content" v-if="tab == 'REUNIOES'">
                    <button class="primary-button solicitar-reuniao" @click.prevent="atualizarEmpresa()">
                        Solicitar reunião
                    </button>
                    <div class="reuniao">
                        <i class="bi bi-microsoft-teams"></i>
                        <div class="reuniao__detalhes">
                            <p>Microsoft Teams</p>
                            <p>Aguardando agendamento</p>
                        </div>
                    </div>
                    <div class="reuniao">
                        <i class="bi bi-microsoft-teams"></i>
                        <div class="reuniao__detalhes">
                            <p>Microsoft Teams</p>
                            <p>11 de outubro de 2023 às 20:30</p>
                            <a href="#">Entrar na reunião</a>
                        </div>
                    </div>
                    <div class="reuniao">
                        <i class="bi bi-microsoft-teams"></i>
                        <div class="reuniao__detalhes">
                            <p>Microsoft Teams</p>
                            <p>11 de outubro de 2023 às 20:30</p>
                            <p>Acesso expirado</p>
                        </div>
                    </div>
                </div>
                <div class="tabs__content" v-if="tab == 'ARQUIVOS'">
                    <div class="documento">
                        <div class="documento__solicitado">
                            <i class="bi bi-file-plus documento__icone"></i>
                            <p class="documento__nome">Arquivos</p>
                        </div>
                        <div class="documento__enviado">
                            <div class="documento__detalhes">
                                <i class="bi bi-file-pdf-fill"></i>
                                <div class="documento__info">
                                    <p>Nome arquivo.pdf</p>
                                    <p>10 bytes</p>
                                </div>
                            </div>
                            <div class="documento__acoes">
                                <button type="button" @click.prevent="baixarDocumento(0)">
                                    <i class="bi bi-cloud-arrow-down-fill documento__icone documento__icone--download"></i>
                                </button>
                                <button type="button" @click.prevent="baixarDocumento(0)">
                                    <i class="bi bi-x-circle-fill documento__icone documento__icone--reset"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/acompanhamento/visualizar-acompanhamento-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';

export default {
    name: 'VisualizarAcompanhamentoView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel
    },
    created() {
        // this.buscarOrganizacao(this.$route.params.id);
    },
    data() {
        return {
            tab: 'INDICADORES'
        }
    },
    methods: {
        selecionarTab: function (tab) {
            this.tab = tab;
        },
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