<template>
  <BaseDialog
    v-if="inputIsInvalid"
    title="Invalid Input"
    @close="confirmError" />
  <template #default>
    <p>Unfortunately, at least one input value is invalid.</p>
    <p>Please check all inputs and make sure you enter al least a few characters into each input field.</p>
  </template>
  <template #actions>
    <BaseButton @click="confirmError">
      Okay
    </BaseButton>
  </template>
  <BaseCard>
    <form @submit.prevent="submitData">
      <div class="form-control">
        <label for="title">Title</label>
        <input
          id="title"
          ref="titleInput"
          name="title" />
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea
          id="description"
          ref="descInput"
          name="description"
          rows="3"></textarea>
      </div>
      <div class="form-control">
        <label for="link">Link</label>
        <input
          id="link"
          ref="linkInput" 
          name="link" 
          type="url" />
      </div>
      <div>
        <BaseButton type="submit">
          Add Resource
        </BaseButton>
      </div>
    </form>
  </BaseCard>
</template>

<script>
import BaseDialog from '../UI/BaseDialog.vue'
export default {
    components: { BaseDialog },
    inject: ['addResource'],
    data() {
        return {
            inputIsInvalid: false,
        }
    },
    methods: {
        submitData() {
            const enteredTitle = this.$refs.titleInput.value
            const enteredDescription = this.$refs.descInput.value
            const enteredUrl = this.$refs.linkInput.value
            if (enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredUrl.trim() === '') {
                this.inputIsInvalid = true
                return
            }
        },
        confirmError() {
            this.inputIsInvalid = false
        }
    }
}
</script>

<style>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}
</style>
