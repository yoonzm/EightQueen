/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-3-22
 * Time: 下午8:51
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import PropTypes from "prop-types";
import CheckerBoard from "./CheckerBoard";

export default class QueenItem extends Component {
  static propTypes = {
    item: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  navToDetail(data) {
    this.props.navigation.navigate('Detail', {data});
  }

  render() {
    const {item, index} = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.navToDetail.bind(this, item)}>
        <View>
          <View style={styles.itemTitle}>
            <Text style={{color: '#fff'}}>第{index + 1}种结果</Text>
          </View>
          <CheckerBoard data={item}/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  itemTitle: {
    height: 25,
    width: '50%',
    backgroundColor: Color.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderTopRightRadius: 22.5,
    borderBottomRightRadius: 22.5
  }
});
