module.exports = {
    plugins: {
        timestamps: true,
        versions: true,
        elasticSearch: false,
        softDelete: true,
        autoPopulate: true,
        rollback: true,
        timestamps_fields: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    },
    connection: {
        url: 'mongodb://localhost:27017/neev_client',
        elasticSearchHosts: ['localhost:9200']
    }
}