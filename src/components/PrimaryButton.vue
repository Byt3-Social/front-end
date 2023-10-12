<template>
    <button class="primary-button" @click.prevent="$emit('clicked')">{{ acao }}</button>
</template>

<script>
export default {
    name: 'PrimaryButton',
    props: ['acao']
}
</script>

<style>
.primary-button {
    background-color: #00145f;
    width: 100%;
    padding: .75rem;
    color: #ffffff;
    border-radius: 5rem;
    border: none;
    font-weight: 500;
}
</style>