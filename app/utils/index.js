/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-3-22
 * Time: 下午8:39
 * Desc:
 */
import {Dimensions} from "react-native";

export const screen = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};

function queen(a, cur, resultArr) {
  //遍历到最后一环 输出结果
  if (cur == a.length) {
    resultArr.push([...a]);
    return
  }
  //遍历八列 找到可以放置皇后的位置
  for (var i = 0; i < a.length; i++) {
    //
    a[cur] = i;
    flag = true; //此位置是否可以放置皇后
    //检查此位置如果放皇后是否符合规则
    //遍历已放置的皇后行
    for (var j = 0; j < cur; j++) {
      var ab = i - a[j];
      // 1 此列已经被之前已放置的皇后占用
      // 2 之前放置皇后和此位置在对角线
      if (a[j] == i || (ab > 0 ? ab : -ab) == cur - j) {
        flag = false;
        break
      }
    }
    if (flag) {
      queen(a, cur + 1, resultArr)
    }
  }
};

export function queenResult(length) {
  const initArr = [], resultArr = [];
  while (initArr.length < length) {
    initArr.push(0)
  }
  queen(initArr, 0, resultArr);
  return resultArr;
}

