<template>
    <nav class="navbar">
        <div class="navbar__wrapper">
            <h1 class="navbar__logo">
                <Logo cor="#00145f"></Logo>
            </h1>
            <ul class="navbar__items" v-if="this.$route.name != 'EmployeeHome' && this.$route.name != 'OrganizationHome'">
                <li class="dropdown">
                    <router-link :to="{ name: 'OrganizacaoLogin' }" class="navbar__item">Dashboard</router-link>
                </li>
                <li class="dropdown">
                    <button type="button" class="dropdown__button">Organizações</button>
                    <div class="dropdown__content">
                        <router-link :to="{ name: 'ListarOrganizacoes' }" class="navbar__item group__item">Visão
                            Geral</router-link>
                        <router-link :to="{ name: 'CadastrarOrganizacao' }"
                            class="navbar__item group__item">Cadastrar</router-link>
                    </div>
                </li>
                <li class="dropdown">
                    <button type="button" class="dropdown__button">Processos</button>
                    <div class="dropdown__content">
                        <router-link :to="{ name: 'ListarProcessos' }" class="navbar__item group__item">Visão
                            Geral</router-link>
                        <router-link :to="{ name: 'CadastrarOrganizacao' }"
                            class="navbar__item group__item">Documentos</router-link>
                        <router-link :to="{ name: 'CadastrarOrganizacao' }"
                            class="navbar__item group__item">Dados</router-link>
                    </div>
                </li>
                <li class="dropdown">
                    <button type="button" class="dropdown__button">Ações Sociais</button>
                    <div class="dropdown__content">
                        <p class="drowpdown__group">Voluntariado</p>
                        <router-link :to="{ name: 'ListarAcoesVoluntariado' }" class="navbar__item group__item">Visão
                            Geral</router-link>
                        <router-link :to="{ name: 'CadastrarAcaoVoluntariado' }" class="navbar__item group__item">Cadastrar</router-link>
                        <p class="drowpdown__group">ISP</p>
                        <router-link :to="{ name: 'ListarAcoesIsp' }" class="navbar__item group__item">Visão
                            Geral</router-link>
                        <router-link :to="{ name: 'CadastrarAcaoIsp' }"
                            class="navbar__item group__item">Registrar</router-link>
                        <p class="drowpdown__group">Acompanhamento</p>
                        <router-link :to="{ name: 'ListarAcompanhamentos' }"
                            class="navbar__item group__item">Solicitados</router-link>
                        <router-link :to="{ name: 'CadastrarAcompanhamento' }" class="navbar__item group__item">Solicitar</router-link>
                    </div>
                </li>
            </ul>

            <div class="navbar__user">
                <div class="navbar__user-details">
                    <p class="navbar__user-name">Olá Leandro!</p>
                    <small class="navbar__user-role">Colaborador B3</small>
                </div>
                <img src="../assets/images/profile-picture.png" alt="" class="navbar__user-picture">
            </div>
        </div>
    </nav>
</template>

<script>
import Logo from '@/components/Logo.vue';

export default {
    name: 'Navbar',
    components: {
        Logo
    },
    methods: {
        mostrarDropdown: function () {

        }
    }
}
</script>

<style>
.navbar {
    background-color: #ffffff;
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.navbar__wrapper {
    max-width: 1100px;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: .5rem 0;
    align-items: center;
    justify-content: space-between;
}

.navbar__logo {
    width: 12%;
    margin: 0;
}

.navbar__logo img {
    width: 75%;
    display: block;
    margin: 0;
}

.navbar__items {
    width: 60%;
    display: flex;
    flex-direction: row;
    list-style-type: none;
    align-items: center;
    justify-content: space-evenly;
    padding: .75rem 2rem;
    margin: 0;
}

.navbar .dropdown__button {
    background-color: transparent;
    outline: none;
    border: none;
    margin: 1rem 0;
}

.navbar .dropdown {
    position: relative;
    display: inline-block;
}

.navbar .drowpdown__group {
    padding: .5rem 1rem;
    margin: 0;
    opacity: .5;
    font-size: .8rem;
    text-transform: uppercase;
    font-weight: 500;
}

.navbar .dropdown .group__item {
    padding-left: 2rem;
}

.navbar .dropdown__content {
    display: none;
    position: absolute;
    background-color: #ffffff;
    padding: 1rem 0;
    min-width: 200px;
    border-radius: .5rem;
    box-shadow: 0px 0px 50px 0px rgba(82, 63, 105, .15);
    z-index: 1;
}

.navbar__items .navbar__item {
    text-decoration: none;
    color: #000000;
    width: 100%;
    display: inline-block;
    padding: .5rem 1rem;
}

.navbar .dropdown:hover .dropdown__content {
    display: block;
}

.navbar__items .dropdown__content .navbar__item:hover {
    background-color: #F0F5FF;
}

.navbar__user {
    width: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.navbar__user-details {
    width: 100%;
    margin-right: 1rem;
}

.navbar__user .navbar__user-name {
    width: 100%;
    margin: 0;
    font-weight: 600;
    text-align: right;
}

.navbar__user-role {
    text-align: right;
    display: block;
}

.navbar__user .navbar__user-picture {
    position: relative;
    width: 30%;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
    padding: .3rem;
    border: 2px solid #00145f;
}

.navbar__user-details {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 1rem;
}

.navbar__user-role {
    text-align: right;
    text-transform: uppercase;
}
</style>