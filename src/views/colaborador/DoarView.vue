<template>
    <Navbar></Navbar>
    <main id="doar-view" v-if="acao != null && this.acao.campanha">
        <form action="#" method="post" class="formulario-pagamento">
            <fieldset class="formulario-pagamento__opcoes">
                <legend>Escolha sua doação</legend>
                <label :for="`opcao.${opcao.id}`" class="checkbox" v-for="opcao in acao.opcoesContribuicao">
                    <input type="checkbox" :name="`opcao.${opcao.id}`" :id="`opcao.${opcao.id}`" v-model="doacao.valor"
                        :true-value="opcao.valor" :false-value="null" :key="opcao.id" :disabled="pagamentoConcluido">
                    <div class="checkbox__info">
                        <span class="checkbox__valor">
                            {{ new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(opcao.valor) }}
                        </span>
                        <small class="checkbox__descricao" v-if="opcao.descricao != null && opcao.descricao != ''">{{
                            opcao.descricao }}</small>
                    </div>
                </label>

                <input type="hidden" id="doacao.doador.valorDoacao">

                <hr>

                <p><em>Você está doando para a campanha: <strong>{{ acao.nomeAcao }}</strong></em></p>
                <div class="formulario-pagamento__resumo">
                    <p class="formulario-pagamento__texto-valor">Valor da doação</p>
                    <p class="formulario-pagamento__valor-final">
                        {{ new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(doacao.valor) }}
                    </p>
                </div>
            </fieldset>
            <fieldset class="formulario-pagamento__dados-bancarios">
                <ul class="tabs">
                    <li class="tabs__item">
                        <button :disabled="pagamentoConcluido" class="tabs__button" :class="tab == 'PIX' ? 'active' : ''"
                            @click.prevent="selecionarTab('PIX')">PIX</button>
                    </li>
                    <li class="tabs__item">
                        <button :disabled="pagamentoConcluido" class="tabs__button" :class="tab == 'BOLETO' ? 'active' : ''"
                            @click.prevent="selecionarTab('BOLETO')">Boleto</button>
                    </li>
                    <li class="tabs__item">
                        <button :disabled="pagamentoConcluido" class="tabs__button"
                            :class="tab == 'CARTAO_CREDITO' ? 'active' : ''"
                            @click.prevent="selecionarTab('CARTAO_CREDITO')">Crédito</button>
                    </li>
                </ul>

                <div class="alerta alerta--error mb-3" v-if="falhaPagamento && !pagamentoConcluido">
                    <i class="alerta__icone bi bi-x-circle-fill"></i>
                    <p class="alerta__message">Não foi possível processar sua doação</p>
                </div>

                <div class="dados-pagamento" v-if="!pagamentoConcluido">
                    <div class="form-input-wrapper">
                        <label for="doacao.doador.nome" class="form-input-label">Nome</label>
                        <input type="text" name="doacao.doador.nome" id="doacao.doador.nome" class="form-input"
                            v-model="doacao.doador.nome">
                    </div>
                    <div class="form-input-wrapper">
                        <label for="doacao.doador.cpf" class="form-input-label">CPF</label>
                        <input type="text" name="doacao.doador.cpf" id="doacao.doador.cpf" class="form-input"
                            v-maska="doacao.doador.cpf" data-maska="###.###.###-##">
                    </div>
                    <div class="form-row">
                        <div class="form-input-wrapper">
                            <label for="doacao.doador.email" class="form-input-label">Email</label>
                            <input type="text" name="doacao.doador.email" id="doacao.doador.email" class="form-input"
                                v-model="doacao.doador.email">
                        </div>
                        <div class="form-input-wrapper">
                            <label for="doacao.doador.telefone" class="form-input-label">Telefone</label>
                            <input type="text" name="doacao.doador.telefone" id="doacao.doador.telefone" class="form-input"
                                v-maska="doacao.doador.telefone" data-maska="['(##) ####-####', '(##) #####-####']">
                        </div>
                    </div>
                    <Transition>
                        <div class="tab__content" v-if="tab == 'CARTAO_CREDITO'">
                            <div class="form-input-wrapper">
                                <label for="doacao.doador.numeroCartao" class="form-input-label">Número do cartão</label>
                                <input type="text" name="doacao.doador.numeroCartao" id="doacao.doador.numeroCartao"
                                    class="form-input" v-maska="doacao.doador.numeroCartao"
                                    data-maska="#### #### #### ####">
                            </div>
                            <div class="formulario-pagamento__form-row">
                                <div class="form-row">
                                    <div class="form-input-wrapper">
                                        <label for="doacao.doador.validadeCartao" class="form-input-label">Validade</label>
                                        <input type="text" name="doacao.doador.validadeCartao"
                                            id="doacao.doador.validadeCartao" class="form-input"
                                            v-maska="doacao.doador.validadeCartao" data-maska="##/####">
                                    </div>
                                    <div class="form-input-wrapper">
                                        <label for="doacao.doador.cvvCartao" class="form-input-label">CVV</label>
                                        <input type="text" name="doacao.doador.cvvCartao" id="doacao.doador.cvvCartao"
                                            class="form-input" v-maska="doacao.doador.cvvCartao" data-maska="###">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cartao-info" v-else-if="tab == 'BOLETO'">
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="doacao.doador.endereco" class="form-input-label">Endereço</label>
                                    <input type="text" name="doacao.doador.endereco" id="doacao.doador.endereco"
                                        class="form-input" v-model="doacao.doador.endereco">
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="doacao.doador.numero" class="form-input-label">Número</label>
                                    <input type="number" name="doacao.doador.numero" id="doacao.doador.numero"
                                        class="form-input" v-model="doacao.doador.numero">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="doacao.doador.bairro" class="form-input-label">Bairro</label>
                                    <input type="text" name="doacao.doador.bairro" id="doacao.doador.bairro"
                                        class="form-input" v-model="doacao.doador.bairro">
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="doacao.doador.cep" class="form-input-label">CEP</label>
                                    <input type="text" name="doacao.doador.cep" id="doacao.doador.cep" class="form-input"
                                        v-maska="doacao.doador.cep" data-maska="##.###-###">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-input-wrapper">
                                    <label for="doacao.doador.cidade" class="form-input-label">Cidade</label>
                                    <select name="doacao.doador.cidade" id="doacao.doador.cidade" class="form-input"
                                        v-model="doacao.doador.cidade" :disabled="cidades == null">
                                        <option :value="null">
                                            {{ cidades != null ? 'Selecione uma cidade...' : 'Selecione um estado...' }}
                                        </option>
                                        <option :value="cidade.nome" v-for="cidade in cidades">{{ cidade.nome }}</option>
                                    </select>
                                </div>
                                <div class="form-input-wrapper">
                                    <label for="doador.doacao.estado" class="form-input-label">Estado</label>
                                    <select name="doador.doacao.estado" id="doador.doacao.estado" class="form-input"
                                        v-model="doacao.doador.estado" @change="buscarCidades($event)">
                                        <option :value="null">Selecione um estado...</option>
                                        <option :value="estado.id" v-for="estado in estados">{{ estado.nome }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Transition>

                    <p class="text-center safe">
                        <i class="bi bi-shield-lock-fill"></i>
                        Seus dados pessoais estão protegidos
                    </p>

                    <button class="primary-button" @click.prevent="doar()">
                        <span v-show="carregandoRequisicao" class="spinner-border" aria-hidden="true"></span>
                        <span v-show="!carregandoRequisicao">Doar</span>
                    </button>
                </div>
                <div class="alerta alerta--sucesso" v-else>
                    <i class="alerta__icone bi bi-check-circle-fill"></i>
                    <p class="alerta__message">Pagamento concluído com sucesso</p>
                </div>
                <Transition>
                    <div v-show="!falhaPagamento && pagamentoConcluido && pagamentoViaPix" class="pix">
                        <p>
                            <i class="bi bi-x-diamond-fill"></i>
                            <span id="pix__texto">
                                Pague via PIX através do banco de sua preferência
                            </span>
                        </p>

                        <img src="" alt="" id="pix__qrcode">

                        <button class="primary-button" id="pix__copiar" @click.prevent="copiar($event)">Copiar
                            código PIX</button>

                        <p>
                            <em>Este QR Code tem validade de 24h</em>
                        </p>
                    </div>
                </Transition>
                <Transition>
                    <div v-show="!falhaPagamento && pagamentoConcluido && pagamentoViaCartao"
                        class="cartao text-center mt-2">
                        <p>
                            Você será notificado assim que o pagamento for confirmado
                        </p>
                    </div>
                </Transition>
                <Transition>
                    <div v-show="!falhaPagamento && pagamentoConcluido && pagamentoViaBoleto"
                        class="boleto text-center mt-2">
                        <p>Você será notificado assim que o pagamento for confirmado</p>
                        <a href="#" target="__blank" id="boleto__link">Acesse aqui seu boleto</a>
                    </div>
                </Transition>

            </fieldset>
        </form>
    </main>
    <FooterItem></FooterItem>
</template>

<script>
import '../../assets/styles/colaborador/doar-view.scss';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import axios from 'axios';

export default {
    name: 'DoarView',
    components: {
        Navbar,
        FooterItem,
    },
    mounted() {
        const pagseguroScript = document.createElement("script");

        pagseguroScript.setAttribute(
            "src",
            "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js"
        );

        document.body.appendChild(pagseguroScript);
    },
    data() {
        return {
            tab: 'PIX',
            acao: null,
            estados: null,
            cidades: null,
            valorPersonalizado: null,
            opcaoPersonalizada: false,
            doacao: {
                valor: null,
                doador: {
                    usuarioId: 1,
                    nome: null,
                    email: null,
                    telefone: {
                        masked: null,
                        unmasked: null,
                        completed: false,
                    },
                    cpf: {
                        masked: null,
                        unmasked: null,
                        completed: false,
                    },
                    endereco: null,
                    numero: null,
                    bairro: null,
                    cep: {
                        masked: null,
                        unmasked: null,
                        completed: false,
                    },
                    cidade: null,
                    estado: null,
                    tokenCartao: null,
                    numeroCartao: {
                        masked: null,
                        unmasked: null,
                        completed: false,
                    },
                    validadeCartao: {
                        masked: null,
                        unmasked: null,
                        completed: false,
                    },
                    cvvCartao: {
                        masked: null,
                        unmasked: null,
                        completed: false,
                    },
                },
            },
            erroBuscaAcao: false,
            carregandoRequisicao: false,
            pagamentoConcluido: false,
            falhaPagamento: false,
            pagamentoViaPix: false,
            pagamentoViaCartao: false,
            pagamentoViaBoleto: false,
        }
    },
    created() {
        this.buscarAcaoVoluntariado(this.$route.params.id);
        this.buscarEstados();
    },
    methods: {
        selecionarTab: function (metodo) {
            this.tab = metodo;
        },
        buscarAcaoVoluntariado: function (id) {
            axios.get(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/acoes-voluntariado/" + id)
                .then((response) => {
                    this.acao = response.data;
                })
                .catch(() => {
                    this.erroBuscaAcao = true;
                });
        },
        buscarEstados: function () {
            axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
                .then((response) => {
                    this.estados = response.data;
                })
                .catch(() => {

                });
        },
        buscarCidades: function (event) {
            this.doacao.doador.cidade = null;

            axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + event.target.value + "/municipios?orderBy=nome")
                .then((response) => {
                    this.cidades = response.data;
                })
                .catch((error) => {

                });
        },
        copiar: function (event) {
            navigator.clipboard.writeText(event.target.value);
        },
        matchEstado: function (id) {
            for (let index = 0; index < this.estados.length; index++) {
                const estado = this.estados[index];

                if (estado.id == id) {
                    return estado.sigla;
                }
            }
        },
        doar: function () {
            this.carregandoRequisicao = true;
            this.falhaPagamento = false;

            if (this.tab == "CARTAO_CREDITO") {
                const card = PagSeguro.encryptCard({
                    publicKey: process.env.VUE_APP_PAGSEGURO_PUBLIC_KEY,
                    holder: this.doacao.doador.nome,
                    number: this.doacao.doador.numeroCartao.unmasked,
                    expMonth: this.doacao.doador.validadeCartao.unmasked != null ? this.doacao.doador.validadeCartao.unmasked.substring(0, 2) : null,
                    expYear: this.doacao.doador.validadeCartao.unmasked != null ? this.doacao.doador.validadeCartao.unmasked.substring(2) : null,
                    securityCode: this.doacao.doador.cvvCartao.unmasked
                });

                const encrypted = card.encryptedCard;
                this.doacao.doador.tokenCartao = encrypted;
            }

            var body = {
                nome: this.doacao.doador.nome,
                email: this.doacao.doador.email,
                cpf: this.doacao.doador.cpf.unmasked,
                ddd: this.doacao.doador.telefone.unmasked != null ? this.doacao.doador.telefone.unmasked.substring(0, 2) : null,
                telefone: this.doacao.doador.telefone.unmasked != null ? this.doacao.doador.telefone.unmasked.substring(2) : null,
                metodoDoacao: this.tab,
                valorDoacao: this.doacao.valor,
                endereco: {
                    endereco: this.doacao.doador.endereco,
                    numero: this.doacao.doador.numero,
                    bairro: this.doacao.doador.bairro,
                    cep: this.doacao.doador.cep.unmasked,
                    cidade: this.doacao.doador.cidade,
                    estado: this.matchEstado(this.doacao.doador.estado),
                },
                tokenCartao: this.doacao.doador.tokenCartao,
                cvv: this.doacao.doador.cvvCartao.unmasked,
                acaoId: this.acao.id,
                usuarioId: this.usuarioId
            };

            axios.post(process.env.VUE_APP_API_BASE_URL + "/acoes-sociais/doacoes", body)
                .then((response) => {
                    var doacao = response.data;
                    this.pagamentoConcluido = true;

                    if (doacao.metodo == "PIX") {
                        document.getElementById("pix__copiar").value = doacao.qrcodeText;

                        var texto = document.getElementById("pix__texto");
                        var valor = new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(doacao.valor);
                        texto.innerText = "Pague " + valor + " via PIX através do banco de sua preferência";

                        var qrcode = document.getElementById("pix__qrcode");
                        qrcode.src = doacao.link;

                        qrcode.addEventListener("load", () => {
                            this.pagamentoViaPix = true;
                            this.carregandoRequisicao = false;
                        });
                    } else if (doacao.metodo == "CARTAO_CREDITO") {
                        this.pagamentoViaCartao = true;
                        this.carregandoRequisicao = false;
                    } else if (doacao.metodo == "BOLETO") {
                        this.pagamentoViaBoleto = true;
                        document.getElementById("boleto__link").href = doacao.link;
                        this.carregandoRequisicao = false;
                    }
                })
                .catch((error) => {
                    this.falhaPagamento = true;
                    window.scrollTo(0, 0);

                    document.querySelectorAll(".field-error__message").forEach(field => {
                        field.remove();
                    });

                    document.querySelectorAll(".field-error").forEach(field => {
                        field.classList.remove("field-error");
                    });

                    if (error.response && error.response.status != null && error.response.status == 400 && error.response.data != null) {
                        error.response.data.forEach(fieldError => {
                            var campo = document.getElementById("doacao.doador." + fieldError.field);

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
                });
        }
    }
}
</script>