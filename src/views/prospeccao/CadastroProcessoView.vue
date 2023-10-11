<template>
    <Navbar></Navbar>
    <main id="prospeccao">
        <Header titulo="Processo" icone="bi bi-file-earmark-fill" subtitulo="B3 Social"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <FormularioCadastroProcesso></FormularioCadastroProcesso>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/cadastro-organizacao.css';
import '../../assets/styles/dropfile.css';
import '../../assets/styles/dropfile-exibicao.css';
import '../../assets/styles/cadastro-processo.css';
import Navbar from '../../components/Navbar.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import FormularioCadastroProcesso from '../../components/FormularioCadastroProcesso.vue';

export default {
    name: 'CadastroProcessoView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
        FormularioCadastroProcesso
    }
}
</script>

