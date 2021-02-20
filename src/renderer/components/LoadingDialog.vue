<template>
  <v-dialog
    v-model="show"
    persistent
    :width="width"
  >
    <v-card>
      <p class="loading-dialog__title">{{ text }}</p>
      <span
        class="loading-dialog__detail grey--text"
        v-if="detail"
      >
        {{ detail }}
      </span>
      <v-progress-linear
          v-model="progress"
          :indeterminate="indeterminate"
      ></v-progress-linear>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LoadingDialog',
  props: {
    show: {
      type: Boolean
    },
    detail: {
      type: String
    },
    query: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '300px'
    },
    text: {
      type: String
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  model: {
    prop: 'show',
    event: 'change'
  },
  methods: {

  }
}
</script>

<style scoped>
.loading-dialog__title{
  padding: 15px 16px 0;
  margin-bottom: 8px;
}
.loading-dialog__detail{
  padding: 0 16px 12px;
  display: block;
  font-size: 14px;
}
</style>
