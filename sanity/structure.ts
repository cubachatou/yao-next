import type { StructureResolver } from 'sanity/structure';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Studio')
    .items([
      S.documentTypeListItem('homeSlider').title('Home Slider'),
      orderableDocumentListDeskItem({ type: 'work', S, context, title: 'Works' }),
      S.documentTypeListItem('category').title('Categories'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        item => item.getId() && !['homeSlider', 'work', 'category'].includes(item.getId()!)
      ),
    ]);
