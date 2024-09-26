import { useState, useCallback } from 'react';
import { Image, StyleSheet, Platform, Button, FlatList, SafeAreaView } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SimpleImageCarousel from '@/components/SimpleImageCarousel';

import * as ImagePicker from 'expo-image-picker';

const Header = ({ images, onPressSelectImage }: { images: Array<string>, onPressSelectImage: () => void }) => {
  return (
    <ThemedView style={styles.headerContainer}>
      <SafeAreaView/>
      <SimpleImageCarousel images={images} onPressSelectImage={onPressSelectImage} />
    </ThemedView>
  )
}

export default function HomeScreen() {
  const [images, setImages] = useState<Array<string> | null>(null);

  const handleImageSelection = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUris = result.assets.reduce((accum, image) => {
        if (image.uri) {
          accum.push(image.uri)
        }
        return accum;
      }, [])
      return imageUris;
    }
  }

  const onPressSelectImage = async () => {
    const imageUris = await handleImageSelection();

    if (imageUris?.length) {
      setImages(imageUris);
    }
  };

  const onPressAddMoreImages = async () => {
    const imageUris = await handleImageSelection();

    if (imageUris?.length) {
      setImages(prevImages => [...prevImages, ...imageUris]);
    }
  };

  const onPressClearImages = async () => {
      setImages(null);
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Header images={images} onPressSelectImage={onPressSelectImage} />
      }>
      <ThemedView style={styles.contentContainer}>
        {images?.length ? (
          <>
          <Button title="Add more images" onPress={onPressAddMoreImages} />
          <Button title="Clear images" onPress={onPressClearImages} />
          </>
        ) : null}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
