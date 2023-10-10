<template>
    <section class="navbar__gerenciar-org">
        <button class="botaoGerenciar"  :class="classeDadosGerais" @click="selecionaTab('DadosGerais')">Dados Gerais</button>
        <button  class="botaoGerenciar" :class="classeDadosComplementares" @click="selecionaTab('DadosComplementares')">Dados Complementares</button>
        <button class="botaoGerenciar" :class="classeDocumentos" @click="selecionaTab('Documentos')">Documentos</button>
    </section>

    <!-- Tab1 -->
    <main v-if="exibirMainGerenciaOrg == 'DadosGerais'">
        <DadosGerais></DadosGerais>
    </main>

    <!-- Tab2 -->
    <main v-else-if="exibirMainGerenciaOrg == 'DadosComplementares'">
        Dados Complementares
    </main>

    <!-- Tab3 -->
    <main v-else-if="exibirMainGerenciaOrg == 'Documentos'">
        Documentos
    </main>

</template>

<script>
import DadosGerais from './DadosGerais.vue';

export default {
    name: 'FormGerenciarOrganizacoes',
    components: {
        DadosGerais
    },
    data() {
    return {
        exibirMainGerenciaOrg: 'DadosGerais', // Tab inicial
        classeDadosGerais: 'botaoGerenciar--Selecionado',
        classeDadosComplementares: 'botaoGerenciar',
        classeDocumentos: 'botaoGerenciar',
        };
    },
    methods: {
        selecionaTab: function(selecaoTab){
            this.exibirMainGerenciaOrg = selecaoTab;
            console.log(selecaoTab);

            if(selecaoTab == 'DadosGerais') {
                this.dadosGerais = 'botaoGerenciar--Selecionado';
                this.dadosComplementares = 'botaoGerenciar';
                this.documentos = 'botaoGerenciar';
            }

            else if(selecaoTab == 'DadosComplementares') {
                this.dadosGerais = 'botaoGerenciar';
                this.dadosComplementares = 'botaoGerenciar--Selecionado';
                this.documentos = 'botaoGerenciar';
            }

            else if(selecaoTab == 'Documentos') {
                this.dadosGerais = 'botaoGerenciar';
                this.dadosComplementares = 'botaoGerenciar';
                this.documentos = 'botaoGerenciar--Selecionado';
            }
        }
    }
}
</script>

<style>
@import '../../assets/styles/gerenciar-cadastro.css'
</style>