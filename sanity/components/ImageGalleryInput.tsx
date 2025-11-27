'use client';

import { Box, Grid, Card, Stack, Text, Button } from '@sanity/ui';
import { TrashIcon } from '@sanity/icons';
import { ArrayOfObjectsInputProps, ObjectItem, useClient } from 'sanity';
import imageUrlBuilder from '@sanity/image-url';
import { useCallback } from 'react';

interface ImageItem extends ObjectItem {
  asset?: {
    _ref: string;
    _type: string;
  };
  alt?: string;
}

export function ImageGalleryInput(props: ArrayOfObjectsInputProps) {
  const { value, onChange, renderDefault, schemaType } = props;
  const client = useClient({ apiVersion: '2024-01-01' });
  const builder = imageUrlBuilder(client);

  const getImageUrl = useCallback(
    (item: ImageItem) => {
      if (!item?.asset?._ref) return null;
      return builder.image(item.asset).width(300).height(300).fit('crop').url();
    },
    [builder]
  );

  const handleRemove = useCallback(
    (index: number) => {
      const newValue = [...(value || [])];
      newValue.splice(index, 1);
      onChange({
        type: 'set',
        path: [],
        value: newValue,
      } as any);
    },
    [value, onChange]
  );

  const images = (value || []) as ImageItem[];

  return (
    <Stack space={4}>
      {/* Large preview grid */}
      {images.length > 0 && (
        <Grid columns={[1, 2, 3]} gap={3}>
          {images.map((item, index) => {
            const imageUrl = getImageUrl(item);
            return (
              <Card key={item._key} padding={2} radius={2} shadow={1} style={{ position: 'relative' }}>
                {imageUrl ? (
                  <Box style={{ position: 'relative' }}>
                    <img
                      src={imageUrl}
                      alt={item.alt || 'Image preview'}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        display: 'block',
                      }}
                    />
                    <Box
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                      }}
                    >
                      <Button
                        icon={TrashIcon}
                        mode="ghost"
                        tone="critical"
                        onClick={() => handleRemove(index)}
                        style={{
                          background: 'rgba(0,0,0,0.6)',
                          borderRadius: '4px',
                        }}
                      />
                    </Box>
                    {item.alt && (
                      <Box padding={2}>
                        <Text size={1} muted>
                          {item.alt}
                        </Text>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box
                    style={{
                      width: '100%',
                      height: '200px',
                      background: '#1a1a1a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px',
                    }}
                  >
                    <Text muted>No image</Text>
                  </Box>
                )}
              </Card>
            );
          })}
        </Grid>
      )}

      {/* Default input for adding/managing images */}
      <Box>{renderDefault(props)}</Box>
    </Stack>
  );
}
