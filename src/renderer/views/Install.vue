<template>
  <div>
    <h2 class="page-title">安装引导</h2>

    <div class="install-content">
      <v-scroll-y-transition>
        <v-stepper alt-labels class="install-stepper" v-if="installStep > 0">
          <v-stepper-header>
            <v-stepper-step step="1">
              查找已安装版本
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2">
              检查完整性/下载
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2">
              检查JAVA
            </v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </v-scroll-y-transition>

      <v-scroll-x-reverse-transition>
        <div style="display: inline-block;" v-if="installStep === 0">
          <p style="margin: 30px 0;">
            欢迎使用LNR小镇整合包更新器，这似乎是你的第一次使用，
            <br>
            下面将会引导你完成更新器的设置。
          </p>

          <v-btn
              depressed
              color="primary"
              style="float:right"
              @click="installStep = 1"
          >
            开始配置
          </v-btn>
        </div>

        <div style="display: inline-block; margin: 30px 0;" v-if="installStep > 0">
          <v-tabs-items v-model="installStep">
            <v-tab-item :value="1">
              <v-scroll-x-reverse-transition>
                <p v-if="installInfo.bundleExistenceState !== 0">
                  如果你已经安装旧的LNR小镇整合包，你可以选择寻找本地已经安装的文件。
                  <br>
                  我将会为你检查完整性并更新到最新版
                </p>
                <p v-else>
                  需要为整合包选择一个路径
                  <br>
                  稍后将会为您下载整合包
                </p>
              </v-scroll-x-reverse-transition>

              <v-scroll-y-reverse-transition v-if="installInfo.bundleExistenceState === -1">
                <div>
                  <v-btn
                      class="ma-1"
                      color="success"
                      @click="installInfo.bundleExistenceState = 1">
                    已安装整合包
                  </v-btn>
                  <v-btn
                      class="ma-1"
                      color="secondary"
                      @click="skipFindingBundle">
                    未安装整合包
                  </v-btn>
                </div>
              </v-scroll-y-reverse-transition>

              <v-scroll-y-reverse-transition v-if="[0, 1].includes(installInfo.bundleExistenceState)">
                <v-card class="install-properties-card" v-if="">
                  <v-list-item two-line link @click="selectBundlePath">
                    <v-list-item-content>
                      <v-list-item-title v-if="installInfo.bundleExistenceState === 1">
                        整合包路径 (需要找到.minecraft文件夹，例如 D:/games/.minecraft)
                      </v-list-item-title>
                      <v-list-item-title v-if="installInfo.bundleExistenceState === 0">
                        整合包安装路径
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <span v-if="installInfo && installInfo.localBundlePath">
                          {{ installInfo.localBundlePath }}
                        </span>
                        <span v-else class="red--text text--darken-1">
                          未选择
                        </span>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-scroll-y-reverse-transition>

              <div style="margin: 3px;">
                <v-btn v-if="installInfo.bundleExistenceState === 0" plain @click="installInfo.bundleExistenceState = 1;installInfo.localBundlePath = ''">
                  已安装整合包？
                </v-btn>
                <v-btn v-if="installInfo.bundleExistenceState === 1" plain @click="skipFindingBundle">
                  未安装整合包？
                </v-btn>

                <v-btn
                    color="primary"
                    :disabled="!installInfo.localBundlePath"
                    v-if="[0, 1].includes(installInfo.bundleExistenceState)"
                    @click="verifyBundlePath"
                >
                  下一步
                </v-btn>
              </div>
            </v-tab-item>
            <v-tab-item :value="2">
              <h3>22</h3>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-scroll-x-reverse-transition>
    </div>

    <div class="kiyoko-img-block">
      <img class="kiyoko-img" src="@/assets/images/kiyoko.png" alt="">
    </div>
  </div>
</template>

<script>
import env from '@/helpers/env'
import fileDialog from '@/helpers/fileDialog'

console.log(env)

export default {
  name: 'Install',

  data () {
    return {
      installStep: 0,
      installInfo: {
        localBundlePath: '',
        // -1: 未选择 0: 未安装 1: 已安装
        bundleExistenceState: -1
      }
    }
  },

  methods: {
    async selectBundlePath () {
      let files = await fileDialog()
      if (files && files.length > 0) {
        this.$set(this.installInfo, 'localBundlePath', files[0])
      }
    },

    skipFindingBundle () {
      this.$set(this.installInfo, 'bundleExistenceState', 0)
      this.$set(this.installInfo, 'localBundlePath', env.runningDir)
    },

    verifyBundlePath () {
      
    }
  }
}
</script>

<style scoped>
.page-title{
  text-align: center
}
.kiyoko-img-block{
  height: 250px;
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 0;
}
img.kiyoko-img{
  height: 250px;
}
.install-content{
  text-align: center;
  /*padding-left: 210px;*/
  margin: 10px 0;
}
.install-stepper{
  width: 600px;
  margin: auto;
}
.install-properties-card{
  margin: 30px 10px;
  text-align: left;
}
</style>
