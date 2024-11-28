<script setup>

definePageMeta({
  layout:"default"
});

import eventCatagory from "../components/homecomponents/eventCatagory.vue"
import homecover from "../components/homecomponents/homecover.vue"
import allLocation from "../components/homecomponents/allLocation.vue"

</script>
<template>
   <div class="bg-yellow-50">
       <homecover/>
       <allLocation />  
       <eventCatagory/>  

        
   </div> 
</template>
