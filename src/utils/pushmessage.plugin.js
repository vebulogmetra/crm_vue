//добавление своего кода в качестве плагина vuejs
export default {
    //чтоб vue понял чё от него хотят
    install(Vue, options) {
        Vue.prototype.$pushmsg = function(html) {
            //materializовский плагин
            M.toast({html})
        }

        Vue.prototype.$pusherror = function(html) {
            M.toast({html: `[Ошибка]: ${html}`})
        }
    }
}