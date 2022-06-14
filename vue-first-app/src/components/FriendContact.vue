<template>
  <li>
    <h2>{{ name }} {{ isFavorite ? '(Favorite)': '' }} </h2>
    <button @click="toggleFavorite">
      Toggle Favorite
    </button>
    <button @click="toggleDetails">
      {{ detailsAreVisible ? 'Hide': 'Show' }} Details
    </button>
    <ul v-if="detailsAreVisible">
      <li><strong>Phone:</strong>{{ phoneNumber }}</li>
      <li><strong>Email:</strong>{{ emailAddress }}</li>
    </ul>
    <button @click="delteteFriend">
      Delete
    </button>
  </li>
</template>

<script>
export default {
  props:{
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: {
    'toggle-favorite': function(id) {
      if(id) {
        return true
      } else {
        console.warn('Id is missing!')
        return false
      }
    }
  },
  data() {
    return {
      detailsAreVisible: false,
    }
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible
    },
    toggleFavorite() {
      // props는 단방향 데이터 바인딩이기 떄문에 아래 코드는 불가합니다.
      // this.friendIsFavorite = !this.friendIsFavorite
      this.$emit('toggle-favorite', this.id)
    },
    delteteFriend() {
      
    }
  }
}
</script>
