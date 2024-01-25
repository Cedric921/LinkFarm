export default {
  path: __dirname + '../',
  title: 'ETIC',
  version: '2.0',
  tagIndex: 2,
  ignore: ['/swagger', '/docs', '/v1', '/'],
  common: {
    parameters: {
      sortable: [
        {
          in: 'query',
          name: 'sortBy',
          schema: { type: 'string', example: 'created_at' },
        },
        {
          in: 'query',
          name: 'sortType',
          schema: { type: 'string', example: 'ASC' },
        },
      ],
    },
    headers: {
      paginated: {
        'X-Total-Pages': {
          description: 'Total amount of pages',
          schema: { type: 'integer', example: 5 },
        },
        'X-Total': {
          description: 'Total amount of results',
          schema: { type: 'integer', example: 100 },
        },
        'X-Per-Page': {
          description: 'Results per page',
          schema: { type: 'integer', example: 20 },
        },
      },
    },
  },
}
