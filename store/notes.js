export const state = () => ({
    list: []
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
}