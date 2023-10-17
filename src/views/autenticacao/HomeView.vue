<template>
    <main id="autenticacao">
        <section class="background">
            <div class="background__overlay"></div>
            <img src="../../assets/images/bg-image.jpg" alt="" class="background__image">
        </section>
        <section class="login">
            <img src="../../assets/images/b3-social-logo.png" alt="" class="login__logo">
            <button class="home__cta-button" @click="irParaLogin">
                Entrar
            </button>
        </section>
    </main>
</template>

<script>
import '../../assets/styles/login.css';

export default {
    name: 'HomeView',
    methods: {
        irParaLogin() {
            this.$router.push({ name: 'Login' });
        },
    },
}
</script>