<template>
    <NavbarGerencia></NavbarGerencia>
    <main id="compliance">
        <Header titulo="Cadastro" icone="bi bi-file-earmark-fill"></Header>
        <FloatingPanel>
            <template v-slot:FloatingPanelContent>
                <nav>
                    <ul class="nav" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link" href="#dados-gerais" role="tab" aria-selected="true">Tab 1</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#dados-complementares" role="tab" aria-selected="false">Tab 2</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#documentos" role="tab" aria-selected="false">Tab 3</a>
                        </li>
                    </ul>
                </nav>

                
            
                 <div id="#dados-gerais" role="tabpanel" aria-hidden="true">
                    <DadosGerais></DadosGerais>
                </div>
                <!--
                <div id="dados-complementares" class="tab__content" role="tabpanel" aria-hidden="true">
                    Conteúdo da Tab 2
                </div>

                <div id="documentos" class="tab__content" role="tabpanel" aria-hidden="true">
                    Conteúdo da Tab 3
                </div> -->
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
import DadosGerais from '@/components/compliance/DadosGerais.vue'

const navLinks = document.querySelectorAll('.nav-link')
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = link.getAttribute('href').replace('#', '');
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(tab => {
            tab.setAttribute('aria-hidden', 'true');
        });
        document.getElementById(tabId).setAttribute('aria-hidden', 'false');
        navLinks.forEach(navLink => {
            navLink.setAttribute('aria-selected', 'false');
        });
        link.setAttribute('aria-selected', 'true');
    });
});

export default {
    name: 'GerenciarCadastro',
    components: {
        NavbarGerencia,
        Header,
        FloatingPanel,
        Footer,
        DadosGerais
    }
}
</script>

<style>
@import "../../assets/styles/gerenciar-cadastro.css"
</style>