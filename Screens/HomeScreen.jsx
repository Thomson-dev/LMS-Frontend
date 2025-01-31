import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Home/Header'
import SearchInput from '../Components/Home/SearchInput'
import HomeBannerSlider from '../Components/Home/HomeBannerSlide'


const HomeScreen = () => {
  return (
    <View className = 'flex-1'  >
     <Header/>
     <SearchInput/>
     <HomeBannerSlider/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})