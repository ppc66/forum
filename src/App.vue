<template>
  <div>
    <Header/>
    <div style="display: flex;">
      <Aside/>
      <router-view style="flex: 1"/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import Aside from './components/Aside'

export default {
  name:'App',
  components:{
    Header,
    Aside
  }
}
</script>

<style>

</style>
