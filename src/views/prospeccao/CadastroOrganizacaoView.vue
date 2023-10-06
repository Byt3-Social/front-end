<template>
    <MenuHorizontal></MenuHorizontal>
    <main id="prospeccao">
        <Header titulo="Cadastrar Organização" icone="bi bi-building-fill"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <FormularioCadastroOrganizacao></FormularioCadastroOrganizacao>
            </template>
        </FloatingPanel>
    </main>
    <FooterItem></FooterItem>
</template>
<script>
import '../../assets/styles/cadastro-organizacao.css';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import FormularioCadastroOrganizacao from '../../components/FormularioCadastroOrganizacao.vue';
import MenuHorizontal from '../../components/MenuHorizontal.vue';

export default {
    name: 'CadastroOrganizacaoView',
    components: {
    FooterItem,
    Header,
    FloatingPanel,
    FormularioCadastroOrganizacao,
    MenuHorizontal
}
}
</script>