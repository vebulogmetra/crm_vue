import firebase from 'firebase/app'

export default {
    state: {
        //инфо о пользователе
        info: {}
    },
    mutations: {
        //прокидываем полученное инфо в стейт
        setInfo(state, info) {
            state.info = info
        },
        //чистка инфо чтоб не пересекались данные разных пользователей
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        //ходит в бд и получает поле info юзера по uid
        async fetchInfo({dispatch, commit}) {
            try {
                //получает uid
                const uid = await dispatch('getUid')
                //запрос к бд 
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setInfo', info)
            } catch {}
        }
    },

    getters: {
        //получение инфо из стейта
        info: s => s.info
    }

}