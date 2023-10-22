<template>
    <div class="documento">
        <div class="documento__solicitado" @dragover.prevent="dragover" @dragleave="dragleave" @drop="drop">
            <i class="bi bi-file-image documento__icone"></i>
            <p class="documento__nome" v-if="!isDragging">{{ arquivoSolicitado }}</p>
            <p class="documento__nome" v-else>Solte o arquivo aqui</p>
            <input type="file" name="file" id="fileInput" class="dropfile__input" @change="onChange" ref="file"
                accept="image/png, image/jpeg">
        </div>
        <div class="documento__enviado" v-if="urlImagem != null">
            <div class="documento__detalhes">
                <i class="bi bi-image"></i>
                <div class="documento__info">
                    <p>{{ (urlImagem.split("/imagens/"))[1] }}</p>
                </div>
            </div>
            <div class="documento__acoes">
                <button type="button" @click.prevent="$emit('excluirImagem')">
                    <i class="bi bi-x-circle-fill documento__icone documento__icone--reset"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SingleFileUploader',
    data() {
        return {
            isDragging: false,
            upload: this.urlUpload,
            files: null,
        }
    },
    methods: {
        onChange(i) {
            this.files = this.$refs.file.files;
            this.$emit('uploadImagem', this.files[0]);
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
defineProps(['urlImagem', 'arquivoSolicitado']);
defineEmits(['update:urlImagem']);
</script>