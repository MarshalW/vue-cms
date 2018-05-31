// 模拟的文章列表

export default {}

window.articles = [
    {
        id: 1,
        title: '特朗普出尔反尔，但美能打的牌并不多',
        contentItems: [
            {
                type: 'textComponent',
                data: {
                    text: '特朗普又翻脸了，本质上来说，这在意料之外，又在..'
                }
            },
            {
                type: 'textComponent',
                data: {
                    text: '需要对比的是特朗普在北京以及华盛顿两次谈判之后的表现：美国贸易摩擦7人天团来北京的时候，..'
                }
            },
            {
                type: 'textComponent',
                data: {
                    text: '华盛顿谈完之后，中方认为贸易战结束了，美方务实派说暂停，但..'
                }
            },
        ],
        components: {
            imageComponents: [
                {
                    type: 'imageComponent',
                    data: {
                        imgSrc: 'a.jpg',
                        height: '140px'
                    }
                },
                {
                    type: 'imageComponent',
                    data: {
                        imgSrc: 'b.png',
                        height: '100px'
                    }
                },
            ],
        }
    },
    {
        id: 4,
        title: '美国制裁手段花样繁多，哪种最难规避？',
        contentItems: [
            {
                type: 'textComponent',
                data: {
                    text: '美国盟友这份工作真心不好做。'
                }
            },
            {
                type: 'textComponent',
                data: {
                    text: '在和中国达成脆弱的贸易和平之后，特朗普立刻就对..'
                }
            },
            {
                type: 'textComponent',
                data: {
                    text: '如果再加上之前被钢铁关税打击的日本，修改北美自由贸易协定中被针对的加拿大和墨西哥，退出伊朗核协议之后凉凉的欧盟..'
                }
            },
            {
                type: 'textComponent',
                data: {
                    text: '虽然美国一直是最喜欢利用经济制裁来达到自己目的的国家，但是以往其制裁目标大都是一些敌对国家..'
                }
            },
        ],
        components: {
            imageComponents: [],
        }
    },
    {
        id: 13,
        title: '发危害社会公德内容 B站所属公司被罚2万',
        contentItems: [
            {
                type: 'textComponent',
                data: {
                    text: '全国扫黄打非办公室“护苗2018”行动今日（30日）公布新一批9起案件..'
                }
            },
            {
                type: 'textComponent',
                data: {
                    text: '据悉，哔哩哔哩弹幕网自2017年5月12日起登载《安娜学姐ed正确打开方式》《模拟外科医生》《小猪佩奇鬼畜》..'
                }
            },
        ],
        components: {
            imageComponents: [],
        }
    },
    {
        id: 24,
        title: '俄籍反俄政府记者在基辅被枪杀 又成罗生门',
        contentItems: [
            {
                type: 'textComponent',
                data: {
                    text: '俄罗斯公民、目前居住在乌克兰首都基辅的反俄政府记者阿卡迪•巴布琴科(Arkadiy Babchenko)当地时间..'
                }
            },
        ],
        components: {
            imageComponents: [],
        }
    },
]