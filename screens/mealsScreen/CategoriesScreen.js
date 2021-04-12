import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';

import { CATEGORIES } from '../../data/dummy-data';
import colors from '../../constants/color';
import CategoryGridTile from '../../components/CategoryGridTile';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';



const CategoriesScreen = (props) => {
    
    const renderGridItem = (itemData) => {
        return <CategoryGridTile 
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => { 
            props.navigation.navigate({
                routeName: 'CategoryMeals', 
                params: {categoryID: itemData.item.id } })
            }}
        />
    }
    

    return( 
        <FlatList 
        keyExtractor={(item, index) => item.id}
        data={CATEGORIES} 
        renderItem={renderGridItem} 
        numColumns={2} />

        //  <View style={styles.screen}>
        //      <Text>The Cotegory Screen !</Text> 
        //      <Button title='Go to Meals!' onPress={() => {props.navigation.navigate({routeName: 'CategoryMeals'})}} />
        //      {/* <Button title='Go to Meals!' onPress={() => {props.navigation.push('Categories')}} /> */}
        //  </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    } 
})

CategoriesScreen.navigationOptions = navData => {
    return {
        headerTitle:  "Meal Categories",
        headerLeft:() => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName="ios-menu" onPress={() => { navData.navigation.toggleDrawer(); }} />
        </HeaderButtons>
        )
    }
}

export default CategoriesScreen;