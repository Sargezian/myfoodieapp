import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = 'AIzaSyAQ78f4BVY6CGItdvxhLmx8RR2DNvY88Gk'

async function checkEmailExists(email) {
    try {
        const response = await axios.get(`http://localhost:8181/api/user/exist/email/${email}`);
        return response.data;
    } catch (error) {
        console.error('Error checking email:', error);
        return false;
    }
}

async function authenticate(mode, email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true,
    });
    const token = response.data.idToken;

    const [username] = email.split('@');
    console.log(`User ${username} authenticated successfully!`);
    const emailExists = await checkEmailExists(email);
    if (!emailExists) {
       const res = await axios.post(`http://localhost:8181/api/user`, {
            id: email,
            username: username,
            email: email,
            lastSeen: new Date().toISOString(),
        });

        console.log(res.status);
    }
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('email', email);
    return token;
}

export function createUser(email, password) {
    return authenticate('signUp', email, password);
}

export async function login(email, password) {
    return authenticate('signInWithPassword', email, password);
}