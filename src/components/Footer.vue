<template>
    <footer class="footer" :class="this.$route.name == 'Doar' ? 'white-footer': ''">
        <p>&copy; B3 Social | Todos os direitos reservados</p>
    </footer>
</template>

<script>
export default {
    name: 'FooterItem'
}
</script>

<style>
    .footer {
        width: 100%;
        padding: 2rem;
        margin-top: 2rem;
    }

    .footer p {
        margin: 0;
        text-align: center;
    }

    .footer.white-footer {
        background-color: #ffffff;
        margin-top: 0;
    }
</style>