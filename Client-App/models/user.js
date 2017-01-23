module.exports = {
    name: 'users',
    schema: {
        name: String,
        age: Number
    },
    plugins: {
        elasticSearch: false
    }
}