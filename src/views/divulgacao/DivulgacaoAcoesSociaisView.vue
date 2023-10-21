<template>
    <NavbarAcoesSociais></NavbarAcoesSociais>
    <section id="divulgacao">

        <section class="container__carrossel">
       
            <Carousel ref="carousel" v-model="currentSlide" snapAlign="center" :items-to-show="1.2" :wrap-around="true">
                
                <Slide v-for="slide in 10" :key="slide">

                    <div class="carousel__item" >

                        <div v-show="slide === 1" class="carousel__conteudoSlide" :style="`background-image: url('${backimage}')`">

                            <h3> {{ titulo[slide] }}</h3>
                            <p>{{ subtitulo[slide] }}</p>
                            <button>Doar</button>

                        </div>
                    </div>

                </Slide>

            </Carousel>

        </section>
        
        <section class="carrossel__botoes">
           
            <button @click="prev" class="botao__next"><img src="../../assets/images/arrow-left.svg"/></button>
            <button @click="next" class="botao__prev"><img src="../../assets/images/arrow-rigth.svg"/></button>
            
        </section>

        <section class="block__voluntariado">
            <label><p class="p__souvoluntario">#SOUVOLUNTÁRIOB3</p></label>
            
            <div class="block__cardsvoluntariado">
                <div class="card__Voluntariado">
                    <img :src="`${imgsCard[0]}`">
                    <p class="card__titulo">{{titulosCards[0]}}</p>
                    <p class="card__descricao">A doação de sangue é um ato altruísta e de solidariedade, que ajuda a salvar muitas vidas.</p>
                    <button>PARTICIPAR</button>
                </div>

                <div class="card__Voluntariado">
                    <img :src="`${imgsCard[1]}`">
                    <p class="card__titulo">{{titulosCards[1]}}</p>
                    <p class="card__descricao">A doação de sangue é um ato altruísta e de solidariedade, que ajuda a salvar muitas vidas.</p>
                    <button>PARTICIPAR</button>
                </div>

                <div class="card__Voluntariado">
                    <img :src="`${imgsCard[2]}`">
                    <p class="card__titulo">{{titulosCards[2]}}</p>
                    <p class="card__descricao">A doação de sangue é um ato altruísta e de solidariedade, que ajuda a salvar muitas vidas.</p>
                    <button>PARTICIPAR</button>
                </div>
            </div>

        </section>

    </section>
    <FooterItem></FooterItem>
</template>
<script>
import Navbar from '../../components/Navbar.vue';
import NavbarAcoesSociais from '../../components/NavbarAcoesSociais.vue';
import FooterItem from '../../components/Footer.vue';
import Header from '../../components/Header.vue';
import FloatingPanel from '../../components/FloatingPanel.vue';
import PrimaryButton from '../../components/PrimaryButton.vue';

import '../../assets/styles/carrossel.css';
import 'vue3-carousel/dist/carousel.css'

import backimage from '../../assets/images/backgroundImage.svg';
import cardOne from '../../assets/images/doacaoSangue.svg';
import cardTwo from '../../assets/images/cestaBasica.svg';
import cardThree from '../../assets/images/reformaQuadra.svg';


import { Carousel, Navigation, Slide } from 'vue3-carousel/dist/carousel.es'

export default {
    name: 'DivulgacaoAcoesSociaisView',
    components: {
        Navbar,
        FooterItem,
        Header,
        FloatingPanel,
        Carousel,
        Slide,
        Navigation,
        NavbarAcoesSociais,
        PrimaryButton,
      
        
    },
    data () { 
        return {
        currentSlide: 0,
        titulo: [0,'VAMOS AJUDAR'],
        subtitulo: [0,'As vítimas das chuvas precisam da sua solidariedade'],
        backimage: backimage,
        imgsCard: [cardOne,cardTwo,cardThree],
        titulosCards: ['Doação Sangue', 'Cesta Básica', 'Reforma Quadra'],
        descricaoCards: [],
        
        }
    },

    methods: {
      next() {
        this.$refs.carousel.next()
      },
      prev() {
        this.$refs.carousel.prev()
      },
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Inter');

#divulgacao {
    display: flex;
    width: 100%;

    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    font-family: 'Inter', sans-serif;
}


</style>
