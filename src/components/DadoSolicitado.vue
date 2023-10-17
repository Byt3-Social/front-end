<template>
    <div class="bloco bloco--complementar">
        <div class="bloco__info">
            <label class="bloco__atributo">{{ nome }}</label>
            <p class="bloco__atributo--preenchido">{{ valor }}
            </p>
        </div>
        <button type="button" class="excluir-dado" @click.prevent="$emit('excluir')">
            <i class="bi bi-x-circle-fill"></i>
        </button>
    </div>
</template>
<script>
export default {
    name: 'DadoSolicitado',
    props: ['nome', 'valor', 'funcao']
}
</script>