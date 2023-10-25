<template>
    <Navbar></Navbar>
    <main id="preencher-processo-view">
        <Header titulo="Processo" icone="bi bi-file-earmark-medical-fill"></Header>
        <Transition>
            <FloatingPanel v-if="erroBuscaProcesso">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--info">
                        <i class="alerta__icone bi bi-info-circle-fill"></i>
                        <p class="alerta__message">Não foi possível recuperar as informações desse processo</p>
                    </div>
                </template>
            </FloatingPanel>
        </Transition>
        <Transition>
            <FloatingPanel v-if="!erroBuscaProcesso && processo != null && estados != null">
                <template v-slot:FloatingPanelContent>
                    <div class="alerta alerta--sucesso"
                        v-if="!erroAtualizacao && !erroSubmissao && this.$route.query.sucessoAtualizacao && rotaAnterior == null">
                        <i class="alerta__icone bi bi-check-circle-fill"></i>
                        <p class="alerta__message">Processo salvo com sucesso</p>
                    </div>
                    <div class="alerta alerta--sucesso"
                        v-if="!erroAtualizacao && this.$route.query.sucessoSubmissao && rotaAnterior == null">
                        <i class="alerta__icone bi bi-check-circle-fill"></i>
                        <p class="alerta__message">Processo finalizado com sucesso</p>
                    </div>
                    <div class="alerta alerta--error" v-if="erroSubmissao">
                        <i class="alerta__icone bi bi-x-circle-fill"></i>
                        <p class="alerta__message">Não foi possível enviar esse processo em definitivo</p>
                    </div>
                    <ul class="tabs">
                        <li class="tabs__item">
                            <button class="tabs__button" :class="tab == 'DADOS-GERAIS' ? 'active' : ''"
                                @click="selecionarTab('DADOS-GERAIS')">Dados gerais</button>
                        </li>
                        <li class="tabs__item">
                            <button class="tabs__button" :class="tab == 'SOCIOS' ? 'active' : ''"
                                @click="selecionarTab('SOCIOS')">Socios</button>
                        </li>
                        <li class="tabs__item">
                            <button class="tabs__button" :class="tab == 'DADOS-COMPLEMENTARES' ? 'active' : ''"
                                @click="selecionarTab('DADOS-COMPLEMENTARES')">Complemento</button>
                        </li>
                        <li class="tabs__item">
                            <button class="tabs__button" :class="tab == 'DOCUMENTOS' ? 'active' : ''"
                                @click="selecionarTab('DOCUMENTOS')">Documentos</button>
                        </li>
                    </ul>
                    <form action="#" method="post">
                        <div class="tabs__content" v-if="tab == 'DADOS-GERAIS'">
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="processo.cnpj" class="form-input-label">CNPJ</label>
                                    <input type="text" name="processo.cnpj" id="processo.cnpj" class="form-input"
                                        v-model="processo.cnpj" v-maska="cnpj" data-maska="##.###.###/####-##" disabled>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="processo.nomeFantasia" class="form-input-label">Nome fantasia</label>
                                    <input type="text" name="processo.nomeFantasia" id="processo.nomeFantasia"
                                        class="form-input" v-model="processo.nomeFantasia">
                                </div>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="processo.nomeEmpresarial" class="form-input-label">Nome empresarial</label>
                                <input type="text" name="processo.nomeEmpresarial" id="processo.nomeEmpresarial"
                                    class="form-input" v-model="processo.nomeEmpresarial">
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="processo.porte" class="form-input-label">Porte</label>
                                    <select name="processo.porte" id="processo.porte" class="form-input"
                                        v-model="processo.porte">
                                        <option :value="null">Selecione uma opção de porte...</option>
                                        <option value="Microempresa">Microempresa</option>
                                        <option value="Empresa de Pequeno Porte (EPP)">Empresa de pequeno porte (EPP)
                                        </option>
                                        <option value="Empresa de Médio Porte">Empresa de médio porte</option>
                                        <option value="Empresa de Grande Porte">Empresa de grande porte</option>
                                        <option value="Demais">Demais</option>
                                    </select>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="processo.dataAbertura" class="form-input-label"> Data de abertura</label>
                                    <input type="date" name="processo.dataAbertura" id="processo.dataAbertura"
                                        class="form-input" v-model="processo.dataAbertura">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="endereco.endereco" class="form-input-label"> Endereço</label>
                                    <input type="text" name="endereco.endereco" id="endereco.endereco" class="form-input"
                                        v-model="endereco.endereco">
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="endereco.numero" class="form-input-label"> Número</label>
                                    <input type="text" name="endereco.numero" id="endereco.numero" class="form-input"
                                        v-model="endereco.numero">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="endereco.bairro" class="form-input-label">Bairro</label>
                                    <input type="text" name="endereco.bairro" id="endereco.bairro" class="form-input"
                                        v-model="endereco.bairro">
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="endereco.complemento" class="form-input-label"> Complemento</label>
                                    <input type="text" name="endereco.complemento" id="endereco.complemento"
                                        class="form-input" v-model="endereco.complemento">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="endereco.cidade" class="form-input-label">Cidade</label>
                                    <select name="endereco.cidade" id="endereco.cidade" class="form-input"
                                        v-model="endereco.cidade" :disabled="cidades == null">
                                        <option :value="null">
                                            {{ cidades != null ? 'Selecione uma cidade...' : 'Selecione um estado...' }}
                                        </option>
                                        <option :value="cidade.nome" v-for="cidade in cidades">{{ cidade.nome }}</option>
                                    </select>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="endereco.estado" class="form-input-label">Estado</label>
                                    <select name="endereco.estado" id="endereco.estado" class="form-input"
                                        v-model="endereco.estado" @change="buscarCidades($event)">
                                        <option :value="null">Selecione um estado...</option>
                                        <option :value="estado.sigla" v-for="estado in estados">{{ estado.nome }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="processo.email" class="form-input-label">Email</label>
                                    <input type="email" name="processo.email" id="processo.email" class="form-input"
                                        v-model="processo.email">
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="processo.telefone" class="form-input-label"> Telefone</label>
                                    <input type="text" name="processo.telefone" id="processo.telefone" class="form-input"
                                        v-model="processo.telefone" v-maska="telefone"
                                        data-maska="['(##) ####-####', '(##) #####-####']">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="processo.responsavel.nome" class="form-input-label">Representante</label>
                                    <input type="text" name="processo.responsavel.nome" id="processo.responsavel.nome"
                                        class="form-input" v-model="processo.responsavel.nome" disabled>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="processo.responsavel.email" class="form-input-label">Email
                                        (Representante)</label>
                                    <input type="email" name="processo.responsavel.email" id="processo.responsavel.email"
                                        class="form-input" v-model="processo.responsavel.email" disabled>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="processo.responsavel.cpf" class="form-input-label">CPF
                                        (Representante)</label>
                                    <input type="text" name="processo.responsavel.cpf" id="processo.responsavel.cpf"
                                        class="form-input" v-model="processo.responsavel.cpf" data-maska="###.###.###-##"
                                        v-maska="representante.cpf" disabled>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="representante.telefone" class="form-input-label">Telefone
                                        (Representante)</label>
                                    <input type="text" name="processo.responsavel.telefone"
                                        id="processo.responsavel.telefone" class="form-input"
                                        v-model="processo.responsavel.telefone" v-maska="representante.telefone"
                                        data-maska="['(##) ####-####', '(##) #####-####']" disabled>
                                </div>
                            </div>
                        </div>
                        <div class="tabs__content" v-if="tab == 'SOCIOS'">
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="socio.cpf" class="form-input-label">CPF</label>
                                    <input type="text" name="socio.cpf" id="socio.cpf" class="form-input" v-maska="cpf"
                                        data-maska="###.###.###-##" v-model="socio.cpf">
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="socio.nome" class="form-input-label">Nome</label>
                                    <input type="text" name="socio.nome" id="socio.nome" class="form-input"
                                        v-model="socio.nome">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="representante.telefone" class="form-input-label">Qualificação</label>
                                    <select name="" id="" class="form-input" v-model="socio.qualificacao">
                                        <option :value="null">Selecione uma qualificação para o sócio...</option>
                                        <option value="Teste">Teste</option>
                                    </select>
                                </div>
                                <div class="form-input-wrapper">
                                    <button type="button" class="primary-button"
                                        @click.prevent="incluirSocio()">Incluir</button>
                                </div>
                            </div>
                            <table class="table table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col">CPF</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Qualificação</th>
                                        <th scope="col">Remover</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(socio, index) in processo.socios">
                                        <td>{{ utils.cpfMask(socio.cpf) }}</td>
                                        <td>{{ socio.nome }}</td>
                                        <td>{{ socio.qualificacao }}</td>
                                        <td>
                                            <button type="button" class="acao" @click.prevent="removerSocio(index)">
                                                <i class="bi bi-x-circle-fill acao__icone acao--excluir"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <p class="socios--vazio" v-if="processo.socios.length == 0">
                                Não há sócios cadastrados</p>
                        </div>
                        <div class="tabs__content dados-complementares" v-if="tab == 'DADOS-COMPLEMENTARES'">
                            <div class="form-input-wrapper" v-for="(dado, index) in processo.dadosSolicitados">
                                <label :for="`processo.dado.${dado.id}`" class="form-input-label">
                                    {{ dado.dado.nome }}
                                </label>
                                <input type="text" :name="`processo.dado.${dado.id}`" :id="`processo.dado.${dado.id}`"
                                    class="form-input" v-model="dado.valor" v-if="dado.dado.tipo == 'TEXT'">
                                <input type="date" :name="`processo.dado.${dado.id}`" :id="`processo.dado.${dado.id}`"
                                    class="form-input" v-model="dado.valor" v-else-if="dado.dado.tipo == 'DATE'">
                                <input type="number" :name="`processo.dado.${dado.id}`" :id="`processo.dado.${dado.id}`"
                                    class="form-input" v-model="dado.valor" v-else-if="dado.dado.tipo == 'NUMBER'">
                            </div>
                        </div>
                    </form>

                    <button class="secondary-button voltar" @click.prevent="this.$router.push({ name: 'OrganizacaoHome' })"
                        v-if="tab == 'DADOS-GERAIS'">
                        Voltar
                    </button>
                    <button class="secondary-button" @click.prevent="salvarProcesso()"
                        v-if="(tab == 'DADOS-GERAIS' || tab == 'SOCIOS' || tab == 'DADOS-COMPLEMENTARES') && (processo.status == 'ABERTO' || processo.status == 'PENDENTE')">
                        <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                        <span v-show="!carregandoRequisicao">Salvar</span>
                    </button>
                    <button class="primary-button" @click.prevent="finalizarProcesso()"
                        v-if="(tab == 'DADOS-GERAIS' || tab == 'SOCIOS' || tab == 'DADOS-COMPLEMENTARES') && (processo.status == 'ABERTO' || processo.status == 'PENDENTE')">
                        <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                        <span v-show="!carregandoRequisicao">Finalizar</span>
                    </button>
                    <div class="tabs__content" v-if="tab == 'DOCUMENTOS'">
                        <SingleFileUploader v-for="(documento, index) in processo.documentosSolicitados"
                            :arquivoSolicitado="documento.documento.nome" icone="file-plus"
                            :pasta="processo.id + '_' + processo.cnpj" :organizacao="true"
                            v-model:arquivo="processo.documentosSolicitados[index]"
                            @excluirArquivo="excluirArquivo($event, index)"
                            @uploadArquivo="uploadArquivo($event, documento.id, index)" :download="false" :pdsign="pdsign != null ? matchProcessoPDSign(documento.pdsignProcessoId) : null">
                        </SingleFileUploader>
                    </div>
                </template>
            </FloatingPanel>
        </Transition>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/organizacao/preencher-processo-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import axios from 'axios';
import utils from "@/helpers/maska";
import SingleFileUploader from '@/components/SingleFileUploader.vue';

export default {
    name: 'PreencherProcessoView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
        SingleFileUploader,
    },
    created() {
        this.buscarProcesso(this.$route.params.id);
        this.buscarProcessoPDSign(this.$route.params.id);
    },
    data() {
        return {
            tab: "DADOS-GERAIS",
            processo: null,
            pdsign: null,
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
            status: null,
            endereco: {
                endereco: null,
                numero: null,
                bairro: null,
                complemento: null,
                cidade: null,
                estado: null,
            },
            representante: {
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
            cidades: null,
            estados: null,
            socio: {
                nome: null,
                cpf: null,
                qualificacao: null,
            },
            cpf: {
                masked: null,
                unmasked: null,
                completed: false,
            },
            carregandoRequisicao: false,
            erroBuscaProcesso: false,
            erroAtualizacao: false,
            erroSubmissao: false,
            utils: utils,
            rotaAnterior: null,
        }
    },
    beforeRouteEnter(to, from, next) {
        next(route => {
            route.rotaAnterior = from;
        })
    },
    methods: {
        selecionarTab: function (tab) {
            this.tab = tab;
        },
        buscarProcessoPDSign: function (id) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/compliance/processos/" + id + "/pdsign")
                .then((response) => {
                    this.pdsign = response.data;
                })
                .catch(() => {
                    
                });
        },
        buscarProcesso: async function (id) {
            await this.buscarEstados();

            axios.get(process.env.VUE_APP_API_BASE_URL + "/compliance/processos/" + id)
                .then((response) => {
                    var processo = response.data;

                    if (processo.endereco != null) {
                        this.endereco = processo.endereco;

                        if (this.endereco.estado != null) {
                            this.buscarCidades(this.endereco.estado);
                        }
                    }

                    this.processo = processo;
                })
                .catch(() => {
                    this.erroBuscaProcesso = true;
                });
        },
        buscarEstados: async function () {
            await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
                .then((response) => {
                    this.estados = response.data;
                })
                .catch(() => {

                });
        },
        buscarCidades: function (event) {
            if (event.target != null) {
                this.endereco.cidade = null;
            }

            var id = this.matchEstadoId(event.target != null ? event.target.value : event);

            axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + id + "/municipios?orderBy=nome")
                .then((response) => {
                    this.cidades = response.data;
                })
                .catch(() => {

                });
        },
        matchEstado: function (id) {
            for (let index = 0; index < this.estados.length; index++) {
                const estado = this.estados[index];

                if (estado.id == id) {
                    return estado.sigla;
                }
            }
        },
        matchEstadoId: function (sigla) {
            for (let index = 0; index < this.estados.length; index++) {
                const estado = this.estados[index];

                if (estado.sigla == sigla) {
                    return estado.id;
                }
            }
        },
        matchProcessoPDSign: function(id) {
            for (let index = 0; index < this.pdsign.length; index++) {
                const processo = this.pdsign[index];

                if (processo.id == id) {
                    return processo;
                }
            }
        },
        incluirSocio: function () {
            if (this.socio.nome != null && this.socio.cpf != null && this.socio.qualificacao != null && this.socio.nome != "" && this.socio.cpf != "" && this.socio.qualificacao != "") {
                var socio = {
                    nome: this.socio.nome,
                    cpf: this.cpf.unmasked,
                    qualificacao: this.socio.qualificacao,
                };

                this.processo.socios.push(socio);

                this.socio.nome = null;
                this.socio.cpf = null;
                this.socio.qualificacao = null;
            }
        },
        removerSocio: function (index) {
            this.processo.socios.splice(index, 1);
        },
        uploadArquivo: function (e, id, index) {
            var body = new FormData();
            body.append('documento', e);

            axios.post(process.env.VUE_APP_API_BASE_URL + "/compliance/documentos-solicitados/" + id + "/aws", body, { "Content-Type": "multipart/form-data" })
                .then((response) => {
                    this.processo.documentosSolicitados[index] = response.data;
                })
                .catch(() => {

                });
        },
        excluirArquivo: function (event, index) {
            axios.delete(process.env.VUE_APP_API_BASE_URL + "/compliance/documentos-solicitados/" + event + "/aws")
                .then((response) => {
                    this.processo.documentosSolicitados[index] = response.data;
                })
                .catch(() => {

                });
        },
        salvarProcesso: function () {
            axios.put(process.env.VUE_APP_API_BASE_URL + "/compliance/processos/" + this.processo.id + "/atualizar", this.processo)
                .then(() => {
                    this.$router.push({ name: 'PreencherProcesso', params: { id: this.processo.id }, query: { sucessoAtualizacao: true, timestamp: Date.now() } });
                })
                .catch(() => {

                });
        },
        finalizarProcesso: function () {
            this.processo.telefone = this.telefone.unmasked;
            this.processo.responsavel.telefone = this.representante.telefone.unmasked;

            axios.put(process.env.VUE_APP_API_BASE_URL + "/compliance/processos/" + this.processo.id + "/finalizar", this.processo)
                .then(() => {
                    this.$router.push({ name: 'PreencherProcesso', params: { id: this.processo.id }, query: { sucessoSubmissao: true, timestamp: Date.now() } });
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
                            var campo = document.getElementById("processo." + fieldError.field);

                            if (campo != null) {
                                var span = document.createElement("span");
                                span.classList.add("field-error__message");
                                span.innerText = fieldError.message;

                                campo.after(span);
                                campo.classList.add("field-error");
                            }
                        });
                    }

                    this.erroSubmissao = true;
                    window.scrollTo(0, 0);
                });
        },
    }
}
</script>