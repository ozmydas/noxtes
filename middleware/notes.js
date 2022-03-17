import { DateTime } from 'luxon'

export default function ({ store, route }) {

    // jika route index, cek store expiration time
    if (route.name !== 'index') {
        return true
    }

    // jika expired, kosongkan store list agar nanti saat mounted index dia fetch ulang dari firebase
    const now = DateTime.now().toString()
    // const nextExpiredTime = DateTime.now().plus({ minutes: 15 }).toString()

    console.log(store.state.notes.list)

    if (store.state.notes.expired <= now || store.state.notes.expired == null) {
        console.log("kosongkan store")
        // store.commit('notes/setExpired', nextExpiredTime)
        // store.commit('notes/set', [])
    }
}