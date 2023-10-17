<template> 
    <NavBarCompliance></NavBarCompliance>
    <main id="compliance">
        <Header titulo="Cadastro" icone="bi bi-file-earmark-fill"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <FormOngs></FormOngs>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>

<script>
import NavBarCompliance from '@/components/compliance/NavBarCompliance.vue';
import Header from '@/components/Header.vue';
import FloatingPanel from '@/components/FloatingPanel.vue';
import Footer from '@/components/Footer.vue';
import FormOngs from '@/components/compliance/FormOngs.vue';

export default {
    name: 'OrganizacaoView',
    components: {
        NavBarCompliance,
        Header,
        FloatingPanel,
        Footer,
        FormOngs
    }
}
</script>

<style>
@import '../../assets/styles/org-cadastro.css'
</style>