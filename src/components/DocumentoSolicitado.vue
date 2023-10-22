<template>
    <div class="documento">
        <div class="documento__solicitado">
            <i class="bi bi-file-plus documento__icone"></i>
            <p class="documento__nome">{{ nome }}</p>
            <button type="button" @click.prevent="$emit('excluir')" class="excluir-documento__button">
                <i class="bi bi-x-circle-fill"></i>
            </button>
        </div>
        <div class="documento__enviado" v-if="status == 'ENVIADO' || status == 'PENDENTE_REENVIO'">
            <div class="documento__detalhes">
                <i class="bi bi-file-pdf-fill"></i>
                <div class="documento__info">
                    <p>{{ nomeOriginal }}</p>
                    <p v-if="status == 'PENDENTE_REENVIO'">Enviado - Reenvio solicitado</p>
                    <p v-else-if="assinaturaDigital != null">Enviado (assinado)</p>
                    <p v-else="assinaturaDigital != null">Enviado (não assinado)</p>
                    <p>{{ tamanhoArquivo }} bytes</p>
                </div>
            </div>
            <div class="documento__acoes">
                <button type="button" @click.prevent="$emit('download')">
                    <i class="bi bi-cloud-arrow-down-fill documento__icone documento__icone--download"></i>
                </button>
                <button type="button" @click.prevent="$emit('reset')" v-if="status == 'ENVIADO'">
                    <i class="bi bi-arrow-counterclockwise documento__icone documento__icone--reset"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DocumentoSolicitado',
    props: ['nome', 'status', 'nomeOriginal', 'assinaturaDigital', 'tamanhoArquivo']
}
</script>