<template>
    <DropFileCompliance documentoUpado="Contrato Social" ></DropFileCompliance>
    <DropFileCompliance documentoUpado="Cartão CNPJ" ></DropFileCompliance>
    <DropFileCompliance documentoUpado="Extrato Bancário"></DropFileCompliance>
    <PrimaryButton acao="Solicitar documento adicional"></PrimaryButton>
</template>

<script>
import DropFileCompliance from './DropFileCompliance.vue';
import PrimaryButton from '../PrimaryButton.vue';

export default {
    name: 'Documentos',
    components: {
        DropFileCompliance,
        PrimaryButton
    }
}
</script>