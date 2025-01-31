import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const bannerData = [
  {
    bannerImageUrl: { uri: 'https://img.freepik.com/premium-photo/elearning-video-lesson-concept-with-student-holding-book-front-virtual-screen-selecte_820340-53272.jpg?w=1060' },
  },
  {
    bannerImageUrl: { uri: 'https://img.freepik.com/premium-photo/elearning-video-lesson-concept-with-student-holding-book-front-virtual-screen-selecte_820340-53272.jpg?w=1060' },
  },
  {
    bannerImageUrl: { uri: 'https://img.freepik.com/premium-photo/elearning-video-lesson-concept-with-student-holding-book-front-virtual-screen-selecte_820340-53272.jpg?w=1060' },
  },
];

export default function HomeBannerSlide() {
  return (
    <View className = 'mt-4 flex-1 mx-5' >
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={5}
      >
        {bannerData.map((item, index) => (
          <View key={index}>
            <Image
              source={item.bannerImageUrl}
              style={{ width: 400, height: 200 }}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {},
  slide: {
  
  },
});