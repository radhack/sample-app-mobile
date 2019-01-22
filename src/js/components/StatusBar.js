import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { IS_IOS, IS_IPHONEX } from '../config/Constants';
import { colors } from '../utils/colors';

export const STATUS_BAR_HEIGHT = IS_IOS ? (IS_IPHONEX ? 44 : 20) : (StatusBar.currentHeight || 0);

export default class SwagLabsStatusBar extends Component {
  render(){
    return (
      <View style={ styles.statusBar }>
        <StatusBar translucent={false}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: colors.white,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    width: '100%',
    height: STATUS_BAR_HEIGHT,
  },
});