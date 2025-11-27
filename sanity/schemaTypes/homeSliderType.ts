import { ImagesIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const homeSliderType = defineType({
    name: 'homeSlider',
    title: 'Home Slider',
    type: 'document',
    icon: ImagesIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Slider Title',
            description: 'Internal title for this slider configuration',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'works',
            type: 'array',
            title: 'Selected Works',
            description: 'Select works to display in the home slider',
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: [{ type: 'work' }],
                })
            ],
            validation: (Rule) => Rule.required().min(1).max(7).warning('Recommended: 3-6 works for optimal slider performance'),
        }),
        defineField({
            name: 'isActive',
            type: 'boolean',
            title: 'Active Slider',
            description: 'Only one slider should be active at a time',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            works: 'works',
            isActive: 'isActive',
        },
        prepare(selection) {
            const { title, works, isActive } = selection
            const workCount = works?.length || 0
            return {
                title: title,
                subtitle: `${workCount} work${workCount !== 1 ? 's' : ''} ${isActive ? '(Active)' : '(Inactive)'}`,
                media: ImagesIcon,
            }
        },
    },
})
