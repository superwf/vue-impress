<template>
  <div>
    with props: {{ myname }}
    <b> rotated text </b>
  </div>
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
  }
</style>
