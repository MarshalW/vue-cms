export function read () {
    //const picked = (({ a, c }) => ({ a, c }))(object)
    let list = []
    articles.forEach((article) => {
        list.push((({id, title}) => ({id, title}))(article))
    })
    return list
}