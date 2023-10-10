<template> 
    <NavbarGerencia></NavbarGerencia>
    <main id="compliance">
        <Header titulo="Cadastro" icone="bi bi-file-earmark-fill"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <FormGerenciarOrganizacoes></FormGerenciarOrganizacoes>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>

<script>
import NavbarGerencia from '@/components/NavBarGerencia.vue';
import Header from '@/components/Header.vue';
import FloatingPanel from '@/components/FloatingPanel.vue';
import Footer from '@/components/Footer.vue';
import FormGerenciarOrganizacoes from '@/components/compliance/FormGerenciarOrganizacoes.vue';

export default {
    name: 'GerenciarCadastro',
    components: {
        NavbarGerencia,
        Header,
        FloatingPanel,
        Footer,
        FormGerenciarOrganizacoes
    }
}
</script>

<style>
@import "../../assets/styles/gerenciar-cadastro.css"
</style>