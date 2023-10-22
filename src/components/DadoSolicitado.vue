<template>
    <div class="bloco bloco--complementar">
        <div class="bloco__info">
            <label class="bloco__atributo">{{ nome }}</label>
            <p class="bloco__atributo--preenchido" v-if="tipo == 'DATE' && valor != 'Não preenchido'">
                {{ (new Date(valor)).toLocaleDateString("pt-BR") }}
            </p>
            <p class="bloco__atributo--preenchido" v-else>
                {{ valor }}
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
    props: ['nome', 'valor', 'funcao', 'tipo']
}
</script>