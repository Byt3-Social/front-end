<template>
    <main id="autenticacao">
        <section class="background">
            <div class="background__overlay"></div>
            <img src="../../assets/images/bg-image.jpg" alt="" class="background__image">
        </section>
        <section class="login">
            <img src="../../assets/images/b3-social-logo.png" alt="" class="login__logo">

            <!-- Texto cabeçalho -->
            <article class="login__text">
                <h1>Entrar</h1>
            </article>

            <!-- Form de login -->
            <form>
                <div>
                    <input 
                        v-model="email" 
                        type="text" 
                        name="email" 
                        placeholder="Insira seu usuário"
                        class="login__input"
                    >
                </div>

                <div id="passwordContainer">
                    <input
                        id="password"
                        v-model="password"
                        name="password"
                        type="password"
                        placeholder="Insira sua senha"
                        class="login__input"
                    >
                </div>

                <button class="login__cta-button">
                    Avançar
                </button>
            </form>
        </section>
    </main>
</template>

<script>
import '../../assets/styles/login.css';

export default {
    name: 'LoginView',
}
</script>