<template>
  <div>
    <h2>Manage Goals</h2>
    <input
      ref="goal"
      type="text" />
    <button @click="setGoal">
      Set Goal
    </button>
    <teleport to="body">
      <ErrorAlert v-if="isputIsInvalid">
        <h2>Input is invalid!</h2>
        <p>Please enter at least a few chracters..</p>
        <button @click="confrimError">
          Okay
        </button>
      </ErrorAlert>
    </teleport>
  </div>
</template>

<script>
import ErrorAlert from '~/components/ErrorAlert.vue'
export default {
  components: {
    ErrorAlert
  },
  data() {
    return {
      isputIsInvalid: false,
    }
  },
  methods: {
    setGoal() {
      const enteredValue=this.$refs.goal.value
      if(enteredValue === '') {
        this.isputIsInvalid = true
      }
    },
    confrimError() {
      this.isputIsInvalid=false
    }
  }
}
</script>
