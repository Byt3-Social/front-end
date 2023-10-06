<template>
    <section class="header">
        <div class="header__wrapper">
            <i :class="icone"></i>
            <h3 class="header__title">{{ titulo }}</h3>
        </div>
    </section>
</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";

export default {
    name: 'Header',
    props: ['titulo', 'icone']
}
</script>

<style>
.header {
    background-color: #00145f;
    color: #ffffff;
    width: 100%;
    height: 12rem;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    padding: 2rem 0;
}

.header__wrapper {
    width: 100%;
    max-width: 1100px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.header__wrapper .header__title {
    margin: 0 0 0 1rem;
}

.bi.bi-building-fill {
    font-size: 32px;
}
</style>