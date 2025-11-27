'use client';

import { Box, Flex, Text } from '@sanity/ui';
import { useClient, type PreviewProps } from 'sanity';
import imageUrlBuilder from '@sanity/image-url';

interface WorkPreviewProps extends PreviewProps {
  images?: Array<{
    _key: string;
    asset?: {
      _ref: string;
    };
  }>;
}

export function WorkPreview(props: WorkPreviewProps) {
  const { title, images } = props;
  const client = useClient({ apiVersion: '2024-01-01' });
  const builder = imageUrlBuilder(client);

  const firstImage = images?.[0];
  const imageUrl = firstImage?.asset?._ref
    ? builder.image(firstImage.asset).width(120).height(120).fit('crop').url()
    : null;

  return (
    <Flex align="center" gap={3} padding={2}>
      <Box
        style={{
          width: '80px',
          height: '80px',
          flexShrink: 0,
          borderRadius: '4px',
          overflow: 'hidden',
          background: '#1a1a1a',
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={typeof title === 'string' ? title : 'Work preview'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Flex align="center" justify="center" style={{ width: '100%', height: '100%' }}>
            <Text size={0} muted>
              No image
            </Text>
          </Flex>
        )}
      </Box>
      <Text size={2} weight="medium">
        {typeof title === 'string' ? title : 'Untitled'}
      </Text>
    </Flex>
  );
}
