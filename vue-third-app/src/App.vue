<template>
  <div>
    <TheHeader />
    <button @click="setSelectedComponent('active-goals')">
      ActiveGoals
    </button>
    <button
      @click="setSelectedComponent('manage-goals')">
      ManageGoals
    </button>
    <div color="test">
      HelloTEst
    </div>
    <!-- <ActiveGoals v-if="setSelectedComponent === 'active-goals'" />
    <ManageGoals v-if="setSelectedComponent === 'manage-goals'" /> -->
    <!-- <keepAlive>
      <component :is="selectedComponent" />
    </keepAlive> -->
    <keep-alive>
      <component :is="selectedComponent" />
    </keep-alive>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import ActiveGoals from '~/components/ActiveGoals.vue'
import ManageGoals from '~/components/ManageGoals.vue'
export default {
  components: {
    TheHeader,
    ActiveGoals,
    ManageGoals
  },
  data() {
    return {
      selectedComponent: 'active-goals',
      activeUser: {
        name: 'Maximilian Schwarzmüller',
        description: 'Site owner and admin',
        role: 'admin',
      },
    }
  },
  methods: {
    setSelectedComponent(cmp) {
      this.selectedComponent = cmp
    }
  }
}
</script>

<style lang="scss">

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

</style>
