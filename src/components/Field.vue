<template>
    <div class="input">
        <label :for="name" class="input__label">{{ label }}</label>
        <input :type="type" :name="name" :id="name" class="input__item">
    </div>
</template>

<script>
export default {
    name: 'Field',
    props: ['label', 'name', 'type']
}
</script>

<style>
.input {
    width: 100%;
    display: block;
    margin-bottom: 1rem;
}

.input__label {
    margin-bottom: .5rem;
}

.input__item {
    width: 100%;
    display: block;
    background: #F1F1F2;
    border: none;
    padding: .75rem 1rem;
    border-radius: 3rem;
}
</style>