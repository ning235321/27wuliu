<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
            window.addEventListener('unload', this.saveState)
        },
        methods: {
            saveState() {
                sessionStorage.setItem('state', JSON.stringify(this.$store.state))
            }
        }
}
</script>

<style>

* {
  margin: 0;
  padding: 0;
}
body{
	width: 100%;
	height: 100%;
	background: #f1f1f1;
}
</style>
