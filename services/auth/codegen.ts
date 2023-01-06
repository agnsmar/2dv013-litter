import type { CodegenConfig } from '@graphql-codegen/cli'

const config = {
  overwrite: true,
  schema: 'src/graphql/schema.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../context#Context'
      }
    }
  }
}

export default config
