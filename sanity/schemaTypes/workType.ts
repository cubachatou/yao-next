import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { ImageGalleryInput } from '../components/ImageGalleryInput';
import { WorkPreview } from '../components/WorkPreview';

export const workType = defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'orderRank',
      type: 'string',
      title: 'Order Rank',
      hidden: true,
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
      hidden: true,
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
          ],
        }),
      ],
      validation: Rule => Rule.min(1).error('At least one image is required'),
      components: {
        input: ImageGalleryInput,
      },
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images',
    },
    prepare(selection) {
      const { title, images } = selection;
      return {
        title,
        media: images?.[0],
        images,
      };
    },
  },
  components: {
    preview: WorkPreview,
  },
});
