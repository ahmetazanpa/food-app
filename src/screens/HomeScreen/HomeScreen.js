import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import categoriesData from '../../data/categoriesData';
import { colors } from '../../components/Constant';
import data from '../../data/data';

const CategoryItem = ({ navigation, id, image, categoryName }) => (
  <TouchableOpacity key={id} style={styles.categoryItem} onPress={() => navigation.navigate('Category')}>
    <Image
      source={{ uri: `${image}` }}
      width={100}
      height={100}
      style={styles.categoryImage}
    />
    <Text style={styles.categorName}>{categoryName}</Text>
  </TouchableOpacity>
);

const PopularItem = ({ navigation, id, image, title, chef }) => (
  <TouchableOpacity key={id} style={styles.popularItem} onPress={() => navigation.navigate('Category')}>
    <ImageBackground
      source={{ uri: `${image}` }}
      width={100}
      height={100}
      style={styles.popularImage}>
      <View style={styles.imageBackgroundContainer}>
        <Text style={styles.popularName}>{title}</Text>
        <Text style={styles.chef}>{chef}</Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const updateSearch = search => {
    setSearch(search);
  };

  const renderCategoryItem = ({ item }) => (
    <CategoryItem
      navigation={navigation}
      id={item.id}
      image={item.image}
      categoryName={item.categoryName}
    />
  );

  const renderPopularItem = ({ item }) => (
    <PopularItem
      navigation={navigation}
      id={item.id}
      image={item.image}
      title={item.title}
      chef={item.mustache}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Ara..."
        onChangeText={search => updateSearch(search)}
        value={search}
        platform={Platform.OS === 'android' ? 'android' : 'ios'}
        showLoading={true}
        containerStyle={styles.searchBarContainer}
      />
      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Categories</Text>
          <TouchableOpacity><Text style={styles.seeallTitle}>see all</Text></TouchableOpacity>
        </View>
        <FlatList
          data={categoriesData}
          scrollEnabled
          horizontal
          enableEmptySections={true}
          onEndReachedThreshold={1}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          style={{ marginLeft: 20, marginBottom: 20 }}
        />
        <Text style={styles.title}>Popular</Text>
        <FlatList
          data={data}
          scrollEnabled
          numColumns={2}
          enableEmptySections={true}
          onEndReachedThreshold={1}
          showsHorizontalScrollIndicator={false}
          renderItem={renderPopularItem}
          keyExtractor={item => item.id}
          style={{ marginLeft: 20, marginBottom: 75 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBg,
  },
  searchBarContainer: {
    margin: 40,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 20,
    shadowRadius: 20,
    elevation: 5,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
  },
  title: {
    marginLeft: 20,
    paddingLeft: 10,
    fontFamily: 'Candara',
    fontWeight: 'bold',
    color: colors.darkBg,
  },
  seeallTitle: {
    marginRight: 20,
    paddingRight: 10,
    fontFamily: 'Candara',
    color: colors.titleText
  },
  categoryItem: {
    width: 60,
    height: 50,
    marginVertical: 15,
    marginHorizontal: 7,
    borderRadius: 20,
    shadowRadius: 20,
    elevation: 5,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignContent: 'center',
    resizeMode: 'stretch',
  },
  categorName: {
    padding: 3,
    fontSize: 10,
    textAlign: 'center',
    color: colors.categoryText
  },
  popularItem: {
    width: 170,
    height: 150,
    marginVertical: 7,
    marginHorizontal: 7,
    borderRadius: 20,
    shadowRadius: 20,
    elevation: 5,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
  },
  popularImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignContent: 'center',
    flexDirection: 'column-reverse',
    resizeMode: 'stretch',
  },
  popularName: {
    padding: 3,
    fontSize: 14,
    fontFamily: 'Candara',
    textAlign: 'center',
    color: colors.white
  },
  imageBackgroundContainer:{
    backgroundColor: 'rgba( 0, 0, 0, 0.6 )',
  },
  chef: {
    padding: 3,
    fontSize: 14,
    fontFamily: 'Candara',
    color: colors.white
  }
});
