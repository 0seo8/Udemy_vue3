<template>
  <ul>
    <!-- li의 경우 따로 컴포넌트를 만드는 것을 고려해야합니다. -->
    <LearningResource
      v-for="res in resources"
      :id="res.id"
      :key="res.id"
      :title="res.title"
      :description="res.description"
      :link="res.link" />
  </ul>
</template>

<script>
import LearningResource from '~/components/learning-resources/LearningResource.vue'

export default {
  components: {
    LearningResource
  },
  inject: ['resources'],
}
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    margin: auto;
    max-width: 40rem;
  }
</style>
