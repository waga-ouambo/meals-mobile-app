import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';
import {Platform} from 'react-native';

import color from '../constants/color';


const CustomHeaderButton = props => {
    return(
            <HeaderButton 
            { ...props } 
            IconComponent={Ionicons}
            iconSize={23}
            color={Platform.OS === 'android' ? color.accentColor : 'white'}
             />
    )
}

export default CustomHeaderButton;