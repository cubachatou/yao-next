import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const workType = defineType({
    name: 'work',
    title: 'Work',
    type: 'document',
    icon: DocumentTextIcon,
    fields: [
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
                        defineField({
                            name: 'isMain',
                            type: 'boolean',
                            title: 'Main Image',
                            description: 'Mark this image as the main image for this work',
                            initialValue: false,
                        })
                    ]
                })
            ],
            validation: (Rule) => Rule.custom((images: any[]) => {
                if (!images || images.length === 0) {
                    return 'At least one image is required'
                }
                const mainImages = images.filter(img => img.isMain)
                if (mainImages.length > 1) {
                    return 'Only one image can be marked as main'
                }
                return true
            })
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
            const { title, images } = selection
            // Find the main image or use the first image
            const mainImage = images?.find((img: any) => img.isMain) || images?.[0]
            return {
                title,
                media: mainImage,
            }
        },
    },
})
