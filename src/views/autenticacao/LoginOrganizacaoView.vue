<template>
    <main id="autenticacao">
        <section class="background">
            <div class="background__overlay"></div>
            <img src="../../assets/images/bg-image.jpg" alt="" class="background__image">
        </section>
        <section class="login">
            <img src="../../assets/images/b3-social-logo.png" alt="" class="login__logo">
            <div class="form-login">
                <div class="form-input">
                    <label for="name" class="form-input__label">Usuário</label>
                    <input type="type" :name="name" id="name" class="form-input__item">
                </div>
                <div class="form-input">
                    <label for="name" class="form-input__label">Senha</label>
                    <input type="type" :name="name" id="name" class="form-input__item">
                </div>
            </div>
            <button class="login__cta-button" @click="login()">Entrar</button>
        </section>
    </main>
</template>

<script>
import '../../assets/styles/login-organizacao.css';

export default {
    name: 'LoginView',
    methods: {
        login: async function () {

        }
    }
}
</script>