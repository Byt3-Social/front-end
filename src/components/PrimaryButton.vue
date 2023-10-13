<template>
    <button class="primary-button" @click.prevent="$emit('clicked')">{{ acao }}</button>
</template>

<script>
export default {
    name: 'PrimaryButton',
    props: ['acao']
}
</script>