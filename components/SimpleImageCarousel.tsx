import { useCallback } from 'react';
import { Image, StyleSheet, Button, FlatList, Dimensions } from 'react-native';

import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');

export const CAROUSEL_IMAGE_WIDTH = width;
export const CAROUSEL_IMAGE_HEIGHT = 250;

const EmptyListComponent = ({ onPressSelectImage }: {onPressSelectImage: () => void}) => (
	<ThemedView style={styles.emptyContainer}>
		<Button title="Select an image" onPress={onPressSelectImage} />
	  </ThemedView>
)

const SimpleImageCarousel = ({ images, onPressSelectImage }: {images: Array<string>; onPressSelectImage: () => void}) => {
	const renderItem = useCallback(({ item }) => (
		<Image
		  source={{ uri: item }}
		  style={styles.image}
		/>
	), [])

	const keyExtractor = useCallback((item) => item + Math.random(), []);

	const renderEmptyListItem = useCallback(() => (
		<EmptyListComponent onPressSelectImage={onPressSelectImage} />
	), [])

	const getItemLayout = useCallback(
		(_, index) => ({
		  index,
		  length: CAROUSEL_IMAGE_WIDTH,
		  length: CAROUSEL_IMAGE_WIDTH,
		  offset: index * CAROUSEL_IMAGE_WIDTH,
		  offset: index * CAROUSEL_IMAGE_WIDTH,
		}),
		[]
	  )

	return (
	  <FlatList
		data={images}
		renderItem={renderItem}
		keyExtractor={keyExtractor}
		horizontal
		ListEmptyComponent={renderEmptyListItem}
		pagingEnabled
		getItemLayout={getItemLayout}
	  />
	)
  }

  const styles = StyleSheet.create({
	emptyContainer: {
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	image: {
	  height: CAROUSEL_IMAGE_HEIGHT,
	  width: CAROUSEL_IMAGE_WIDTH,
	},
  });

  export default SimpleImageCarousel;