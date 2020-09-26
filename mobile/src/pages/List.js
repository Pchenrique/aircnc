import React, {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import {Text, View, SafeAreaView, ScrollView, Image, StyleSheet, AsyncStorage, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Feather as Icon } from '@expo/vector-icons'

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({ navigation }) {
	const [techs, setTechs] = useState([]);

	useEffect(() => {
		AsyncStorage.getItem('user').then(user_id => {
			const socket = socketio('http://192.168.0.9:3333', {
				query: { user_id }
			})

			socket.on('booking_response', booking => {
				Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`); 
			})
		})
	}, []);

	useEffect(() => {
		AsyncStorage.getItem('techs').then(storegedTechs => {
			const techsArray = storegedTechs.split(',').map(tech => tech.trim());

			setTechs(techsArray);
		})
	}, []);

	async function handleLogout(){
		await AsyncStorage.removeItem('user');
		await AsyncStorage.removeItem('techs');

		navigation.navigate('Login');
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.head}>

				<Image style={styles.logo} source={logo} />

				<TouchableOpacity onPress={handleLogout}>
					<Text style={styles.icon}>
						<Icon name='log-out' size={20} color='#444'/>
					</Text>
				</TouchableOpacity>

			</View>
			<ScrollView>
				{techs.map(tech => <SpotList key={tech} tech={tech} />)}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	head: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	logo: {
		height: 32,
		resizeMode: 'contain',
	},

	icon: {
		marginEnd: 25,
	}

});