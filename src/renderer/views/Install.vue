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
              @click="isShowTOSDialog = true"
          >
            开始配置
          </v-btn>
        </div>

        <div style="display: inline-block; margin: 30px 0;width: 550px;" v-if="installStep > 0">
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

    <v-dialog
        v-model="verifyingBundlePath"
        persistent
        max-width="290">
      <v-card>
        <v-card-title class="headline">
          Use Google's location service?
        </v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="verifyingBundlePath = false"
          >
            Disagree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 使用声明 -->
    <v-dialog
        v-model="isShowTOSDialog"
        persistent
        max-width="500">
      <v-card>
        <v-card-title class="headline">
          你需要先同意本使用协议
        </v-card-title>
        <v-card-text>
          欢迎使用LNR小镇整合包更新器(以下简称：“本软件”)及服务，你应当先阅读、同意并遵守本用户协议(以下简称：“本协议”)。
          <br>
          除非你已阅读并接受本协议所有条款，否则你无权下载、安装或使用本软件及相关服务。
          你的下载、安装、使用、登录、进入服务器等行为即视为你已阅读并同意上述协议的约束。

          <h3 style="margin-top: 8px;">用户注意事项</h3>

          你理解并同意：为了向你提供有效的服务，本软件会利用你终端设备的处理器和带宽等资源。
          本软件使用过程中可能产生数据流量的费用，用户需自行向运营商了解相关资费信息，
          并自行承担相关费用。

          <br>
          你理解并同意：使用本软件会收集你的设备的某些信息用于改善服务器和广大用户的使用体验
          （包含且不限于使用设备的处理器型号、内存、JAVA版本等信息
          <br>
          但本软件也会提供隐私设置以允许用户选择共享哪些敏感信息。

          <h3 style="margin-top: 8px;">免责声明</h3>
          本软件无意且不支持散布、分发盗版内容。
          <br>
          Minecraft 版权及相关商标、名称归 Mojang AB 所有，使用本软件产生的版权问题，
          软件制作方概不负责。请支持正版。
          <br>
          软件作者不对使用本软件(及被修改后的代码)造成的任何后果负责。

          <h3 style="margin-top: 8px;">开源</h3>
          本软件遵循 MIT 开源协议，并开源于
          <a @click="openProjectUrl" href="javascript:void(0)">
            https://github.com/Y2Nk4/lnr-town-updater
          </a>
          <br>
          你允许修改、重新编译、并分发修改后的代码或发行包，但你必须要包含源项目及作者的许可信息。

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="grey darken-1"
              text
              @click="isShowTOSDialog=false;"
          >
            不同意
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click="isShowTOSDialog=false;installInfo.agreedTOS=true;isShowPrivacyDialog=true"
          >
            同意
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 使用声明 -->
    <v-dialog
        v-model="isShowPrivacyDialog"
        persistent
        scrollable
        max-width="500">
      <v-card>
        <v-card-title class="headline">
          数据共享设置
        </v-card-title>
        <v-card-text>
          本软件有时会让用户提供分析、诊断和使用信息，以帮助改进本软件。本软件会以
          <span style="font-weight: bold">匿名*</span>
          的方式收集这类信息。
          <br>
          你可以选择提供所有、部分或不提供以下的信息。
          <span style="font-weight: bold">你可以在安装后重新设置以上隐私设置</span>

          <div>
            <v-checkbox
                v-model="installInfo.privacySettings.allowShareCrashReport"
                label="共享游戏崩溃信息"
                hide-details
            ></v-checkbox>
            <span>该部分数据用于分析游戏客户端崩溃原因，用于优化整合包。</span>
            <v-checkbox
                v-model="installInfo.privacySettings.allowShareNetworkInfo"
                label="共享部分网络使用信息"
                hide-details
            ></v-checkbox>
            <span>该部分数据包含且不限于用户的网络IP等信息，用于帮助LNR小镇改善在线游戏体验。</span>
            <v-checkbox
                v-model="installInfo.privacySettings.allowShareHardwareInfo"
                label="共享设备硬件使用信息"
                hide-details
            ></v-checkbox>
            <span>该部分数据仅用于统计用户设备信息，用于帮助LNR小镇在提供更新版本时提供参考。</span>
          </div>

          <span style="margin: 15px 0;display: block;">
            <span style="font-weight: bold">
              本软件不会共享您的 Minecraft / Mojang 账户信息或以上未说明的其他隐私数据
            </span>
            <br>
            在此后的迭代版本中若需要共享更多其他类型的数据，
            本软件会重新询问用户是否允许共享这些数据。
            <br>
            <span style="font-weight: bold">
              *匿名采集：
            </span>
            本软件在采集数据时不会共享用户的游戏名，并在共享其他必要信息时会做恰当的去敏操作以保证用户隐私
          </span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="isShowPrivacyDialog=false;installInfo.finishedPrivacySettings=true;installStep=1"
          >
            完成
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <LoadingDialog
        v-model="isShowLoadingDialog"
        :indeterminate="loadingIsIndeterminate"
        :progress="loadingProgress"
        :text="loadingText"
        :detail="loadingDetail"
    ></LoadingDialog>
  </div>
</template>

<script>
import env from '@/helpers/env'
import fileDialog from '@/helpers/fileDialog'
import { shell } from 'electron'
import LoadingDialog from '@/components/LoadingDialog.vue'
import { getBundleInfo } from '@/../api/bundleInfo'
import { searchAllVersions } from '@/../updater/fileVerification'

console.log(env)

export default {
  name: 'Install',
  components: { LoadingDialog },
  data () {
    return {
      isShowLoadingDialog: false,
      verifyingBundlePath: false,
      isShowTOSDialog: false,
      isShowPrivacyDialog: false,
      installStep: 0,
      loadingProgress: 0,
      loadingIsIndeterminate: false,
      installInfo: {
        localBundlePath: '',
        // -1: 未选择 0: 未安装 1: 已安装
        bundleExistenceState: -1,
        agreedTOS: false,
        finishedPrivacySettings: false,
        privacySettings: {
          allowShareNetworkInfo: true,
          allowShareCrashReport: true,
          allowShareHardwareInfo: true
        }
      },
      remoteServerInfo: {},
      loadingText: '',
      loadingDetail: ''
    }
  },

  methods: {
    openProjectUrl () {
      shell.openExternal('https://github.com/Y2Nk4/lnr-town-updater')
    },
    async selectBundlePath () {
      let result = await fileDialog()
      if (result && !result.canceled && result.filePaths && result.filePaths.length > 0) {
        this.$set(this.installInfo, 'localBundlePath', result.filePaths[0])
      }
    },

    skipFindingBundle () {
      this.$set(this.installInfo, 'bundleExistenceState', 0)
      this.$set(this.installInfo, 'localBundlePath', env.runningDir)
    },

    async verifyBundlePath () {
      this.remoteServerInfo = await getBundleInfo()

      if (this.installInfo.bundleExistenceState === 1) {
        return this.verifyExistBundle()
      } else {
        this.verifyingBundlePath = true
      }
    },

    updateLoadingText (title = null, detail = null) {
      if (title) this.loadingText = title
      if (detail) this.loadingDetail = detail
    },

    async verifyExistBundle () {
      this.isShowLoadingDialog = true
      this.loadingIsIndeterminate = true

      this.updateLoadingText('正在检查文件', '查找本地版本')

      setTimeout(async () => {
        let localVersions = await searchAllVersions(this.installInfo.localBundlePath)
        console.log(localVersions)
        if (localVersions && localVersions.length > 0) {
          this.updateLoadingText(null, `已找到: ${localVersions.join(',')}`)
        } else {
          this.updateLoadingText(null, `未找到游戏版本`)
        }
      }, 100)
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
