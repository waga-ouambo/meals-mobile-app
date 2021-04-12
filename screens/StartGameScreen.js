import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert, Image } from 'react-native';
import Card from '../components/Card';
import color from '../constants/color';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import { ScrollView } from 'react-native-gesture-handler';
import MainButton from '../components/MainButton';
import {Ionicons} from '@expo/vector-icons';

const StartGameScreen = props =>
{

    const [ enteredValue, setEnteredValue] = useState('');
    const [ confirmed, setConfirmed] = useState(false);
    const [ selectedNumber, setselectedNumber] = useState();

    const numberInputHandler = enteredText => {
        setEnteredValue(enteredText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const choseNumber = parseInt(enteredValue);
        if( isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99){ 
           Alert.alert(
               'Invalid Number!',
               'Number has to be 1 number between a and 99.',
               [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
           )
        }
        setConfirmed(true);
        setselectedNumber(choseNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;
    if(confirmed){
        confirmedOutput = (
        <Card style={styles.summaryContainer}> 
            <Text>You selected </Text>
            <NumberContainer>{selectedNumber} </NumberContainer>
            <Button title='START GAME' onPress={() => props.onStartGame(selectedNumber)} />
        </Card>);
    }

    return(
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
            <ScrollView>
        <View style={styles.screen}>
            <Text style={styles.title}>The Game screen !</Text> 
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>

                    <Input style={styles.input}
                    blurOnSubmit autoCapitalize='none' 
                    autoCorrect={false} 
                    keyboardType="number-pad" 
                    maxLength={12} 
                    value={enteredValue}
                    onChangeText={numberInputHandler}
                    />

                    <View style={styles.buttonContainer}>
                         <View style={styles.button}> 
                             <Button title="Reset" onPress={resetInputHandler} color={color.accent}/>  
                         </View>
                         <View style={styles.button}> 
                             <Button title="Confirm" onPress={confirmInputHandler} color={color.primary}/> 
                         </View>  
                    </View>
                </Card>
                {confirmedOutput}
                    <View style={styles.imageContainer}>
                        <Image 
                        fadeDuration={3000}
                        // source={require('../assets/success.png')}
                        source={{uri: 'https://e-patrimoinesafricains.org/patrimoinesafricains/wp-content/uploads/Axe-de-la-vie-chefferie-Bandjoun-%C2%A9RDC-2-1024x683.jpg' }}
                        style={styles.image}
                        resizeMode='cover'
                        />
                    </View>
                    <MainButton onPress={() => {console.log(('START GAME'))}}>
                       <Ionicons name='md-remove' size={24}/> START GAME  <Ionicons name='md-add' size={24}/>
                    </MainButton>
        </View> 
        </ScrollView>
        </TouchableWithoutFeedback>
    )

}


const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
     },
     inputContainer: {
         width: 300,
         maxWidth: '80%',
         alignItems: 'center' 
     },
     buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
     },
     button: {
         width: 100
     },
     input: {
         width: 100,
         textAlign: 'center'
     },
     summaryContainer: {
         marginTop: 20,
         alignItems: 'center'
     },
     imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30

     },
     image: {
         width: '100%',
         height: '100%' 
     }
});
 
export default StartGameScreen; 