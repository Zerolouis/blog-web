import type {ToastState} from "~/ts/interface/stores.interface";

export const useToastStore = defineStore('toastStore', {
  state: (): ToastState => {
    return {
      msg: '',
      color: 'info',
      visible: false,
      showClose: true,
      timeout: 5000,
      debounceTimer: null
    }
  },
  actions: {
    /**
     * 显示通知
     * @param options 参数
     */
    open (options: ToastState) {
      if (import.meta.client){
        this.msg = options.msg
        if (options?.color) {
          this.color = options.color
        }
        if (options?.timeout) {
          this.timeout = options.timeout
        }
        this.visible = true
        // 防抖
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer)
        }
        this.debounceTimer = setTimeout(() => {
          this.visible = false
        }, this.timeout)
      }
    },
    /**
     * 成功通知
     * @param msg 消息
     */
    success (msg: string = '成功') {
      this.open({
        msg,
        color: 'success'
      })
    },
    /**
     * 错误通知
     * @param msg 消息
     */
    error (msg: string = '发生错误') {
      this.open({
        msg,
        color: 'error'
      })
    },
    /**
     * info通知
     * @param msg 消息
     */
    info (msg: string = '提示') {
      this.open({
        msg,
        color: 'info'
      })
    },
    /**
     * 警告通知
     * @param msg 消息
     */
    warning (msg: string = '提示') {
      this.open({
        msg,
        color: 'warning'
      })
    }
  }
})
