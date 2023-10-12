<template>
    <nav class="navbar">
        <div class="navbar__wrapper">
            <h1 class="navbar__logo">
                <Logo cor="#00145f"></Logo>
            </h1>
            <ul class="navbar__items">
                <li>
                    <router-link :to="{ name: 'Login' }" class="navbar__item"><a>Dashboard</a></router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'CadastroOrganizacao' }" class="navbar__item">Organizações</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'CadastroProcesso' }" class="navbar__item">Processos</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'CadastroAcaoVoluntariado' }" class="navbar__item">Ações Sociais</router-link>
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
    padding: 0;
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

.navbar__items .navbar__item {
    text-decoration: none;
    color: #000000;
}

.navbar__user {
    width: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.navbar__user .navbar__user-name {
    width: 100%;
    margin: 0;
    font-weight: 600;
    text-align: right;
}

.navbar__user .navbar__user-picture {
    position: relative;
    width: 30%;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
    padding: .3rem;
    border: 2.5px solid #00145f;
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