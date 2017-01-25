<template lang="pug">
  .custom-com
    | with props: {{ myname }}
    b rotated text
</template>

<script>
export default {
  props: ['myname'],

  data() {
    return {
      n: 'Com',
    }
  },
}
</script>

<style scoped>
  b {
    display: inline-block;
  }
  .active b {
    transition-property: transform;
    transition-duration: 1s;
    transition-delay: 2s;
    transform: rotateY(60deg);
    margin-left: 30px;
  }
</style>
