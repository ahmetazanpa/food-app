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
  StatusBar
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import categoriesData from '../../data/categoriesData';
import { colors } from '../../components/Constant';

const Item = ({ navigation , id, image, categoryName }) => (
  <TouchableOpacity key={id} style={styles.item} onPress={ () => navigation.navigate('Category')}>
    <Image
      source={{ uri: `${image}` }}
      width={100}
      height={100}
      style={styles.image}
    />
    <Text style={styles.categorName}>{categoryName}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const updateSearch = search => {
    setSearch(search);
  };

  const renderItem = ({ navigationr, item }) => (
    <Item
      navigation={navigation} 
      id={item.id}
      image={item.image}
      categoryName={item.categoryName}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SearchBar
          placeholder="Ara..."
          onChangeText={search => updateSearch(search)}
          value={search}
          platform={Platform.OS === 'android' ? 'android' : 'ios'}
          showLoading={true}
          containerStyle={styles.searchBarContainer}
        />
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
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{ marginLeft: 30, marginBottom: 20 }}
        />
        <Text style={styles.title}>Popular</Text>
        <FlatList
          data={categoriesData}
          scrollEnabled
          horizontal
          enableEmptySections={true}
          onEndReachedThreshold={1}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{ marginLeft: 30, marginBottom: 20 }}
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
    margin: 20,
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
  item: {
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
  image: {
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
  }
});
