<template>
    <nav class="menu">
        <div class="menu__wrapper">
            <div class="menu__logo">
                <img src="../assets/images/b3-social-logo.png" alt="Logo da B3 Social">
            </div>

            <ul class="menu__items">
                <li>
                    <router-link :to="{ name: 'Login' }" class="menu__link">Dashboard</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'Login' }" class="menu__link">Organizações</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'Login' }" class="menu__link">Processos</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'Login' }" class="menu__link">Ações Sociais</router-link>
                </li>
            </ul>

            <div class="menu__user">
                <p class="menu__user-name">Olá Leandro!</p>
                <img src="../assets/images/profile-picture.png" alt="" class="menu__user-picture">
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'menu'
}
</script>

<style>
@import "../assets/styles/menu.css";
</style>