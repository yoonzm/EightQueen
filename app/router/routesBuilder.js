/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-3-22
 * Time: 上午9:09
 * Desc:
 */
import {StackNavigator} from "react-navigation";
import {MainRoutes} from "./routes";

const routes = MainRoutes.reduce((per, {id, title, screen}) => ({
  ...per,
  [id]: {
    screen: screen,
    navigationOptions: props => ({
      headerTitle: title,
      ...props,
    })
  }
}), {});

const MainStack = StackNavigator({...routes}, {
  initialRouteName: MainRoutes[0].id,
  navigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      elevation: 0, //header取消底部阴影效果
      backgroundColor: Color.mainColor,
    },
    headerTitleStyle: {
      alignSelf: 'center'
    },
    gesturesEnabled: true //支持手势返回
  }
});

export default AppRouter = MainStack;