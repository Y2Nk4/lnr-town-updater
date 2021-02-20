<template>
  <div>
    <div>
      <h2 class="main-title">
        {{ remoteServerInfo.bundleName }}
      </h2>
      <v-divider style="margin: 18px 18em;" />
    </div>

    <v-card class="properties-card">
      <v-list-item two-line>
        <v-list-item-icon class="properties-card__icon" v-if="!versionInfo.versionStatus">
          <v-icon>mdi-loading mdi-spin</v-icon>
        </v-list-item-icon>
        <v-list-item-icon class="properties-card__icon" v-else-if="versionInfo.versionStatus === 1">
          <v-icon class="success">mdi-check</v-icon>
        </v-list-item-icon>
        <v-list-item-icon class="properties-card__icon" v-else-if="versionInfo.versionStatus === 2">
          <v-icon class="fail">mdi-close</v-icon>
        </v-list-item-icon>
        <v-list-item-icon class="properties-card__icon" v-else-if="versionInfo.versionStatus === -1">
          <v-icon class="fail">mdi-close</v-icon>
        </v-list-item-icon>
        <v-list-item-icon class="properties-card__icon" v-else-if="versionInfo.versionStatus === 3">
          <v-icon class="warn">mdi-download-circle-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ versionTips[versionInfo.versionStatus || '0'] }}
          </v-list-item-title>
          <v-list-item-subtitle>
            本地版本: v{{ localVersion }}
            <span v-if="[2, 3].includes(versionInfo.versionStatus)">
              (最新版本: {{ remoteServerInfo.latestVersion }})
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item two-line link @click="selectBundlePath">
        <v-list-item-icon class="properties-card__icon" v-if="!versionInfo.versionStatus">
          <v-icon>mdi-loading mdi-spin</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            整合包路径
          </v-list-item-title>
          <v-list-item-subtitle>
            <span v-if="localVersionInfo && localVersionInfo.bundlePath">
              {{ localVersionInfo.bundlePath }}
            </span>
            <span v-else class="red--text text--darken-1">
              未选择
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>

      </v-list-item>
    </v-card>


  </div>
</template>

<script>
import config from '@/../config/config'
import workers from '@/../workers/index'
import { remote } from 'electron'
import fileDialog from '@/helpers/fileDialog'
import { getBundleInfo } from '@/../api/bundleInfo'

export default {
  name: 'Home',
  data () {
    return {
      config,
      localVersion: '1.0',
      remoteServerInfo: {},
      versionInfo: {},
      versionTips: {
        '-1': '未找到整合包，请选择下载或寻找已安装的整合包',
        '0': '加载中...',
        '1': '已经是最新版',
        '2': '需要更新才能游玩',
        '3': '有可更新的版本'
      },
      appPath: remote.app.getPath('exe'),
      localVersionInfo: {}
    }
  },
  methods: {
    async loadBundleInfo () {
      this.remoteServerInfo = await getBundleInfo()
    },
    async selectBundlePath () {
      /* let dir = true
      let inputObj = document.createElement('input')

      // 设置属性
      inputObj.setAttribute('id', '_ef')
      inputObj.setAttribute('type', 'file')
      inputObj.setAttribute('style', 'visibility:hidden')

      if (dir) { // 如果要选择路径，则添加以下两个属性
        inputObj.setAttribute('webkitdirectory', '')
        inputObj.setAttribute('directory', '')
        inputObj.setAttribute('accept', '.minecraft')
      }

      // 添加到DOM中

      document.body.appendChild(inputObj)

      // 添加事件监听器

      inputObj.addEventListener('change', (event) => {
        config.bundlePath = inputObj.files
        let fileList = inputObj.files
        if (fileList && fileList.length > 0) {
          config.bundlePath = fileList[0].path
        }
        console.log(fileList)
      })

      // 模拟点击

      inputObj.click() */
      let files = await fileDialog()
      if (files && files.length > 0) {
        this.$set(this.localVersionInfo, 'bundlePath', files[0])
        this.saveLocalConfig()
      }
    },
    async saveLocalConfig () {
      await workers.writeLocalConfig(this.localVersionInfo)
      this.$message.success('已保存')
    }
  },
  async mounted () {
    /* this.remoteServerInfo = await workers.fetch({
      url: 'https://mcupdater.lnr.moe/info/game.json',
      method: 'get',
      cache: 'no-cahce',
      headers: {
        'Cache-Control': 'no-cache'
      }
    }) */
    console.log(this.remoteServerInfo)

    workers.getLocalConfig()
      .then(config => {
        this.localVersionInfo = config

        this.loadBundleInfo()
      })
      .catch(async err => {
        if (err.message && err.message.indexOf('ENOENT') === 0) {
          /* this.$message.warning('未找到配置文件，已自动生成')
          await workers.writeLocalConfig({}) */

          this.$router.push({ name: 'install-page' })
        } else {
          this.$message.warning('加载配置文件遇到错误: ' + err.message)
        }
      })
  },
  watch: {
    remoteServerInfo (to, from) {
      this.versionInfo = {}
      if (this.localVersion === to.latestVersion) {
        // 最新版
        this.versionInfo.versionStatus = 1
      } else if (to.compatibleVersions &&
          to.compatibleVersions.includes &&
          to.compatibleVersions.includes(this.localVersion)) {
        // 可兼容运行
        this.versionInfo.versionStatus = 3
      } else {
        this.versionInfo.versionStatus = 2
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .properties-card{
    width: 400px;
    margin: 0 auto;

    .properties-card__icon{
      margin: auto 20px auto 0;

      i.v-icon{
        border-radius: 100%;

        &.success{
          color: #fff;
          background: #66BB6A;
        }
        &.fail{
          color: #fff;
          background: #E53935;
        }
        &.warn{
          color: #fff;
          background: #FFA726;
        }
      }
    }
  }

  h2.main-title {
    text-align: center;
    font-weight: 400;
  }
</style>
