<template>
  <section>
    <h2>Select a Topic</h2>
    <KnowledgeGrid :topics="topics" @select-topic="$emit('select-topic', $event)"/>
  </section>
</template>

<script>
import KnowledgeGrid from '~/components/KnowledgeGrid.vue'

export default {
  components: {
    KnowledgeGrid
  },
  props: ['topics'],
  emits: ['select-topic'],
};
</script>