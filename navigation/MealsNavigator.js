import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform, Text, LogBox } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'; 
import { createDrawerNavigator } from 'react-navigation-drawer';

import CategoriesScreen from '../screens/mealsScreen/CategoriesScreen';
import CategoryMealsScreen from '../screens/mealsScreen/CategoryMealScreen';
import MealDetailScreen from '../screens/mealsScreen/MealDetailScreen'; 
import FavoritesScreen from '../screens/mealsScreen/FavoritesScreen';
import FiltersScreen from '../screens/mealsScreen/FiltersSreen';
import colors from '../constants/color'; 
import color from '../constants/color';

// LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
    "The global \"__expo\" and \"Expo\" objects will be removed in SDK 41. Learn more about how to fix this warning: https://expo.fyi/deprecated-globals",
  ]);

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : colors.primaryColor
}


const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetail:  {
        screen: MealDetailScreen,
        // navigationOptions: {
        //     headerTitle: 'Detail',
        // }
    },
},
{
    mode: 'modal',
    // initialRouteName: 'MealsDetail',
    defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
})

const tabScreenConfig = {
    Meals: {screen: MealsNavigator, navigationOptions: {
        tabBarIcon: (tabInfo) => {
            return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
        },
        tabBarColor: colors.primaryColor,
        tabBarLabel: <Text style={{fontFamily: 'open-sans-bold'}}>Meal</Text>
    }},
    Favorites: { screen: FavNavigator, navigationOptions: {
        tabBarLabel: 'Favorites...',
        tabBarIcon: (tabInfo) => {
            return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
        },
        tabBarColor: colors.accentColor,
        tabBarLabel: <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text>
        
    }}

} 


const MealsFavTabNavigator = Platform.OS === 'android' 
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
            activeColor: 'white',
            shifting: true, 
            barStyle: {
                backgroundColor: colors.primaryColor
            }
        })
        : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        labelStyle: {
            fontFamily: 'open-sans'
        },
        activeTintColor: colors.accentColor,
        navigationOptions: {
            tabBarVisible: true
        }
    }
});

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen 
    },  
    { 
        navigationOptions: {
            drawerLabel: 'Filters !!!!'
        },
        defaultNavigationOptions: defaultStackNavOptions
    });

const MainNavigator = createDrawerNavigator({
    MealsFavs: {screen: MealsFavTabNavigator, 
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: FiltersNavigator
},{
    contentOptions: {
        activeTintColor: color.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
  });

export default createAppContainer(MainNavigator);