/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-3-22
 * Time: 下午9:09
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, Dimensions, View} from "react-native";
import {screen} from "../utils";
import PropTypes from "prop-types";
import CheckerBoardItem from "./CheckerBoardItem";

export default class CheckerBoard extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  column = (item, columnIndex) => (
    <View key={columnIndex} style={styles.column}>
      {this.props.data.map((_, rowIndex) => this.row(item, columnIndex, rowIndex))}
    </View>
  )

  row = (activeIndex, columnIndex, rowIndex) => (
    <View key={rowIndex} style={styles.row}>
      <CheckerBoardItem columnIndex={columnIndex}
                        rowIndex={rowIndex}
                        active={activeIndex === rowIndex}
      />
    </View>
  );

  render() {
    const {data} = this.props;

    const column = data.map(this.column);

    return (
      <View style={styles.container}>
        {column}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: screen.width,
    width: screen.width,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  row: {
    flex: 1,
  }
});
