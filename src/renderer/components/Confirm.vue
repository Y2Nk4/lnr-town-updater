<template>
  <div class="dialogwrapper" v-if="show">
    <div class="overlay"></div>
    <v-card class="dialog">
      <v-card-title>提示</v-card-title>
      <v-card-text>
        您确定这么做吗？
      </v-card-text>
      <v-card-actions>
        <v-btn @click="ok">确定</v-btn>
        <v-btn @click="cancel">取消</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      promiseStatus: null,
      show: false
    }
  },
  methods: {
    confirm () {
      let _this = this
      this.show = true
      return new Promise(function (resolve, reject) {
        _this.promiseStatus = {resolve, reject}
      })
    },
    ok () {
      this.show = false
      this.promiseStatus && this.promiseStatus.resolve()
    },
    cancel () {
      this.show = false
      this.promiseStatus && this.promiseStatus.reject()
    }
  }
}
</script>
<style>
.dialogwrapper{
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0px;
  pointer-events: none;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 6;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1) 0s, z-index 1ms ease 0s;
  outline: none;
}
.dialog{
  overflow-y: auto;
  pointer-events: auto;
  width: 100%;
  z-index: inherit;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px;
  border-radius: 4px;
  margin: 24px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s;
  max-width:290px;
}
.overlay{
  align-items: center;
  border-radius: inherit;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: auto;
  background:#000;
  opacity:0.46;
}
</style>
