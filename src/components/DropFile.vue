<template>
    <main>

      <section class="soltarArquivo">

        <section class="sectionDrop" @dragover="dragover" @dragleave="dragleave" @drop="drop">
          
          <!-- Se atentar a o id e ao for para acessibilidade posteriormente.-->
          <input type="file" name="file" id="fileInput" class="inputArquivo__areaDeDrop--invisivel" @change="onChange" ref="file">
          
          <section class= "sectionAreaDrop"></section>
          <section for="fileInput" class= "sectionAreaDrop">

            <div v-show="isDragging" class="file-label">
              <i class="bi bi-upload"></i>
              <p>Solte o arquivo aqui.</p>
            </div>

            <div v-show="!isDragging" class="file-label"> 
              <i class="bi bi-file-earmark-plus"></i>
              <p>{{ documentoUpado }}</p>
            </div>

          </section>

          <section class= "sectionAreaDrop">

            <div  v-show="this.files!=false">
              <button class="ml-2" type="button" @click="remove()" title="Remove file">
                <i class="bi bi-x-circle-fill"></i>
              </button>
            </div>

          </section>
    
      </section>

    </section>

        <section class="sectionExibicao" v-if="files.length">

     
            
            <div v-for="file in files" :key="file.name" class="sectionExibicao__arquivoUpado">
              
              <div class="div_arquivoExibido">

                <section>
                  <i class="bi bi-file-pdf-fill"></i>
                  <label class="label__arquivoExibido--texto">
                    <p> {{ file.name }} </p>
                    <p> Assinado </p>
                    <p> {{ file.size }}</p>
                  </label>
                </section>
                
              
                <section v-if="estadoFileAssinado">
                  <i class="bi bi-patch-check-fill"></i>
                  <label  class="label__arquivoExibido--texto">
                    <p> Assinado Digitalmente </p>
                    <p> Taylor Alison Swift </p>
                    <p> {{ file.size }}</p>
                  </label>
                </section>
                

              </div>
              

              <label v-if="estadoFileAssinado" class="labelExibicao__supeiorEsquerda">
                <i class="bi bi-cloud-arrow-down-fill"></i>
                <i class="bi bi-arrow-counterclockwise"></i>
              </label>

              <label v-else-if="!estadoFileAssinado" class="labelExibicao__supeiorEsquerda">
                <i class="bi bi-patch-check"></i>
              </label>
              

            </div>


          

        </section>

     

    </main>
  </template>
  
<script>
import PrimaryButton from './PrimaryButton.vue';

  export default {
    //Uma penca de métodos que devem ser úteis, segundo o moço do video.
    name: 'AreaDropArquivo',
    props: ['documentoUpado'],

    components: {
      PrimaryButton,
    },

    data() {
      return {
        name: 'AreaDropArquivo',
        isDragging: false,
        files: false,
        estadoFileAssinado: true
      };
    },

    methods: {
      onChange(i) {
        this.files = this.$refs.file.files;
        console.log(this.files);
      },

      dragover(e) {
        e.preventDefault();
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
        this.files = false;
      },

    },
  };
  </script>
  