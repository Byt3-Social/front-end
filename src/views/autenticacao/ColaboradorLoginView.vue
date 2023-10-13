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
            <button class="primary-button" @click="login()">Entrar</button>
        </section>
    </main>
</template>

<script>
import '../../assets/styles/autenticacao/colaborador-login-view.scss';
import Logo from '@/components/Logo.vue';
import axios from 'axios';
import { PublicClientApplication } from "@azure/msal-browser";

export default {
    name: 'ColaboradorLoginView',
    components: {
        Logo
    },
    methods: {
        login: async function () {
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

                console.log(loginResponse);
                console.log(loginResponse.account.username);

                var account = msalInstance.getAccountByUsername(loginResponse.account.username)

                var request = {
                    scopes: [process.env.VUE_APP_SCOPE],
                    account: account
                };

                msalInstance.acquireTokenSilent(request).then(tokenResponse => {
                    console.log(tokenResponse);

                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenResponse.accessToken;

                    axios
                        .post(process.env.VUE_APP_API_BASE_URL + "/colaborador/login")
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }).catch(async (error) => {
                    console.log(error);
                    if (error instanceof InteractionRequiredAuthError) {
                        // fallback to interaction when silent call fails
                        return msalInstance.acquireTokenPopup(request);
                    }

                    // handle other errors
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>