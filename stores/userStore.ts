import type {UserState} from "~/ts/interface/stores.interface";
import { stringify, parse } from 'zipson';
import type {Ref} from "vue";

export const useUserStore = defineStore('userStore',()=>{
  const user:UserState = reactive({
    accessToken: "123",
    isLogin: false,
    refreshToken: "123123123",
    userInfo: {
      id: '123123',
      name: 'Zerolouis',
      nickname: 'Zerolouis',
      avatar: "https://img.home.zeroh.top:12443/i/2024/11/16/94219763_p0-6738317874562.jpg"
    }
  })

  

  const test: Ref<string> = ref('set')

  return {user,test}
},{
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
    serializer:{
      deserialize: parse,
      serialize: stringify
    }
  }
})
