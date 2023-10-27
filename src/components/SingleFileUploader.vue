<template>
    <div class="documento">
        <div class="documento__solicitado" @dragover.prevent="dragover" @dragleave="dragleave" @drop="drop">
            <i :class="`bi bi-${icone} documento__icone`"></i>
            <p class="documento__nome" v-if="!isDragging">{{ arquivoSolicitado }}</p>
            <p class="documento__nome" v-else>Solte o arquivo aqui</p>
            <input type="file" name="file" id="fileInput" class="dropfile__input" @change="onChange" ref="file">
        </div>
        <div class="documento__enviado" v-if="arquivo != null && arquivo.caminhoS3 != null">
            <div class="documento__detalhes contrato__detalhes">
                <div class="documento__info-section">
                    <i class="bi bi-file-pdf-fill"></i>
                    <div class="documento__info">
                        <p v-if="organizacao == true">{{ arquivo.nomeArquivoOriginal }}</p>
                        <p v-else>{{ (arquivo.caminhoS3.split("/" + pasta + "/"))[1] }}</p>
                        <p>
                            Submetido em: {{ (new
                                Date(arquivo.updatedAt)).toLocaleDateString('pt-BR',
                                    options) }}
                        </p>
                        <p v-if="arquivo.status != null && arquivo.status == 'PENDENTE_REENVIO'">
                            <strong>Reenvio solicitado</strong>
                        </p>
                        <p v-if="organizacao == true">{{ arquivo.tamanhoArquivo }} bytes</p>
                    </div>
                </div>
                <div class="documento__info-section" v-if="pdsign != null && pdsign.status == 'DONE'">
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
            <div class="documento__acoes">
                <span v-if="arquivo.status != null && arquivo.status == 'PENDENTE_REENVIO'">
                    <i class="bi bi-exclamation-circle documento__icone documento__icone--pendente"></i>
                </span>
                <button type="button" @click.prevent="$emit('download', arquivo.id)" v-if="download != false">
                    <i class="bi bi-cloud-arrow-down-fill documento__icone documento__icone--download"></i>
                </button>
                <button type="button" @click.prevent="$emit('excluirArquivo', arquivo.id)">
                    <i class="bi bi-x-circle-fill documento__icone documento__icone--reset"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import utils from '@/helpers/maska';

export default {
    name: 'SingleFileUploader',
    data() {
        return {
            utils: utils,
            isDragging: false,
            upload: this.urlUpload,
            files: null,
            options: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
            },
        }
    },
    methods: {
        onChange(i) {
            this.files = this.$refs.file.files;
            this.$emit('uploadArquivo', this.files[0]);
        },
        dragover() {
            this.isDragging = true;
        },
        dragleave() {
            this.isDragging = false;
        },
        drop(e) {
            e.preventDefault();
            this.$refs.file.files = e.dataTransfer.files;
            this.onChange();
            this.isDragging = false;
        },
        remove(i) {
            this.files = null;
        },
    },
}
</script>

<script setup>
defineProps(['arquivo', 'arquivoSolicitado', 'icone', 'pasta', 'download', 'organizacao', 'pdsign']);
defineEmits(['update:arquivo', 'excluirArquivo', 'uploadArquivo', 'download']);
</script>