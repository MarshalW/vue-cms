import uuid from 'uuid/v4'
import md5 from 'js-md5'

const DELAY = 800

class DataStore {

    static newBlankRecord () {
        let record = {_id: null, title: '', text: [], images: [], contentIndex: []}
        record.hash = hashIt(record)
        return record
    }

    static list (params) {
        return new Promise(function (resolve) {
            let list = []

            let records = getRecords(params)
            records.forEach(record => {
                list.push((({_id: id, title}) => ({id, title}))(record))
            })

            setTimeout(resolve, DELAY, list)
        })
    }

    static get (id) {
        // TODO 当id没有对应记录时报错
        return new Promise(function (resolve) {
            let record = RECORDS.find(record => {
                return id == record._id
            })

            if (record) {
                record = JSON.parse(JSON.stringify(record))
            }

            setTimeout(resolve, DELAY, record)
        })
    }

    static remove (ids) {
        let deleteIndex = []
        RECORDS.forEach((record, index) => {
            if (ids.has(record._id)) {
                deleteIndex.push(index)
            }
        })

        deleteIndex.forEach((i) => {
            RECORDS.splice(i, 1);
        })

        return new Promise(function (resolve) {
            setTimeout(resolve, DELAY, {})
        })
    }

    static findAndUpsert (record) {
        if (!record._id) {
            record._id = uuid()
            RECORDS.push(record)
        } else {
            RECORDS.forEach((_record, index) => {
                if (_record._id == record._id) {
                    RECORDS[index] = record
                }
            })
        }

        return new Promise(function (resolve) {
            setTimeout(resolve, DELAY, {_id: record._id})
        })
    }

    static serialize (article) {
        let {id: _id, title} = article
        let record = {_id, title, text: [], images: [], contentIndex: []}
        let textCount = 0

        article.components.image.forEach(item => {
            let {src, height} = item
            record.images.push([src, height])
        })

        article.contentItems.forEach(item => {
            if (item.type == 'text') {
                record.text.push(item.text)
                record.contentIndex.push(['t', textCount++])
            }

            if (item.type == 'image') {
                if (article.components.image.indexOf(item) < 0) {
                    throw 'error image item! '
                }
                record.contentIndex.push(['i', article.components.image.indexOf(item)])
            }
        })

        record.hash = hashIt(record)

        return record

    }

    static deserialize (record) {
        let {_id: id, title, contentIndex} = record

        let components = {
            image: []
        }

        record.images.forEach(imageItem => {
            let [src, height] = imageItem
            let imageComponent = {
                type: 'image',
                src,
                height,
            }

            components.image.push(imageComponent)
        })

        let contentItems = []

        contentIndex.forEach(indexItem => {

            let [type, index] = indexItem

            switch (type) {
                case "t": {
                    let component = {
                        type: 'text',
                        text: record.text[index]
                    }
                    contentItems.push(component)
                    break
                }
                case 'i': {
                    contentItems.push(components.image[index])
                    break
                }
                default:
                    throw `-->> do not support type: ${type}`
            }
        })

        return {
            id,
            title,
            components,
            contentItems,
        }
    }
}

function getRecords (params = {}) {
    !params
    return JSON.parse(JSON.stringify(RECORDS))

}

const RECORDS = [
    {
        _id: uuid(),
        title: '特朗普出尔反尔，但美能打的牌并不多',
        text: [
            '特朗普又翻脸了，本质上来说，这在意料之外，又在..',
            '需要对比的是特朗普在北京以及华盛顿两次谈判之后的表现：美国贸易摩擦7人天团来北京的时候，..',
            '华盛顿谈完之后，中方认为贸易战结束了，美方务实派说暂停，但..'
        ],
        images: [
            ['a.jpg', '140px'],
            ['b.png', '100px']
        ],
        contentIndex: [
            ['t', 0],
            ['i', 0],
            ['t', 1],
            ['t', 2],
        ]
    },
    {
        _id: uuid(),
        title: '美国制裁手段花样繁多，哪种最难规避？',
        text: [
            '美国盟友这份工作真心不好做。',
            '在和中国达成脆弱的贸易和平之后，特朗普立刻就对..',
            '如果再加上之前被钢铁关税打击的日本，修改北美自由贸易协定中被针对的加拿大和墨西哥，退出伊朗核协议之后凉凉的欧盟..',
            '虽然美国一直是最喜欢利用经济制裁来达到自己目的的国家，但是以往其制裁目标大都是一些敌对国家..',
        ],
        images: [],
        contentIndex: [
            ['t', 0],
            ['t', 1],
            ['t', 2],
            ['t', 3],
        ]
    },
    {
        _id: uuid(),
        title: '发危害社会公德内容 B站所属公司被罚2万',
        text: [
            '全国扫黄打非办公室“护苗2018”行动今日（30日）公布新一批9起案件..',
            '据悉，哔哩哔哩弹幕网自2017年5月12日起登载《安娜学姐ed正确打开方式》《模拟外科医生》《小猪佩奇鬼畜》..',
        ],
        images: [],
        contentIndex: [
            ['t', 0],
            ['t', 1],
        ]
    },
    {
        _id: uuid(),
        title: '俄籍反俄政府记者在基辅被枪杀 又成罗生门',
        text: [
            '俄罗斯公民、目前居住在乌克兰首都基辅的反俄政府记者阿卡迪•巴布琴科(Arkadiy Babchenko)当地时间..',
        ],
        images: [],
        contentIndex: [
            ['t', 0],
        ]
    },
]

function hashIt (record) {
    let content = ''
    content += record.title

    record.contentIndex.forEach(item => {
        switch (item[0]) {
            case 't': {
                content += record.text[item[1]]
                break
            }
            case 'i': {
                let imageArray = record.images[item[1]]
                content += imageArray[0] + imageArray[1]
                break
            }
            default:
                throw `do not support type: ${item[0]}`
        }
    })

    content += JSON.stringify(record.images)

    return md5(content)
}

RECORDS.forEach(record => {
    record.hash = hashIt(record)
})

export default DataStore