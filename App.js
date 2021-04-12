import React, {useState} from 'react';
import {View , Text, StyleSheet, LogBox } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import MealsNavigator from './navigation/MealsNavigator';

import { createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import mealsReducer from './store/reducers/meals';

import {enableScreens} from 'react-native-screens'

enableScreens();

// LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
    "The global \"__expo\" and \"Expo\" objects will be removed in SDK 41. Learn more about how to fix this warning: https://expo.fyi/deprecated-globals",
  ]);

const rootReducer = combineReducers({
    meals: mealsReducer
})

const store = createStore(rootReducer);

const fetchFonts = async () => {
    await  Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    })
}  


export default function App () {

    const [fontLoaded, setfontLoaded] = useState(false);

    if(!fontLoaded) {
        return (
             <AppLoading 
            startAsync={fetchFonts} 
            onFinish={() => setfontLoaded(true)}
            onError={(err) => console.log(err)}
             />
             )
    }
 

    return( 
       <Provider store={store}> 
            <MealsNavigator />
       </Provider>
    )
}