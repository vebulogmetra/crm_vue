import firebase from 'firebase/app'


export default {
	actions: {
		async createCategory(context, {title, limit}) {
			try {
				const uid = await context.dispatch("getUid")
				const category = await firebase.database().ref(`users/${uid}/categories`).push({title, limit})
				//category.key возвращает firebase, можно использовать как id категории
				return {title, limit, id: category.key}
			} catch(error) {
				context.commit("setError", error)
			}
		}
	}
}

