/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-3-22
 * Time: 下午8:35
 * Desc:
 */
import React, {Component} from "react";
import {ActivityIndicator, FlatList, StyleSheet, Text, Keyboard, InteractionManager, View, Alert} from "react-native";
import QueenItem from "./QueenItem";
import {Button, FormInput, Icon} from "react-native-elements";
import {queenResult} from "../utils/index";
import Modal from "react-native-modal";
import EmptyDataComponent from "../component/EmptyDataComponent";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      length: 0,
      loading: false,
      result: false
    };
  }

  confirmGo(number) {
    this.setState({loading: true});
    InteractionManager.runAfterInteractions(() => {
      // ...耗时较长的同步的任务...
      const data = queenResult(number);
      this.setState({data, loading: false, result: true});
    });
  }

  go() {
    Keyboard.dismiss();
    const number = Number(this.state.length);
    if (!number) {
      Alert.alert(
        '警告',
        '不能为空或零.',
      );
      return;
    }
    if (number <= 12) {
      this.confirmGo(number);
      return;
    }
    Alert.alert(
      '警告',
      '皇后数大于12后结果将超过14200种,确定继续吗?',
      [
        {
          text: '取消'
        },
        {
          text: '确定', onPress: () => this.confirmGo(number)
        },
      ]
    )

  }

  render() {
    const {data, length, loading, result} = this.state;

    const inputView = (
      <View style={styles.inputView}>
        <FormInput
          containerStyle={{flex: 1}}
          placeholder='请输入皇后个数...'
          onChangeText={length => this.setState({length, data: [], result: false})}
          keyboardType={'number-pad'}
          maxLength={2}
        />

        <Icon
          raised
          name='my-location'
          size={20}
          color={Color.mainColor}
          onPress={this.go.bind(this)}
        />
      </View>
    )

    const resultView = (
      <View style={styles.resultView}>
        <Text style={{color: '#555'}}>{length}个皇后总共存在{data.length}种结果</Text>
      </View>
    )

    const list = (
      <FlatList
        data={this.state.data}
        renderItem={({item, index}) => (
          <QueenItem item={item} index={index}
                     navigation={this.props.navigation}
          />
        )}
        ItemSeparatorComponent={_ => <View style={styles.separator}/>}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={<EmptyDataComponent/>}
      />
    )

    const loadingModal = (
      <Modal isVisible={loading}>
        <ActivityIndicator
          style={styles.loading}
          animating={loading} size={'large'}/>
      </Modal>
    )

    return (
      <View style={styles.container}>
        {inputView}
        {result && resultView}
        {list}
        {loadingModal}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  inputView: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    paddingRight: 15
  },
  resultView: {
    height: 25,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#dbdbdb'
  },
  separator: {
    height: 0,
    width: '100%',
    backgroundColor: '#dbdbdb'
  },
  loading: {
    position: 'absolute',
    alignSelf: 'center'
  }
});
