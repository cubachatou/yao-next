import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Studio')
    .items([
      S.documentTypeListItem('homeSlider').title('Home Slider'),
      S.documentTypeListItem('work').title('Works'),
      S.documentTypeListItem('category').title('Categories'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['homeSlider', 'work', 'category'].includes(item.getId()!),
      ),
    ])
