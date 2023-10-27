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
            <div class="documento__info-section w-100" v-if="pdsign != null && pdsign.status == 'DONE'">
                <i class="bi bi-patch-check-fill assinado"></i>
                <div class="documento__info">
                    <p>Assinado digitalmente via PDSign</p>
                    <p>{{ pdsign.members[0].name }}</p>
                    <p>CPF: {{ utils.cpfMask(pdsign.members[0].documentCode) }}</p>
                </div>
            </div>
            <div class="documento__info-section" v-if="pdsign != null && pdsign.status != 'DONE'">
                <i class="bi bi-patch-exclamation-fill nao-assinado"></i>
                <div class="documento__info">
                    <p>Não assinado</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import utils from '@/helpers/maska';

export default {
    name: 'DocumentoSolicitado',
    props: ['nome', 'status', 'nomeOriginal', 'assinaturaDigital', 'tamanhoArquivo', 'pdsign'],
    data() {
        return {
            utils: utils
        }
    }
}
</script>