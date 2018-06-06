import DataStore from './db'

class Article {
    constructor (record = DataStore.newBlankRecord()) {
        this.record = record
        Object.assign(this, DataStore.deserialize(record))
    }

    isModified () {
        let record = DataStore.serialize(this)
        return record.hash != this.record.hash
    }

    get orign () {
        return new Article(this.record)
    }

    static browse (params = {}) {
        return DataStore.list(params).then((list) => {
            return {results: list}
        })
    }

    static load (id) {
        return DataStore.get(id).then((record) => {
            return new Article(record)
        })
    }

    static save (article) {
        let record = DataStore.serialize(article)

        if (record.hash == article.record.hash) {
            return Promise.resolve()
        }

        return DataStore.findAndUpsert(record)
    }

    static remove (idSets) {
        return DataStore.remove(idSets)
    }
}

export default Article
