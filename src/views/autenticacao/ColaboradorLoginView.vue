<template>
    <main id="colaborador-login-view">
        <section class="background">
            <div class="background__overlay"></div>
            <img src="../../assets/images/bg-image.jpg" alt="" class="background__image">
        </section>
        <section class="login">
            <div class="login__logo-wrapper">
                <Logo cor="#00145F"></Logo>
            </div>
            <button class="primary-button" @click="login()">
                <span v-show="logando" class="spinner-border" aria-hidden="true"></span>
                <span v-show="!logando">Entrar</span>
            </button>
            <Transition>
                <p class="falha-login" v-if="falhaLogin">Não foi possível realizar sua autenticação</p>
            </Transition>
        </section>
    </main>
</template>

<script>
import '../../assets/styles/autenticacao/colaborador-login-view.scss';
import Logo from '@/components/Logo.vue';
import axios from 'axios';
import { PublicClientApplication } from "@azure/msal-browser";
import decode from 'jwt-decode';

export default {
    name: 'ColaboradorLoginView',
    components: {
        Logo
    },
    data() {
        return {
            logando: false,
            falhaLogin: false,
        }
    },
    methods: {
        login: async function () {
            this.falhaLogin = false;
            this.logando = true;

            const msalConfig = {
                auth: {
                    clientId: process.env.VUE_APP_CLIENT_ID,
                    authority: process.env.VUE_APP_AUTHORITY
                }
            };

            const msalInstance = await PublicClientApplication.createPublicClientApplication(msalConfig);

            var loginRequest = {
                scopes: [process.env.VUE_APP_SCOPE],
                redirectUri: process.env.VUE_APP_REDIRECT_URL
            };

            try {
                const loginResponse = await msalInstance.loginPopup(loginRequest);

                var account = msalInstance.getAccountByUsername(loginResponse.account.username)

                var request = {
                    scopes: [process.env.VUE_APP_SCOPE],
                    account: account
                };

                msalInstance.acquireTokenSilent(request).then(tokenResponse => {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenResponse.accessToken;

                    axios.post(process.env.VUE_APP_API_BASE_URL + "/auth/colaborador/login")
                        .then(() => {
                            var decoded = decode(tokenResponse.accessToken);

                            var colaborador = {
                                token: tokenResponse.accessToken,
                                nome: decoded.name,
                                email: decoded.unique_name,
                                role: decoded.roles[0],
                            };

                            localStorage.setItem("B3Social-Colaborador", JSON.stringify(colaborador));
                            this.logando = false;
                            this.$router.push({ name: 'ColaboradorHome' });
                        })
                        .catch((error) => {
                            this.logando = false;
                            this.falhaLogin = true;
                        });
                }).catch(async (error) => {
                    if (error instanceof InteractionRequiredAuthError) {
                        return msalInstance.acquireTokenPopup(request);
                    }

                    this.logando = false;
                    this.falhaLogin = true;
                })
            } catch (error) {
                this.logando = false;
                this.falhaLogin = true;
            }
        }
    }
}
</script>