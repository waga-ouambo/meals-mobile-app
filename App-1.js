import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import GoalIput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [outputText, setOutputText] = useState('Open upa App.js to start working on your app!'); 
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  

  const onGoalHandler= (enteredGoal) => { 
    if( enteredGoal.trim() !== ''){
        setCourseGoals(previousCourseGoals => 
          [...previousCourseGoals, {id: Math.random().toString(), value: enteredGoal}]
          );
        setIsAddMode(false)
        console.log(courseGoals); 
     }
  }

  const onDeleteGoalHandler= (goalId) => { 
    setCourseGoals(previousCourseGoals => {return previousCourseGoals.filter((courseGoal) => courseGoal.id !== goalId); }
      ); 
  }

  const onCancelModal= () => { 
    setIsAddMode(false)
  }

  return (
    // <View style={styles.container}>
    //   <Text style={styles.text}>{outputText}</Text>
    //   <StatusBar style="auto" />
    //   <View></View>
    //   <Button onPress={() => setOutputText('The text changed !!')} title="Change text"/>
    // </View>
  
    <View style={styles.screen}>
      <Button title='Add a new Goal' onPress={() => setIsAddMode(true)} />
      <GoalIput visible={isAddMode} onPress={onGoalHandler} cancelModal={onCancelModal} />
     

      <FlatList data={courseGoals} keyExtractor={(item, index) => item.id} renderItem={ itemData  =>  (
         <GoalItem id={itemData.item.id} title={itemData.item.value} onDelete= {onDeleteGoalHandler}/> 
      )} />
   

    </View>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { 
    backgroundColor: '#4630eb',
    color: '#ffffff', 
  },  

  screen: {
    padding: 40
  },    
});
