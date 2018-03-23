/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-3-22
 * Time: 下午8:48
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, Switch, Text, View} from "react-native";
import CheckerBoard from "./CheckerBoard";
import {Button, Icon} from "react-native-elements";

export class Detail extends Component {
  constructor(props) {
    super(props);
    const {data} = props.navigation.state.params;
    this.state = {
      data,
      stepData: data.map(_ => -1),
      stepMode: false
    };
  }

  preStep() {
    const {data, stepData} = this.state;
    const cloneData = [...stepData];

    const isAll = stepData.filter(item => item === -1).length === 0;
    if (isAll) {
      cloneData[stepData.length - 1] = -1;
    } else {
      for (let i = 0; i < stepData.length; i++) {
        if (stepData[i] === -1) {
          cloneData[i - 1] = -1;
          break;
        }
      }
    }
    this.setState({stepData: cloneData})
  }

  nextStep() {
    const {data, stepData} = this.state;
    const cloneData = [...stepData];
    for (let i = 0; i < stepData.length; i++) {
      if (stepData[i] === -1) {
        cloneData[i] = data[i];
        break;
      }
    }
    this.setState({stepData: cloneData})
  }

  render() {
    const {data, stepData, stepMode} = this.state;

    const disabledPre = stepData.filter(item => item !== -1).length === 0;
    const disabledNext = stepData.filter(item => item === -1).length === 0;

    const stepOptView = (
      <View style={styles.stepOptView}>
        <Icon
          disabled={disabledPre}
          raised
          name='chevron-left'
          size={25}
          color={disabledPre ? Color.disabledColor : Color.mainColor}
          onPress={this.preStep.bind(this)}
        />
        <Icon
          disabled={disabledNext}
          raised
          name='chevron-right'
          size={25}
          color={disabledNext ? Color.disabledColor : Color.mainColor}
          onPress={this.nextStep.bind(this)}
        />
      </View>
    );

    return (
      <View style={styles.container}>
        <CheckerBoard data={stepMode ? stepData : data}
                      isStepMode={stepMode}
        />
        <View style={styles.stepSwitch}>
          <Text>
            演示模式
            ({stepMode ? '已开启' : '已关闭'})
          </Text>
          <Switch value={stepMode}
                  onValueChange={stepMode => this.setState({stepMode, stepData: data.map(_ => -1)})}
          />
        </View>
        {stepMode && stepOptView}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  stepSwitch: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  stepOptView: {
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 20
  }
});
