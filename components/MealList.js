import React from 'react';  
import { View, FlatList, StyleSheet } from 'react-native';
import MealItem from './MealItem';
import {useSelector} from 'react-redux';

const MealList = props => {
    const favoriteMals = useSelector(state =>  state.meals.favoriteMeals);

    const renderMealItem = itemData => {
       const isFavorite =  favoriteMals.some( meal => meal.id === itemData.item.id) 
        return (
            <MealItem 
            title={itemData.item.title}
             duration={itemData.item.duration}
             complexity={itemData.item.complexity}
             affordability={itemData.item.affordability}
             image={itemData.item.imageUrl}
             onSelectMeal={ () => props.navigation.navigate({
                 routeName: 'MealDetail', 
                 params: {
                     mealId: itemData.item.id,
                     mealTitle: itemData.item.title,
                     isFav: isFavorite
                 }
                })}
            /> 
        )
    }



    return (<View style={styles.list}>
        <FlatList 
        data={props.listData} 
        keyExtractor={(item, index) => item.id} 
        renderItem={renderMealItem}
        style={{width: '100%'}}
        />

        {/* <Text>The Cotegory Meal Screen !</Text>
        <Text>{selectedCategory.title}</Text>
        <Button title='Go to Detail!' onPress={() => {props.navigation.navigate({routeName: 'MealsDetail'})}} />
        <Button title='Go Back' onPress={() => {props.navigation.goBack()}} /> */}
    </View>)
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    }
})

export default MealList;