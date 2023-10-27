<template>
    <div class="documento">
        <div class="documento__solicitado" @dragover.prevent="dragover" @dragleave="dragleave" @drop="drop">
            <i :class="`bi bi-${icone} documento__icone`"></i>
            <p class="documento__nome" v-if="!isDragging">{{ arquivoSolicitado }}</p>
            <p class="documento__nome" v-else>Solte o arquivo aqui</p>
            <input type="file" name="file" id="fileInput" class="dropfile__input" @change="onChange" ref="file" :disabled="disabled == true">
        </div>
        <div class="documento__enviado" v-for="(arquivo, index) in arquivos">
            <div class="documento__detalhes">
                <i class="bi bi-file-pdf-fill"></i>
                <div class="documento__info">
                    <p>{{ (arquivo.caminhoS3.split("/" + pasta + "/"))[1] }}</p>
                    <p>Submetido em: {{ (new
                        Date(arquivo.updatedAt)).toLocaleDateString('pt-BR',
                            options) }}</p>
                    <p>{{ arquivo.tamanho }} bytes</p>
                </div>
            </div>
            <div class="documento__acoes">
                <button type="button" @click.prevent="$emit('download', arquivo.id)" v-if="download != false">
                    <i class="bi bi-cloud-arrow-down-fill documento__icone documento__icone--download"></i>
                </button>
                <button type="button" @click.prevent="$emit('excluirArquivo', index)">
                    <i class="bi bi-x-circle-fill documento__icone documento__icone--reset"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MultiFileUploader',
    data() {
        return {
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
            var url = this.$emit('uploadArquivo', this.files[0]);
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
defineProps(['arquivos', 'arquivoSolicitado', 'icone', 'pasta', 'disabled', 'download']);
defineEmits(['update:arquivo', 'excluirArquivo', 'uploadArquivo', 'download']);
</script>