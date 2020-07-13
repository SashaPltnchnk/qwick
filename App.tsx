import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';

interface Photo {
  id: string;
  url: string;
}

const BillGatesHardCodedPhoto: Photo = {
  url:
    'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5c76b4b84bbe6f24ad99c370%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D0%26cropX2%3D4000%26cropY1%3D0%26cropY2%3D4000',
  id: new Date().toString(),
};

const API = 'http://localhost:3000';

const App = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    axios
      .get(`${API}/member/1/photos`)
      .then(({data}) => {
        setPhotos(data[0].photos);
      })
      .catch((err) => console.log(err));
  }, []);

  const addPhoto = () => {
    setPhotos((cur) => [...cur, BillGatesHardCodedPhoto]);

    // in a good world
    // axios.post(`${API}/member/1/photos`, BillGatesHardCodedPhoto).then((xxx) => {
    //   console.log('xxx >', xxx)
    // }).catch((err) => console.log('add',err));
  };

  const deletePhoto = (id: string) => {
    const filteredPhotos = photos.filter((photos) => photos.id !== id);
    setPhotos(filteredPhotos);

    // in a good world
    // axios.delete(`${API}/member/1/photos/${id}`).then((xx) => {
    //   console.log('xx >', xx)
    // }).catch((err) => console.log('delete',err));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <Button title={'Add new photo'} onPress={addPhoto} />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your profile photos:</Text>
        </View>

        <View style={styles.container}>
          {photos.map((photo) => {
            return (
              <View key={photo.id} style={styles.card}>
                <View style={styles.photoContainer}>
                  <Image source={{uri: photo.url}} style={styles.image} />
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deletePhoto(photo.id)}>
                  <Image
                    source={require('./assets/icons/close.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    position: 'relative',
    flexBasis: '33%',
    flexWrap: 'wrap',
  },
  photoContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    margin: 10,
  },
  image: {
    width: 120,
    height: 150,
  },
  icon: {
    width: 15,
    height: 15,
  },
  deleteButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default App;
