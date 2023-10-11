<template>
    <main class="navbar__ong">
        <button class="botao__mudar-tab"  :class="classeDadosGerais" @click="selecionaTab('DadosGerais')">Dados Gerais</button>
        <button  class="botao__mudar-tab" :class="classeDadosComplementares" @click="selecionaTab('DadosComplementares')">Dados Complementares</button>
        <button class="botao__mudar-tab" :class="classeDocumentos" @click="selecionaTab('Documentos')">Documentos</button>
    </main>

    <!-- Tab1 -->
    <main v-if="main__exibir == 'DadosGerais'">
        <DadosGerais></DadosGerais>
    </main>

    <!-- Tab2 -->
    <main v-else-if="main__exibir == 'DadosComplementares'">
        <DadosComplementares></DadosComplementares>
    </main>

    <!-- Tab3 -->
    <main v-show="main__exibir == 'Documentos'">
        <DocumentosCompliance></DocumentosCompliance>
    </main>

</template>

<script>
import DadosGerais from './DadosGerais.vue';
import DocumentosCompliance from './DocumentosCompliance.vue';
import DadosComplementares from './DadosComplementares.vue';

export default {
    name: 'FormOngs',
    components: {
        DadosGerais,
        DadosComplementares,
        DocumentosCompliance
    },
    data() {
    return {
        main__exibir: 'DadosGerais', // Tab inicial
        classeDadosGerais: 'botao__mudar-tab--Selecionado',
        classeDadosComplementares: 'botao__mudar-tab',
        classeDocumentos: 'botao__mudar-tab',
        };
    },
    methods: {
        selecionaTab: function(selecaoTab){
            this.main__exibir = selecaoTab;
            console.log(selecaoTab);

            if(selecaoTab == 'DadosGerais') {
                this.classeDadosGerais = 'botao__mudar-tab--Selecionado';
                this.classeDadosComplementares = 'botao__mudar-tab';
                this.classeDocumentos = 'botao__mudar-tab';
            }

            else if(selecaoTab == 'DadosComplementares') {
                this.classeDadosGerais = 'botao__mudar-tab';
                this.classeDadosComplementares = 'botao__mudar-tab--Selecionado';
                this.classeDocumentos = 'botao__mudar-tab';
            }

            else if(selecaoTab == 'Documentos') {
                this.classeDadosGerais = 'botao__mudar-tab';
                this.classeDadosComplementares = 'botao__mudar-tab';
                this.classeDocumentos = 'botao__mudar-tab--Selecionado';
            }
        }
    }
}
</script>

<style>
@import '../../assets/styles/org-cadastro.css'
</style>