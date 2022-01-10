exports.options = {
    routePrefix: '/docs',
    exposeRoute: true,
    hideUntagged: true,
    swagger: {
        info: {
            title: 'DscJobs Internal API Docs',
            description: 'Internal Documentation for the DscJobs API',
            version: '1.0.0'
        },
        externalDocs: {
            url: 'https://docs.dscjobs.org',
            descripiton: 'External Documentation for the DscJobs API',
        },
        host: 'api.dscjobs.org',
        schemes: ['https'],
        consumes: ['application/json'],
        produces: ['application/json'],
    }
}