/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-3-14
 * Time: 下午6:25
 * Desc: 空数据时展示
 */

import React from "react";
import {Text, View, StyleSheet, Image} from "react-native";

export default function EmptyDataComponent({text = '暂无数据'}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/empty-data.png')}/>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 300
  },
  text: {
    fontSize: 14,
    color: '#555'
  }
});