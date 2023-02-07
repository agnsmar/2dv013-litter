const config = {
  overwrite: true,
  schema: 'src/graphql/schema.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers', 'typescript-operations'],
      config: {
        contextType: '../context#IContext'
      }
    }
  }
}

export default config
