<template>
    <router-view :key="$route.fullPath" />
</template>

<script>
import './assets/styles/default.scss';

export default {
    name: 'App',
}
</script>