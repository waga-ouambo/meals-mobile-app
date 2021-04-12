import React, {useState} from 'react';
import {StyleSheet, Text, View } from 'react-native';
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import * as Font from 'expo-font';
import  AppLoading  from 'expo-app-loading';

const fetchFonts = async () =>{
   await Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
   });
};

export default function  App(){
   const [userNumber, setUserNumber] = useState();
   const [dataLoaded, setDataLoaded] = useState(false);

   if(!dataLoaded){
      return <AppLoading 
      startAsync={fetchFonts} 
      onFinish={() => setDataLoaded(true)} 
      onError={(err) => console.log(err)}
      />;
   }

   const startGameHandler = selectedNumber => {
      setUserNumber(selectedNumber) ;
   }

   let content = <StartGameScreen onStartGame={startGameHandler}/>;
   if(userNumber){
      content = <GameScreen userChoice={userNumber}/>
   }
   return(
    <View style={styles.screen}>
            <Header title='Guess a Number'/> 
           {content}
    </View>
   );
}



const styles = StyleSheet.create({
     screen: {
         flex: 1
     }
  });