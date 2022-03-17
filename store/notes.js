import _ from "lodash"

export const state = () => ({
    list: [],
    expired: null
})

export const mutations = {
    set (state, items) {
        state.list = _.uniqBy(items, 'id')
    },
    add(state, item) {
        state.list.unshift(item)
      },
    remove (state, { item }) {
        state.list.splice(state.list.indexOf(item), 1)
    },
    setExpired (state, expired) {
        state.expired = expired
    },
}