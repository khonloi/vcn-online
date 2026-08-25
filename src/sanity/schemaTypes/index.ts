import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { category } from './category'
import { article } from './article'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, category, article],
}
