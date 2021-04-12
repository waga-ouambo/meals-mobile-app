import React, {useState} from 'react';
import { StyleSheet, View, Button, ScrollView, FlatList, TextInput, Modal } from 'react-native';

const GoalIput = (props) => {

    const [enteredGoal, setEnteredGoal] = useState('');

    const onGoalInputHandler= (enterText) => {
        setEnteredGoal(enterText);  
      }

    const submitForm = (enterText) => {
        props.onPress(enterText)
        setEnteredGoal('');  
      }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput placeholder="Course Goal"
                style={styles.input}
                value={enteredGoal}
                onChangeText={onGoalInputHandler}
                />
                <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button  title="Cancel" color='red' onPress={props.cancelModal} /> 
                </View>

                <View style={styles.button}>
                    <Button title="Add" onPress={() => submitForm(enteredGoal) } />  
                </View> 
                    
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({  
    inputContainer: { 
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center' 
    },
    input: {
      width: '80%', 
      borderColor: 'black', 
      borderWidth: 1, 
      padding:10,
      marginBottom: 10
    }, 
    buttonContainer : {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%'
    },
    button : { 
        width: '40%'
    }
  });
  
export default GoalIput;


