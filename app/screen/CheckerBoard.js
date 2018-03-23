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
    data: PropTypes.array.isRequired,
    isStepMode: PropTypes.bool //演示模式需要标注不能下子的区域
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

  row = (activeIndex, columnIndex, rowIndex) => {
    const {data, isStepMode} = this.props;
    //x 和 y 距离目标点距离一样的禁用
    const disabled = data.filter((row, column) => {
      if (row === -1) {
        return false;
      }
      if (columnIndex === column && rowIndex === row) {
        return false;
      }
      return Math.abs(rowIndex - row) === Math.abs(columnIndex - column);
    }).length !== 0;

    return (
      <View key={rowIndex} style={styles.row}>
        <CheckerBoardItem columnIndex={columnIndex}
                          rowIndex={rowIndex}
                          active={activeIndex === rowIndex}
                          disabled={isStepMode && disabled}
        />
      </View>
    )
  };

  render() {
    const {data, isStepMode} = this.props;

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
