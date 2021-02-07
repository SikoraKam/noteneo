import React, { useMemo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface ListPlaceholderProps {
  placeholderCount: number;
  itemHeight?: number;
  itemWidth?: number;
}

export const ListPlaceholder: React.FC<ListPlaceholderProps> = ({
  placeholderCount,
  itemHeight,
  itemWidth,
}) => {
  const placeholderWidth = useWindowDimensions().width - 40;

  const placeholderList = useMemo(() => {
    return [...Array(placeholderCount)].map((_, index) => (
      <View key={index}>
        <SkeletonPlaceholder.Item
          width={itemWidth ?? placeholderWidth}
          height={itemHeight ?? 50}
          paddingVertical={12}
          borderRadius={20}
          marginVertical={8}
        />
      </View>
    ));
  }, [itemHeight, itemWidth, placeholderCount, placeholderWidth]);

  return (
    <SkeletonPlaceholder>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {placeholderList}
      </View>
    </SkeletonPlaceholder>
  );
};
