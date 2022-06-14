<template>
  <section>
    <BaseCard>
      <template #header>
        <h3>{{ fullName }}</h3>
        <BaseBadge
          :type="role"
          :caption="role.toUpperCase()" />
      </template>
      <template #default>
        <p>{{ infoText }}</p> 
      </template>  
    </BaseCard>
  </section>
</template>

<script>
import BaseCard from '~/components/BaseCard.vue'
import BaseBadge from '~/components/BaseBadge.vue'
export default {
  components: {
    BaseCard,
    BaseBadge
  },
  props: ['fullName', 'infoText', 'role'],
}
</script>
