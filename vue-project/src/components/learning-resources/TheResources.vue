<template>
  <keep-alive>
    <BaseCard>
      <BaseButton
        :mode="storedResButtonMode"
        @click="setSelectedTab('stored-resources')">
        Stored Resources
      </BaseButton>
      <BaseButton
        :mode="addResButtonMode"
        @click="setSelectedTab('add-resource')">
        Add Resource
      </BaseButton>
    </BaseCard>
  </keep-alive>
  <component :is="selectedTab" />
</template>

<script>
import StoredResources from './StoredResources.vue'
import AddResource from './AddResource.vue'
export default {
  components: {
    StoredResources,
    AddResource
  },
  provide() {
    return  {
      resources: this.storeResources,
      addResource : this.addResource,
      deleteResource: this.removeResource
    }
  },
  data() {
    return {
      selectedTab: 'stored-resources',
      storeResources: [
        { id: 'official-guid',
          title: 'Official Guide',
          description: 'The official Vue.js documntation',
          link: 'https://vuejs.org'
        },
        { id: 'google',
          title: 'Google',
          description: 'Learn to google...',
          link: 'https://google.org'
        },

      ]
    }
  },
  computed: {
    storedResButtonMode() {
      return this.selectedTab === 'stored-resources' ? null : 'flat'
    },
    addResButtonMode() {
      return this.selectedTab === 'add-resource' ? null : 'flat'
    }
  },
  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab
    },
    addResource(title, description, url) {
      const newResource = {
        id: new Date().toISOString(),
        title,
        description,
        url
      }
      this.storeResources.unshift(newResource)
      this.selectedTab = 'stored-resources'
    },
    removeResource(resId) {
      const resIndex= this.storeResources.findIndex(res => res.id === resId)
      this.storeResources.splice(resIndex,1)
    } 
  }
}
</script>
