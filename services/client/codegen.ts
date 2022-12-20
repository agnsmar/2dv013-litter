import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost/graphql',
  documents: 'src/graphql/**/*.graphql',
  generates: {
    'src/generated/': {
      preset: 'client',
      plugins: ['typescript-react-apollo', 'typescript', 'typescript-operations']
    }
  }
}

export default config
