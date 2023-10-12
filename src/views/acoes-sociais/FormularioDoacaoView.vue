<template>
    <Navbar></Navbar>
    <main id="doacao">
        <form action="#" method="post" class="formualario-pagamento">
            <fieldset class="formulario-pagamento__opcoes">
                <legend>Escolha sua doação</legend>
                <label for="checkbox" class="checkbox">
                    <input type="checkbox" name="checkbox" id="checkbox">
                    <div class="checkbox__info">
                        <span class="checkbox__valor">R$ 10,00</span>
                        <small class="checkbox__descricao">Valor equivalente a uma cesta básica</small>
                    </div>
                </label>
                <label for="checkbox" class="checkbox">
                    <input type="checkbox" name="checkbox" id="checkbox">
                    <div class="checkbox__info">
                        <span class="checkbox__valor">R$ 10,00</span>
                        <small class="checkbox__descricao">Valor equivalente a uma cesta básica</small>
                    </div>
                </label>
                <label for="checkbox" class="checkbox">
                    <input type="checkbox" name="checkbox" id="checkbox">
                    <div class="checkbox__info">
                        <span class="checkbox__valor">R$ 10,00</span>
                        <small class="checkbox__descricao">Valor equivalente a uma cesta básica</small>
                    </div>
                </label>
                <label for="checkbox" class="checkbox">
                    <input type="checkbox" name="checkbox" id="checkbox">
                    <div class="checkbox__info">
                        <span class="checkbox__valor">R$ 10,00</span>
                        <small class="checkbox__descricao">Valor equivalente a uma cesta básica</small>
                    </div>
                </label>
                <hr>
                <p><em>Você está doando para a campanha de <strong>Arrecadação de cestas básicas</strong></em></p>
                <div class="formulario-pagamento__resumo">
                    <p class="formulario-pagamento__texto-valor">Valor da doação</p>
                    <p class="formulario-pagamento__valor-final">R$ 10,00</p>
                </div>
            </fieldset>
            <fieldset class="formulario-pagamento__dados-bancarios">
                <ul class="opcoes-pagamento">
                    <li class="opcoes-pagamento__item">
                        <button type="button" :class="metodoDoacao == 'PIX' ? 'active' : ''"
                            @click="selecionarMetodoPagamento('PIX')">PIX</button>
                    </li>
                    <li class="opcoes-pagamento__item">
                        <button type="button" :class="metodoDoacao == 'BOLETO' ? 'active' : ''"
                            @click="selecionarMetodoPagamento('BOLETO')">Boleto</button>
                    </li>
                    <li class="opcoes-pagamento__item">
                        <button type="button" :class="metodoDoacao == 'CARTAO_CREDITO' ? 'active' : ''"
                            @click="selecionarMetodoPagamento('CARTAO_CREDITO')">Crédito</button>
                    </li>
                </ul>

                <div class="dados-pagamento" v-show="!pagamentoFinalizado">
                    <div class="form-input">
                        <label for="name" class="form-input__label">Nome</label>
                        <input type="type" :value="nome" id="name" class="form-input__item">
                    </div>
                    <div class="form-input">
                        <label for="name" class="form-input__label">CPF</label>
                        <input type="type" :value="cpf" id="name" class="form-input__item">
                    </div>
                    <Field label="CPF do doador" name="cpf" type="text" v-model="cpf"></Field>
                    <div class="form-row">
                        <div class="form-input">
                            <label for="name" class="form-input__label">Email</label>
                            <input type="type" :name="name" id="name" class="form-input__item">
                        </div>
                        <div class="form-input">
                            <label for="name" class="form-input__label">Telefone</label>
                            <input type="type" :name="name" id="name" class="form-input__item">
                        </div>
                    </div>
                    <div class="cartao-info" v-if="metodoDoacao == 'CARTAO_CREDITO'">
                        <div class="form-input">
                            <label for="name" class="form-input__label">Número do cartão</label>
                            <input type="type" :name="name" id="name" class="form-input__item">
                        </div>
                        <div class="formulario-pagamento__form-row">
                            <div class="form-row">
                                <div class="form-input">
                                    <label for="name" class="form-input__label">Validade</label>
                                    <input type="type" :name="name" id="name" class="form-input__item">
                                </div>
                                <div class="form-input">
                                    <label for="name" class="form-input__label">CVV</label>
                                    <input type="type" :name="name" id="name" class="form-input__item">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="cartao-info" v-if="metodoDoacao == 'BOLETO'">
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Endereço</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                            <div class="form-input">
                                <label for="name" class="form-input__label">Número</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Bairro</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                            <div class="form-input">
                                <label for="name" class="form-input__label">CEP</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-input">
                                <label for="name" class="form-input__label">Cidade</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                            <div class="form-input">
                                <label for="name" class="form-input__label">Estado</label>
                                <input type="type" :name="name" id="name" class="form-input__item">
                            </div>
                        </div>
                    </div>

                    <p class="text-center">
                        <i class="bi bi-shield-lock-fill"></i>
                        Seus dados pessoais estão protegidos
                    </p>

                    <button class="primary-button">Doar</button>
                </div>
                <div class="codigo-pix" v-show="pixDisponivel">
                    <p class="codigo-pix__mensagem">Pagamento finalizado com sucesso!</p>
                    <small class="codigo-pix__small">Este QRCode tem válidade de 24h</small>
                    <img :src="pixUrl" alt="" class="pix__qrcode">
                </div>
            </fieldset>
        </form>
    </main>
    <FooterItem></FooterItem>
</template>

<script>
import '../../assets/styles/formulario-doacao.css';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import axios from 'axios';

export default {
    name: 'FormularioDoacaoView',
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
            nome: null,
            email: null,
            telefone: null,
            cpf: null,
            metodoDoacao: 'PIX',
            tokenCartao: null,
            valorDoacao: 10.00,

            endereco: null,
            numero: null,
            bairro: null,
            cep: null,
            cidade: null,
            estado: null,

            numeroCartao: null,
            validadeCartao: null,
            cvvCartao: null,

            acaoId: 1,
            userId: 1,

            pagamentoFinalizado: false,
            pixDisponivel: false,
            pixUrl: ''
        }
    },
    methods: {
        selecionarMetodoPagamento: function (metodo) {
            this.metodoDoacao = metodo;
        },
        doar: function () {
            if (this.metodoDoacao == "CARTAO_CREDITO") {
                const card = PagSeguro.encryptCard({
                    publicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr+ZqgD892U9/HXsa7XqBZUayPquAfh9xx4iwUbTSUAvTlmiXFQNTp0Bvt/5vK2FhMj39qSv1zi2OuBjvW38q1E374nzx6NNBL5JosV0+SDINTlCG0cmigHuBOyWzYmjgca+mtQu4WczCaApNaSuVqgb8u7Bd9GCOL4YJotvV5+81frlSwQXralhwRzGhj/A57CGPgGKiuPT+AOGmykIGEZsSD9RKkyoKIoc0OS8CPIzdBOtTQCIwrLn2FxI83Clcg55W8gkFSOS6rWNbG5qFZWMll6yl02HtunalHmUlRUL66YeGXdMDC2PuRcmZbGO5a/2tbVppW6mfSWG3NPRpgwIDAQAB",
                    holder: this.nome,
                    number: this.numeroCartao,
                    expMonth: this.validadeCartao.substring(0, 2),
                    expYear: this.validadeCartao.substring(2),
                    securityCode: this.cvvCartao
                });

                const encrypted = card.encryptedCard;
                this.tokenCartao = encrypted;
                console.log(encrypted);
            }

            var requestBody = {
                nome: this.nome,
                email: this.email,
                cpf: this.cpf,
                ddd: this.telefone.substring(0, 2),
                telefone: this.telefone.substring(2),
                metodoDoacao: this.metodoDoacao,
                valorDoacao: this.valorDoacao,

                endereco: {
                    endereco: this.endereco,
                    numero: this.numero,
                    bairro: this.bairro,
                    cep: this.cep,
                    cidade: this.cidade,
                    estado: this.estado
                },

                tokenCartao: this.tokenCartao,
                cvv: this.cvvCartao,

                acaoId: this.acaoId,
                usuarioId: this.usuarioId
            };

            var json = JSON.stringify(requestBody);
            console.log(json);

            axios.post("http://localhost:80/doacoes", json, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    this.pixUrl = response.data.link;

                    setTimeout(() => {
                        this.pagamentoFinalizado = true;
                        this.pixDisponivel = true;
                    }, 2000);

                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
}
</script>