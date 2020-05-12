//модуль для vuex
import firebase from 'firebase/app'


export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                //асинхронный метод возвращает промис
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                //при ошибке вызываем мутацию setError у Vuex
                commit('setError', e)
                throw e
            }
        },

        async register({dispatch, commit}, {email, password, name}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill: 10000,
                    name: name
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        //получаем id юзера из firebase
        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },

        async logout() {
            await firebase.auth().signOut()
        }
    }
}