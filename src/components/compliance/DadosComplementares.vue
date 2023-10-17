<template>
    <form action="#" class="form__dados-gerais">
        <fieldset class="form__dados-gerais__fieldset">
            <Field label="Capital Social" name="capital-social" type="text"></Field>
            <Field label="Quantidade de Sócios" name="quantidade-de-socios" type="text"></Field>
        </fieldset>

        <fieldset class="form__dados-gerais__fieldset">
            <Field label="Quantidade de Funcionários" name="quantidade-de-funcionarios" type="text"></Field>
        </fieldset>
    </form>

    <div class="conteiner-botão">
        <button class="botao-cinza">Salvar</button>
        <PrimaryButton acao="Submeter"></PrimaryButton>
    </div>
</template>

<script>
import PrimaryButton from '../PrimaryButton.vue';
import Field from '../Field.vue';

export default {
    name: 'DadosComplementares',
    components: {
        PrimaryButton,
        Field
    }
}
</script>

<style>
@import '../../assets/styles/conteiner-compliance.css';
</style>