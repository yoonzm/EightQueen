/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-3-22
 * Time: 下午9:15
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import PropTypes from "prop-types";

export default class CheckerBoardItem extends Component {
  static propTypes = {
    rowIndex: PropTypes.number.isRequired,
    columnIndex: PropTypes.number.isRequired,
    active: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {rowIndex, columnIndex, active} = this.props;

    const backgroundColor = !!((rowIndex + columnIndex)%2) ? '#fff' : '#000';

    return (
      <View style={[styles.container, {backgroundColor}]}>
        {active && <View style={[
          styles.queenActive,
          {backgroundColor: backgroundColor === '#fff' ? '#000' : '#fff'}
        ]}/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  queenActive: {
    height: 5,
    width: 5,
    borderRadius: 2.5
  }
});