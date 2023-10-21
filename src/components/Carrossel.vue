<template>
    
    <Carousel ref="carousel" v-model="currentSlide" snapAlign="center" :items-to-show="2.5" :wrap-around="true">
      <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item">{{ slide - 1 }}</div>
      </Slide>
  
    </Carousel>
  
    <div>
      <button @click="prev">Prev</button>
      <button @click="next">Next</button>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  import { Carousel, Navigation, Slide } from 'vue3-carousel/dist/carousel.es'
  
  import 'vue3-carousel/dist/carousel.css'
  
  export default defineComponent({
    name: 'CustomNavigation',
    components: {
      Carousel,
      Slide,
      Navigation,
    },
    data: () => ({
      currentSlide: 0,
    }),
    methods: {
      next() {
        this.$refs.carousel.next()
      },
      prev() {
        this.$refs.carousel.prev()
      },
    },
  })
  </script>


