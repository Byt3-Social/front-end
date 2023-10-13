<template>
    <main id="organizacao-login-view">
        <section class="background">
            <div class="background__overlay"></div>
            <img src="../../assets/images/bg-image.jpg" alt="" class="background__image">
        </section>
        <section class="login">
            <div class="login__logo-wrapper">
                <Logo cor="#00145F"></Logo>
            </div>
            <form action="#" method="post" class="login__form">
                <div class="form-input-wrapper">
                    <label for="usuario" class="form-input-label">Usuário</label>
                    <input type="text" name="usuario" id="usuario" class="form-input" autofocus v-model="usuario">
                </div>
                <div class="form-input-wrapper">
                    <label for="senha" class="form-input-label">Senha</label>
                    <input type="password" name="senha" id="senha" class="form-input" v-model="senha">
                </div>
                <button class="primary-button" @click.prevent="login()">Entrar</button>
            </form>
        </section>
    </main>
</template>

<script>
import '../../assets/styles/autenticacao/organizacao-login-view.scss';
import Logo from '@/components/Logo.vue';
import axios from 'axios';

export default {
    name: 'OrganizacaoLoginView',
    components: {
        Logo
    },
    data() {
        return {
            usuario: null,
            senha: null
        }
    },
    methods: {
        login: function () {
            var data = {
                usuario: this.usuario,
                senha: this.senha
            };

            axios
                .post(process.env.VUE_APP_API_BASE_URL + "/organizacao/login", data)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}
</script>