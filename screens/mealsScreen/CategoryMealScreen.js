import React from 'react'; 
import {CATEGORIES, MEALS} from '../../data/dummy-data';
import colors from '../../constants/color'; 
import { FlatList } from 'react-native-gesture-handler';
import MealList from '../../components/MealList';
import { useSelector } from 'react-redux';
import { View, StyleSheet} from 'react-native';
import DefaltText from '../../components/DefaultText';

const CategoryMealScreen = (props) => {
    const catID = props.navigation.getParam('categoryID');
    
    const availableMeals = useSelector(state => state.meals.filteredMeals);

    // const selectedCategory = CATEGORIES.find(cat => cat.id === catID);

    const displayedMeals = availableMeals.filter(meal =>  meal.categoryIds.indexOf(catID) >= 0 );


    if(displayedMeals.length === 0) {
        return <View style={styles.content}>
            <DefaltText>No meals found, maybe check yours filters ?</DefaltText>
        </View>
    }
    
    return <MealList 
    listData={displayedMeals} 
    navigation={props.navigation}
    />

}

CategoryMealScreen.navigationOptions = (navigationData) => {

    const catID = navigationData.navigation.getParam('categoryID'); 

    const selectedCategory = CATEGORIES.find(cat => cat.id === catID);
    
    return {
        headerTitle: selectedCategory.title,
        // headerStyle: {
        //     backgroundColor: colors.primaryColor
        // },
        // headerTintColor: 'white'
    }; 
}

const styles =  StyleSheet.create({
        content: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
});
 

export default CategoryMealScreen;