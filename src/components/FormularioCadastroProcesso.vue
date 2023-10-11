<template>
    <section class="navbar__acompanhamentoProcesso">
            <button  :class="classeDadosGerais" @click="selecionaNavbarProcesso('DadosGerais')">Dados Gerais</button>
            <button  :class="classeDadosComplementares" @click="selecionaNavbarProcesso('DadosComplementares')">Dados Complementares</button>
            <button :class="classeDocumentos" @click="selecionaNavbarProcesso('Documentos')">Documentos</button>
        </section>
    <main v-if = "exibirMainProcesso == 'DadosGerais'">
        <label :class="labelEstadoProcesso"><p>{{ this.estadoAtualProcesso }}</p></label>
        <section class="corpo__acompanhamentoAtributos">

            <div class="bloco__atributo">
                <label class="label__atributo">CNPJ</label>
                <label class="label__atributo--preenchido" id="label__atributo--cnpj">CNPJ</label>
            </div>

            <div class="bloco__atributo">
                <label class="label__atributo">Nome Empresa</label>
                <label class="label__atributo--preenchido" id="label__atributo--nomeEmpresa">B3</label>
            </div>

            <div class="bloco__atributo">
                <label class="label__atributo">Nome Fantasia</label>
                <label class="label__atributo--preenchido" id="label__atributo--nomeFantasia">B3 Social</label>
            </div>

            <div class="bloco__atributo">
                <label class="label__atributo">Porte</label>
                <label class="label__atributo--preenchido" id="label__atributo--porte">Não Preenchido</label>
            </div>


            <div class="bloco__atributo">
                <label class="label__atributo">Email</label>
                <label class="label__atributo--preenchido" id="label__atributo--email">Não Preenchido</label>
            </div>

            <div class="bloco__atributo">
                <label class="label__atributo">Telefone</label>
                <label class="label__atributo--preenchido" id="label__atributo--telefone">Não Preenchido</label>
            </div>


            <div class="bloco__atributo">
                <label class="label__atributo">Endereço</label>
                <label class="label__atributo--preenchido" id="label__atributo--endereço">Não Preenchido</label>
            </div>

            <div class="bloco__atributo">
                <label class="label__atributo">Número</label>
                <label class="label__atributo--preenchido" id="label__atributo--numero">13</label>
            </div>

            <div class="bloco__atributo">
                <label class="label__atributo">Bairro</label>
                <label class="label__atributo--preenchido" id="label__atributo--bairro">CNPJ</label>
            </div>

            <div class="bloco__atributo">
                <label class="label__atributo">Complmento</label>
                <label class="label__atributo--preenchido" id="label__atributo--complmento">À Esquerda</label>
            </div>

            <div class="bloco__atributo">
                <label class="label__atributo">Recife</label>
                <label class="label__atributo--preenchido" id="label__atributo--cidade">CNPJ</label>
            </div>

            <div class="bloco__atributo">
                <label class="label__atributo">Estado</label>
                <label class="label__atributo--preenchido" id="label__atributo--estado">Pernambuco</label>
            </div>
            
            <div v-if="estadoAtualProcesso == 'Processo em fase de preenchimento'" class="estadoAtualProcesso">
                <label for="selecao">Atualize o status desse processo:</label>
                <select v-model="opcaoSelecionada" id="selecao">
                    <option class="selecaoEstadoAtual__option" value="opcao1">Opção 1</option>
                    <option class="selecaoEstadoAtual__option" value="opcao2">Opção 2</option>
                    <option class="selecaoEstadoAtual__option" value="opcao3">Opção 3</option>
                </select>
                <PrimaryButton acao="Atualizar"></PrimaryButton>
            </div>

        </section>    
    
    </main>

    <main v-else-if = "exibirMainProcesso == 'DadosComplementares'">
        <label :class="labelEstadoProcesso"><p>{{ this.estadoAtualProcesso }}</p></label>
        
        <section class="corpo__acompanhamentoAtributos">
            <div class="bloco__atributo--complementar">
                <label>
                    <p class="label__atributo">Capital social</p>
                    <p class="label__atributo--preenchido" id="label__atributo--estado">R$1.000,00</p>
                </label>
                <i v-show="dadosComplementarPreenchido" class="bi bi-x-circle-fill"></i>
                <i v-show="!dadosComplementarPreenchido" class="bi bi-patch-check-fill"></i>
            </div>

            <div class="bloco__atributo--complementar">
                <label>
                    <p class="label__atributo">Quantidade de sócios</p>
                    <p class="label__atributo--preenchido" id="label__atributo--estado">Não preenchido</p>
                </label>
                <i v-show="!dadosComplementarPreenchido" class="bi bi-x-circle-fill"></i>
                <i v-show="dadosComplementarPreenchido" class="bi bi-patch-check-fill"></i>
             </div>

        <div class="bloco__atributo--complementar">
            <label>
                <p class="label__atributo">Quantidade de funcionários</p>
                <p class="label__atributo--preenchido" id="label__atributo--estado">Não preenchido</p>
            </label>
            <i v-show="!dadosComplementarPreenchido" class="bi bi-x-circle-fill"></i>
            <i v-show="dadosComplementarPreenchido" class="bi bi-patch-check-fill"></i>
        </div>
        <PrimaryButton acao="Solicitar dado adicional"></PrimaryButton>
        </section>
        
    </main>

    <main v-show="exibirMainProcesso == 'Documentos'">
        <DropFileExibicao documentoUpado="Contrato Social" ></DropFileExibicao >
        <DropFileExibicao  documentoUpado="Cartão CNPJ" ></DropFileExibicao >
        <DropFileExibicao  documentoUpado="Extrato Bancário"></DropFileExibicao >
        <PrimaryButton acao="Solicitar documento adicional"></PrimaryButton>
    </main>

</template>

<script>
import Field from './Field.vue';
import PrimaryButton from './PrimaryButton.vue';
import DropFileExibicao from './DropFileExibicao.vue';

export default {
    name: 'FormularioCadastroProcessos',
    components: {
        Field,
        PrimaryButton,
        DropFileExibicao,
    },

    data () {
        return {
            exibirMainProcesso: 'DadosGerais',
            classeDadosGerais: 'botoesNavBar__acompanhamentoProcesso--DepoisClick',
            classeDadosComplementares: 'botoesNavBar__acompanhamentoProcesso',
            classeDocumentos: 'botoesNavBar__acompanhamentoProcesso',
            labelEstadoProcesso: 'label__estadoProcesso',
            estadoAtualProcesso: 'Processo em fase de preenchimento'
        };
    },
    methods: {

        selecionaNavbarProcesso: function(selecaoNavbar) {
            this.exibirMainProcesso = selecaoNavbar;
            
            console.log(selecaoNavbar);
            if(selecaoNavbar == 'DadosGerais') {
              
                this.classeDadosGerais = 'botoesNavBar__acompanhamentoProcesso--DepoisClick';
                
                this.classeDadosComplementares = 'botoesNavBar__acompanhamentoProcesso';
                
                this.classeDocumentos = 'botoesNavBar__acompanhamentoProcesso';
               

            }
            else if(selecaoNavbar == 'DadosComplementares') {

                this.classeDadosGerais = 'botoesNavBar__acompanhamentoProcesso';
                
                this.classeDadosComplementares = 'botoesNavBar__acompanhamentoProcesso--DepoisClick';
                
                this.classeDocumentos = 'botoesNavBar__acompanhamentoProcesso';
                

            }

            else if(selecaoNavbar == 'Documentos') {

                this.classeDadosGerais = 'botoesNavBar__acompanhamentoProcesso';
                
                this.classeDadosComplementares = 'botoesNavBar__acompanhamentoProcesso';
                
                this.classeDocumentos = 'botoesNavBar__acompanhamentoProcesso--DepoisClick';
            }
        }

    }
}
</script>

<style>
.form-cadastro-organizacao .form-cadastro-organizacao__fieldset {
    padding: 1rem 2rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    margin-bottom: 1.75rem;
}

.form-cadastro-organizacao .form-cadastro-organizacao__fieldset-legend {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 1rem;
}
</style>