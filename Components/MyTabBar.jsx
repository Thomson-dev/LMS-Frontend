import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';

const TabBar = ({ state, descriptors, navigation }) => {
  const primaryColor = '#0000FF';
  const greyColor = '#737373';

  // Update mapping keys to match your route names
  const tabIcons = {
    HomeScreen: { icon: 'home', lib: AntDesign },
    CourseScreen: { icon: 'book', lib: Feather },
    SearchScreen: { icon: 'search', lib: Feather },
    ProfileScreen: { icon: 'user', lib: Feather },
  };

  // Fallback icon if mapping is missing.
  const defaultIcon = { icon: 'alert-circle', lib: Feather };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };


        // Extract icon config with fallback.
        const { icon, lib: IconComponent } = tabIcons[route.name] || defaultIcon;

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            {IconComponent && (
              <IconComponent
                name={icon}
                size={24}
                color={isFocused ? primaryColor : greyColor}
              />
            )}
           
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabBar;
