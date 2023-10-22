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
                <p class="falha-login" v-show="falhaLogin">Usuário e/ou senha inválidos</p>
                <div class="form-input-wrapper">
                    <label for="usuario" class="form-input-label">Usuário</label>
                    <input type="text" name="usuario" id="usuario" class="form-input" v-model="usuario">
                </div>
                <div class="form-input-wrapper">
                    <label for="senha" class="form-input-label">Senha</label>
                    <input type="password" name="senha" id="senha" class="form-input" v-model="senha">
                </div>
                <button class="primary-button" @click.prevent="login()">
                    <span v-show="logando" class="spinner-border" aria-hidden="true"></span>
                    <span v-show="!logando">Entrar</span>
                </button>
            </form>
        </section>
    </main>
</template>

<script>
import '../../assets/styles/autenticacao/organizacao-login-view.scss';
import Logo from '@/components/Logo.vue';
import axios from 'axios';
import decode from 'jwt-decode';

export default {
    name: 'OrganizacaoLoginView',
    components: {
        Logo
    },
    data() {
        return {
            usuario: null,
            senha: null,
            falhaLogin: false,
            logando: false,
        }
    },
    methods: {
        login: function () {
            this.falhaLogin = false;
            this.logando = true;

            var data = {
                usuario: this.usuario,
                senha: this.senha
            };

            axios.post(process.env.VUE_APP_API_BASE_URL + "/auth/organizacao/login", data)
                .then((response) => {
                    var decoded = decode(response.data.token);

                    var organizacao = {
                        token: response.data.token,
                        empresa: decoded.sub,
                        cnpj: decoded.cnpj,
                        role: decoded.roles[0],
                    };

                    localStorage.setItem("B3Social-Organizacao", JSON.stringify(organizacao));
                    this.logando = false;
                    this.$router.push({ name: 'OrganizacaoHome' });
                })
                .catch((error) => {
                    if (error.response && error.response.status && error.response.status == 403) {
                        document.querySelector(".falha-login").innerText = "Usuário e/ou senha inválidos";
                    } else {
                        document.querySelector(".falha-login").innerText = "Não foi possível realizar sua autenticação";
                    }

                    this.logando = false;
                    this.falhaLogin = true;
                });
        }
    }
}
</script>