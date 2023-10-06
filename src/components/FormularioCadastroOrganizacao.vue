<template>
    <form action="#" class="form-cadastro-organizacao">
        <fieldset class="form-cadastro-organizacao__fieldset">
            <legend class="form-cadastro-organizacao__fieldset-legend">Empresa</legend>
            <Field label="Razão social" name="razao_social" type="text"></Field>
            <Field label="Email" name="email_empresa" type="email"></Field>
            <Field label="Telefone" name="telefone_empresa" type="text"></Field>
        </fieldset>

        <fieldset class="form-cadastro-organizacao__fieldset">
            <legend class="form-cadastro-organizacao__fieldset-legend">Responsável</legend>
            <Field label="Nome" name="nome" type="text"></Field>
            <Field label="Email" name="email_responsavel" type="email"></Field>
            <Field label="Telefone" name="telefone_responsavel" type="text"></Field>
        </fieldset>

        <PrimaryButton acao="Cadastrar"></PrimaryButton>
    </form>
</template>

<script>
import Field from './Field.vue';
import PrimaryButton from './PrimaryButton.vue';

export default {
    name: 'FormularioCadastroOrganizacao',
    components: {
        Field,
        PrimaryButton
    }
}
</script>

<style>
.form-cadastro-organizacao .form-cadastro-organizacao__fieldset {
    padding: 1rem 2rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    margin-bottom: 1.75rem;
}

.form-cadastro-organizacao .form-cadastro-organizacao__fieldset-legend {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 1rem;
}
</style>