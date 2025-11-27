import { type SchemaTypeDefinition } from 'sanity'

import {categoryType} from './categoryType'
import {workType} from './workType'
import {homeSliderType} from './homeSliderType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, workType, homeSliderType],
}
