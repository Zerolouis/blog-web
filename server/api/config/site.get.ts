import type {ArticleCardInfo} from "~/ts/interface/home.interface";

export default defineEventHandler(async () => {

  const demo: Array<ArticleCardInfo> = [{
    id: '1',
    title: '文章标题',
    description: '文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述',
    account: 'Zerolouis',
    image: 'https://img.home.zeroh.top:12443/i/2024/11/15/fog-4436636-673637e8d717a.jpg',
    upload: '2024-11-15T16:00:00.000Z',
    comment: 0
  },{
    id: '2',
    title: '文章标题',
    description: '文章描述',
    account: 'Zerolouis',
    image: 'https://img.home.zeroh.top:12443/i/2024/11/15/fog-4436636-673637e8d717a.jpg',
    upload: '2018-04-04T16:00:00.000Z',
    comment: 0
  },{
    id: '3',
    title: '文章标题',
    description: '文章描述',
    account: 'Zerolouis',
    image: 'https://img.home.zeroh.top:12443/i/2024/11/15/fog-4436636-673637e8d717a.jpg',
    upload: '2018-04-04T16:00:00.000Z',
    comment: 0
  },{
    id: '4',
    title: '文章标题',
    description: '文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述',
    account: 'Zerolouis',
    image: 'https://img.home.zeroh.top:12443/i/2024/11/15/fog-4436636-673637e8d717a.jpg',
    upload: '2018-04-04T16:00:00.000Z',
    comment: 0
  },{
    id: '5',
    title: '文章标题',
    description: '文章描述',
    account: 'Zerolouis',
    image: 'https://img.home.zeroh.top:12443/i/2024/11/15/fog-4436636-673637e8d717a.jpg',
    upload: '2018-04-04T16:00:00.000Z',
    comment: 0
  }]

  return demo;
})
