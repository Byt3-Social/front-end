<template>
    <section class="header">
        <div class="header__wrapper">
            <i :class="icone"></i>
            <label>
            <h4 class="header__title">{{ titulo }}</h4>
            <h3 class="header_subtitle"> {{subtitulo}} </h3>
            </label>
        </div>
    </section>
</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";

export default {
    name: 'Header',
    props: ['titulo', 'icone', 'subtitulo']
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

.header__wrapper label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 0.5rem;
    padding-bottom: 0rem;
}

h4 {
margin: 0; 
padding: 0;
}

h3 {
margin: 0;
opacity: 0.5;
}

.header_subtitle {
    font-size: 0.9rem;
    
}

.bi.bi-building-fill {
    font-size: 2rem;
}

.bi.bi-building-fill {
    font-size: 2rem;
}

.bi.bi-file-earmark-fill {
    font-size: 2rem;
}

.bi.bi-file-earmark-fill {
    font-size: 32px;
}
</style>