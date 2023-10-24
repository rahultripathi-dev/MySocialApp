import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import moment from 'moment';

const User = ({details}) => {
  console.log(details);
  return (
    <View style={styles.container}>
      <Avatar.Image
        source={{uri: details.picture.large}}
        size={200}
        style={styles.image}
      />
      <Card style={styles.card}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            paddingTop: 100,
            paddingBottom: 20,
          }}>
          <View>
            <Card.Title
              title={`${details.name.title} ${details.name.first} ${details.name.last}`}
              titleStyle={styles.title}
            />
            <Card.Content style={{alignSelf: 'center'}}>
              <Text variant="labelLarge" style={styles.text}>
                {details.cell}
              </Text>
            </Card.Content>
            <View style={styles.line} />
            <Card.Content style={{alignSelf: 'center'}}>
              <Text variant="labelLarge" style={styles.text}>
                {details.email}
              </Text>
            </Card.Content>
            <View style={styles.line} />

            <Card.Content style={{alignSelf: 'center'}}>
              <Text variant="labelLarge" style={styles.text} numberOfLines={1}>
                {details.location.city} {details.location.state}{' '}
                {details.location.country}
              </Text>
            </Card.Content>
            <View style={styles.line} />
          </View>
          <View>
            <Card.Content style={styles.registered_text}>
              <Text
                variant="labelLarge"
                style={[styles.text, {color: '#fbd46d', paddingVertical: 8}]}
                numberOfLines={1}>
                Registered on:
              </Text>
              <Text
                variant="labelLarge"
                style={[styles.text, {paddingVertical: 8, paddingLeft: 5}]}
                numberOfLines={1}>
                {moment(details.registered.date).format('DD-MM-YYYY')}
              </Text>
            </Card.Content>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  image: {
    marginBottom: -100,
    zIndex: 9,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 10,
  },
  card: {
    height: 400,
    width: '80%',
    backgroundColor: '#76BA99',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#698269',
    borderWidth: 2,
  },
  line: {
    height: 1,
    width: '90%',
    backgroundColor: '#b9dab9',
    alignSelf: 'center',
    marginVertical: 4,
  },
  text: {fontSize: 18, color: '#fff', paddingVertical: 14},
  title: {color: '#fff', fontSize: 24, alignSelf: 'center'},
  registered_text: {
    flexDirection: 'row',
    backgroundColor: '#4f8a8b',
    alignSelf: 'center',
  },
});
