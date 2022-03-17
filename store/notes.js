export const state = () => ({
    list: [],
    expired: null
})

export const mutations = {
    set (state, items) {
        state.list = items
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