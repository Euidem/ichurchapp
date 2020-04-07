 import React, { Component } from 'react'
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
 import AboutUs from '../AboutUsTab';
 import ContactUs from '../ContactUsTab';
 import MenuScreen from '../MenuScreen';
 import Devotionals from '../Devotionals';
   
 const TabNavigator = createBottomTabNavigator({
    Sermons: {
      screen: MenuScreen,
      path: '/',
      navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
              const iconName =  `ios-microphone${focused ? '' : ''}`;
              return <Ionicons name={iconName} size={25} color={tintColor} />;
          },
          
            tabBarOptions: {
                showLabel: true, // hide labels
                 activeTintColor:'#fff', // active icon color
                inactiveTintColor: '#ccc',  // inactive icon color
                style: {
                    backgroundColor: '2d324f',
                    borderTopWidth: 0,
                    /* shadowOffset: { width: 5, height: 3 },
                     shadowColor: '2d324f',
                     shadowOpacity: 0.5, 
                     elevation: 5 */
                },
                
            }
      },
  
  },
  
  
  
  Devotionals: {
    screen: Devotionals,
    path: '/',
    navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
            const iconName =  `ios-calendar${focused ? '' : ''}`;
            return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
        
        tabBarOptions: {
            showLabel: true, // hide labels
             activeTintColor:'#fff', // active icon color
            inactiveTintColor: '#ccc',  // inactive icon color
            style: {
                backgroundColor: '2d324f',
                borderTopWidth: 0,
               /* shadowOffset: { width: 5, height: 3 },
                shadowColor: '2d324f',
                shadowOpacity: 0.5, 
                elevation: 5 */
            },
        }
    },
  },
  
  
  
  About: {
    screen: AboutUs,
    path: '/',
    navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
            const iconName =  `ios-help-circle-outline${focused ? '' : ''}`;
            return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
        tabBarOptions: {
            showLabel: true, // hide labels
             activeTintColor:'#fff', // active icon color
            inactiveTintColor: '#ccc',  // inactive icon color
            style: {
                backgroundColor: '2d324f',
                borderTopWidth: 0,
                 /*  shadowOffset: { width: 5, height: 3 },
                shadowColor: '2d324f',
                shadowOpacity: 0.5, 
                elevation: 5 */
            },
        }
        
    },
  
  },

  Contact: {
    screen: ContactUs,
    path: '/',
    navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
            const iconName =  `ios-map${focused ? '' : ''}`;
            return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
        tabBarOptions: {

            showLabel: true, // hide labels
             activeTintColor:'#fff', // active icon color
            inactiveTintColor: '#ccc',  // inactive icon color
            style: {
                backgroundColor: '2d324f',
                borderTopWidth: 0,
              /*  shadowOffset: { width: 5, height: 3 },
                shadowColor: '2d324f',
                shadowOpacity: 0.5, 
                elevation: 5 */
            },
            
        }
    },
  
  },
  
  
  
  
  });
  
  export default createAppContainer(TabNavigator);