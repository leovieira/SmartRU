import { useRef, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  View,
} from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

const { height } = Dimensions.get('window');
export enum DrawerState {
  Open = height - 230,
  Peek = 230,
  Closed = 0,
}

export const animateMove = (
  y: Animated.Value,
  toValue: number | Animated.Value,
  callback?: any
) => {
  Animated.spring(y, {
    toValue: -toValue,
    tension: 20,
    useNativeDriver: true,
  }).start((finished) => {
    /* Optional: But the purpose is to call this after the the animation has finished. Eg. Fire an event that will be listened to by the parent component */
    finished && callback && callback();
  });
};

export const getNextState = (
  currentState: DrawerState,
  val: number,
  margin: number
): DrawerState => {
  switch (currentState) {
    case DrawerState.Peek:
      return val >= currentState + margin
        ? DrawerState.Open
        : val <= DrawerState.Peek - margin
        ? DrawerState.Closed
        : DrawerState.Peek;
    case DrawerState.Open:
      return val >= currentState
        ? DrawerState.Open
        : val <= DrawerState.Peek
        ? DrawerState.Closed
        : DrawerState.Peek;
    case DrawerState.Closed:
      return val >= currentState + margin
        ? val <= DrawerState.Peek + margin
          ? DrawerState.Peek
          : DrawerState.Open
        : DrawerState.Closed;
    default:
      return currentState;
  }
};

export interface BottomDrawerProps {
  children?: React.ReactNode;
  drawerState: DrawerState;
  onDrawerStateChange: (nextState: DrawerState) => void;
}

const BottomDrawer = ({
  children,
  drawerState,
  onDrawerStateChange,
}: BottomDrawerProps) => {
  const { height } = Dimensions.get('window');
  /* Declare initial value of y. In this case, we want it to be closed when the component is closed */
  const y = useRef(new Animated.Value(drawerState)).current;
  /* Declare another variable to keep track of the state. We need a separate variable for this because y will also change whilst the user is in the process of moving the drawer up or down */
  const state = useRef(new Animated.Value(drawerState)).current;
  const margin = 0.05 * height;
  const movementValue = (moveY: number) => height - moveY;

  /* This event is triggered when the animated view is moving. We want the user to be able to drag/swipe up or down and the drawer should move simultaneously. */
  const onPanResponderMove = (
    _: GestureResponderEvent,
    { moveY }: PanResponderGestureState
  ) => {
    const val = movementValue(moveY);
    animateMove(y, val);
  };

  /* Here is where we snap the drawer to the desired state - open, peek or closed */
  const onPanResponderRelease = (
    _: GestureResponderEvent,
    { moveY }: PanResponderGestureState
  ) => {
    const valueToMove = movementValue(moveY);
    const nextState = getNextState(state._value, valueToMove, margin);
    state.setValue(nextState);
    animateMove(y, nextState, onDrawerStateChange(nextState));
  };

  /* This determines if the responder should do something. In this scenario, it is set to true when the distance moved by Y is greater than or equal to 10, or lesser than or equal to -10. */
  const onMoveShouldSetPanResponder = (
    _: GestureResponderEvent,
    { dy }: PanResponderGestureState
  ) => Math.abs(dy) >= 10;

  /* Here we're creating a panResponder object and assigning th event handlers to it. */
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder,
      onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    })
  ).current;

  useEffect(() => {
    state.setValue(drawerState);
    animateMove(y, drawerState, onDrawerStateChange(drawerState));
  }, [drawerState]);

  return (
    <Animated.View
      style={[
        {
          width: '100%',
          height: height,
          borderRadius: 25,
          backgroundColor: THEME.COLORS.PURE_WHITE,
          position: 'absolute',
          bottom: -height + 30,
          /* Refers to y variable which changes as the user performs a gesture */
          transform: [{ translateY: y }],
        },
      ]}
      /* Refers to the PanResponder created above */
      {...panResponder.panHandlers}
    >
      <View
        style={{
          width: 80,
          height: 4,
          marginVertical: 10,
          borderRadius: 2,
          alignSelf: 'center',
          backgroundColor: THEME.COLORS.LIGHT_GRAY,
        }}
      ></View>
      {children}
    </Animated.View>
  );
};

export default BottomDrawer;
