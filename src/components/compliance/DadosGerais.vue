<template>
    <form action="#" class="form__dados-gerais">
        <fieldset class="form__dados-gerais__fieldset">
            <Field label="CNPJ" name="cnpj" type="text"></Field>
            <Field label="Nome Fantasia" name="nome-fantasia" type="text"></Field>
            <Field label="Email" name="email" type="text"></Field>
            <Field label="Endereço" name="endereco" type="text"></Field>
            <Field label="Bairro" name="bairro" type="text"></Field>
            <Field label="Cidade" name="cidade" type="text"></Field>
        </fieldset>

        <fieldset class="form__dados-gerais__fieldset">
            <Field label="Razão Social" name="razao-social" type="text"></Field>
            <Field label="Porte" name="porte" type="text"></Field>
            <Field label="Telefone" name="telefone" type="text"></Field>
            <Field label="Número" name="numero" type="text"></Field>
            <Field label="Complemento" name="complemento" type="text"></Field>
            <Field label="Estado" name="estado" type="text"></Field>
        </fieldset>
    </form>
</template>

<script>
import Field from '../Field.vue';

export default {
    name: 'DadosGerais',
    components: {
        Field
    }
}
</script>

<style>

.form__dados-gerais{
    display: flex;
    flex-direction: row;
}

.form__dados-gerais__fieldset{
    width: 100%;
}

</style>