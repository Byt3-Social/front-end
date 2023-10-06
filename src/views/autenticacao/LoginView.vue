<template>
    <main>
        <section class="background">
            <div class="background__overlay"></div>
            <img src="../../assets/images/bg-image.jpg" alt="" class="background__image">
        </section>
        <section class="login">
            <img src="../../assets/images/b3-social-logo.png" alt="" class="login__logo">
            <button class="login__cta-button">Entrar</button>
        </section>
    </main>
</template>

<script>
import '../../assets/styles/login.css';

export default {
    name: 'LoginView',
}
</script>