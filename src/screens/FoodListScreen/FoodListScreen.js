import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StatusBar, Easing, Animated, Image, Text, View, StyleSheet, SafeAreaView, } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';
import { Transitioning, Transition } from 'react-native-reanimated';
import posed, { Transition as PoseTransition } from 'react-native-pose';
import data, { detailsList, iconsByType } from '../../data/data';
import { DURATION, TITLE_SIZE, SPACING, IMAGE_SIZE, colors, width, height } from '../../components/Constant'
import { Rating, AirbnbRating } from 'react-native-elements';

const Title = ({ index, text, color }) => {
  return (
    <Item style={{ heigth: TITLE_SIZE * 3, marginTop: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', }}>
      <Text
        key={`title-${index}`}
        style={{
          fontSize: TITLE_SIZE,
          fontWeight: '900',
          color,
        }}
      >
        {text}
      </Text>
      <Rating
        type='custom'
        showRating
        ratingCount={1}
        imageSize={20}
        tintColor={colors.white}
        ratingColor={colors.darkBg}
        ratingBackgroundColor={colors.darkBg}
        fractions="{5}"
        startingValue="{1}"
        style={{ flexDirection: 'row-reverse', width: 70, borderWidth: 1, borderRadius: 50, fontSize: 10, marginRight: 20, padding: 6, backgroundColor: colors.white, borderColor: colors.white, shadowRadius: 20, elevation: 5, shadowOpacity: 0.5, shadowColor: colors.lightBg, shadowOffset: { width: 0, height: 15 } }}
      />
    </Item>
  );
};

const Icon = ({ type }) => {
  return (
    <SimpleLineIcons
      name={type}
      size={26}
      color={colors.darkText}
      style={{ marginRight: 15, height: 26, }}
    />
  );
};

const Details = ({ color, index }) => {
  return (
    <View style={{ marginVertical: SPACING, }}>
      {
        detailsList.map((key) => {
          return (
            <View
              key={key}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 25,
              }}>
              <Icon type={iconsByType[key]} />
              <Item style={{ flex: 1, heigth: 26, justifyContent: 'center' }}>
                <Text
                  key={`${key} - ${index}`}
                  style={{ fontSize: 16, color, fontWeight: '700' }}
                >
                  {data[index][key]}
                </Text>
              </Item>
            </View>
          );
        })
      }
    </View>
  );
};

const Description = ({ index, text, color }) => {
  return (
    <Item>
      <Text key={`description-${index}`} style={{ fontSize: 16, color }} numberOfLines={3} ellipsizeMode='tail'>
        {text}
      </Text>
    </Item>
  );
};

const Item = ({ children, style }) => {
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'transparent',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const transition = (
  <Transition.Together >
    <Transition.Out type="slide-bottom" durationMs={DURATION} interpolation="easeIn" />
    <Transition.Change />
    <Transition.In type="slide-bottom" durationMs={DURATION} interpolation="easeOut" />
  </Transition.Together>
)

const config = {
  transition: {
    type: 'tween',
    duration: DURATION,
    easing: Easing.elastic(0.9)
  }
}

const PosedView = posed.View({
  enter: { opacity: 1, rotate: '0deg', ...config },
  exit: { opacity: 0, rotate: '270deg', ...config }
})

function FoodListScreen() {
  const [index, setIndex] = useState(0);
  const color = index % 2 === 1 ? colors.lightText : colors.darkText;
  const headingColor = index % 2 === 1 ? colors.lightText : colors.darkBg;
  const activeIndex = useRef(new Animated.Value(0)).current;
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activeIndex,
      duration: DURATION * 0.7,
      useNativeDriver: true,
    }).start();

    StatusBar.setBarStyle(index % 2 === 0 ? 'dark-content' : 'light-content', true);
    StatusBar.setBackgroundColor(index % 2 === 1 ? colors.darkBg : colors.lightBg, true)
  });

  const setActiveIndex = useCallback((newIndex) => {
    activeIndex.setValue(newIndex);
    ref.current.animateNextTransition();
    setIndex(newIndex);
  });

  const translateY = animation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [height, 0, -height],
  });

  const ref = useRef();

  return (
    <FlingGestureHandler
      key="up"
      direction={Directions.UP}
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}>
      <FlingGestureHandler
        key="down"
        direction={Directions.DOWN}
        onHandlerStateChange={ev => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              { height: height * data.length, transform: [{ translateY }] },
            ]}
          >
            {
              data.map((_, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      height,
                      backgroundColor: i % 2 === 0 ? colors.lightBg : colors.darkBg
                    }}
                  ></View>
                );
              })
            }
          </Animated.View>
          <PoseTransition>
            {
              index % 2 === 0 ?
                <PosedView
                  key='image0'
                  style={[
                    styles.imageContainer,
                    { borderColor: index % 2 === 0 ? colors.darkBg : colors.lightBg }
                  ]}
                >
                  <Image
                    style={[styles.image, { shadowColor: index % 2 === 0 ? '#F2F2F2' : '#55589E' }]}
                    source={{
                      uri: data[index].image,
                    }}
                  />
                </PosedView> :
                <PosedView
                  key='image1'
                  style={[
                    styles.imageContainer,
                    { borderColor: index % 2 === 0 ? colors.darkBg : colors.lightBg }
                  ]}
                >
                  <Image
                    style={[styles.image, { shadowColor: index % 2 === 0 ? '#F2F2F2' : '#55589E' }]}
                    source={{
                      uri: data[index].image,
                    }}
                  />
                </PosedView>
            }
          </PoseTransition>
          <Transitioning.View
            ref={ref}
            //transition={transition}
            style={{
              padding: 20,
              flex: 1,
              justifyContent: 'space-evenly'
            }}
          >
            <Title color={headingColor} index={index} text={data[index].title} />
            <Details color={color} index={index} />
            <Description
              index={index}
              text={data[index].description}
              color={headingColor}
            />
          </Transitioning.View>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};


export default FoodListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    flexDirection: 'column',
    position: 'absolute',
    borderLeftWidth: 2,
    borderRadius: 130,
    right: '-26%',
    width: IMAGE_SIZE,
    height: '40%',
    elevation: 25,
  },
  image: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '90%',
    width: '90%',
    margin: 15,
    borderRadius: 200,
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.5,
    shadowRadius: 200,
  },

});