const config = {
  overwrite: true,
  schema: 'src/graphql/schema.graphql',
  documents: './src/**/*.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typed-document-node', 'typescript-resolvers', 'typescript-operations'],
      config: {
        contextType: '../context#IContext'
      }
    }
  }
}

export default config
