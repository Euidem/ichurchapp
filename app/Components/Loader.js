import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';
const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;
return (
    <Modal
    transparent={true}
    animationType={'none'}
    visible={loading}>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator 
          animating={loading} />
      </View>
    </View>
  </Modal>
  )
}
const styles = StyleSheet.create({

});
export default Loader;