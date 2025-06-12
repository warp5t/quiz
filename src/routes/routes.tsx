import { ConfigScreen } from "../screen/configScreen/ConfigScreen";
import MainScreen from "../screen/mainScreen/MainScreen";
import { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <ConfigScreen />,
  },
  {
    path: '/game',
    element: <MainScreen />
  }
]