import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import colors from '../../constants/color';
import {useDispatch} from 'react-redux';
import {setFilters} from '../../store/actions/meals';


const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
                <Text>{props.label}</Text>
                <Switch 
                // trackColor={{true: colors.primaryColor}}
                thumbColor={colors.primaryColor}
                value={props.state} 
                onValueChange={props.onChange} />
            </View>
    )
}



const FiltersScreen = (props) => {

    const {navigation} = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegeterian, setIsVegeterian] = useState(false);

    const dispatch =  useDispatch();

    const saveFilters = useCallback( () => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegeterian: isVegeterian
        };
        dispatch(setFilters(appliedFilters))
        console.log(appliedFilters);
    }, [isGlutenFree, isLactoseFree, isVegan, isVegeterian]);

    useEffect(() => {
        navigation.setParams({save : saveFilters});
         
    }, [saveFilters])

    return(
        <ScrollView>
            <View style={styles.screen}>
                <Text style={styles.title }>Available Filters / Restrictions</Text>

                    <FilterSwitch
                    label='Gluten-free' 
                    state={isGlutenFree}
                    onChange={newValue => setIsGlutenFree(newValue)}
                    /> 
                    <FilterSwitch
                    label='Lactose-free' 
                    state={isLactoseFree}
                    onChange={newValue => setIsLactoseFree(newValue)}
                    /> 
                    <FilterSwitch
                    label='Vegan' 
                    state={isVegan}
                    onChange={newValue => setIsVegan(newValue)}
                    /> 
                    <FilterSwitch
                    label='Vegeterian' 
                    state={isVegeterian}
                    onChange={newValue => setIsVegeterian(newValue)}
                    /> 
                
            </View>
        </ScrollView>
    )
} 
 
FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle:  'Filter Meals',
        headerLeft:() => (
        <HeaderButtons 
            HeaderButtonComponent={HeaderButton}>
            <Item 
            title="Menu" 
            iconName="ios-menu" 
            onPress={() => { navData.navigation.toggleDrawer(); }} />
        </HeaderButtons>),

        headerRight:() => (
        <HeaderButtons 
            HeaderButtonComponent={HeaderButton}>
            <Item 
            title="Save" 
            iconName="ios-save" 
            onPress={() => {navData.navigation.getParam('save')() }} />
        </HeaderButtons>)
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        alignItems: 'center'
    }, 
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    }
})

export default FiltersScreen;