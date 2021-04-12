import React, {useState} from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandumBetween = (min, max, exclude ) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const rndNum = Math.floor(Math.random() * (max-min)) + min
    if(rndNum === exclude){
        return generateRandumBetween(min, max, exclude);
    }else{
        return rndNum;
    }
};

const GameScreen = props => {
    const [currentGuest, setCurrentGuest] = useState(generateRandumBetween(1, 100, props.userChoice));

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuest}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER"/>
                <Button title="GREATER"/>
            </Card>
        </View>
    )
}

const styles =  StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;