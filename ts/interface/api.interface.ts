
import {z} from 'zod'
import type {ArticleDetailInfo} from "~/ts/interface/home.interface";
import type {CommonMessage} from "~/ts/types/api.type";

export interface SiteConfig {
    siteName: string
}

export const errorMessage:CommonMessage ={
    code: '404',
    msg: '后端连接错误',
    data: undefined
}


export type ArticleGet = ArticleDetailInfo
