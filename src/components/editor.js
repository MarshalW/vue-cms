export class Article {
    constructor (params = {id: null, contentItems: [], components: {imageComponents: []}}) {
        Object.assign(this, params)
    }
}

export function clone (article) {
    return new Article(JSON.parse(JSON.stringify(article)))
}

export function read (id) {
    return new Promise(function (resolve) {
        let article = articles.find((item) => {
            return item.id == id
        })
        article = clone(article)

        setTimeout(resolve, 1000, article)
    })
}

export function save (article) {
    return new Promise(function (resolve) {
        //更新
        if (article.id) {
            articles.forEach((item, i) => {
                if (item.id == article.id) {
                    articles[i] = article
                }

            })
        } else { // 新建
            let id = -1
            articles.forEach(item => {
                if (id < item.id) {
                    id = item.id + 1
                }
            })
            article.id = id
            articles.push(article)
        }

        setTimeout(resolve, 1000)
    })
}