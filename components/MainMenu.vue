<!-- Please remove this file from your project -->
<template>
    <b-container fluid>
        <b-row>
            <b-col class="note-col" sm="12" md="4" lg="3" v-for="item in noteLists" :key="item.id">
                <b-card
                    :title="item.title"
                    img-src="https://picsum.photos/600/300/?image=25"
                    img-alt="Image"
                    img-top
                    tag="article"
                    :style="{background: item.color}"
                    class="mb-2 pastel-yellow"
                >
                    <b-card-text>{{ item.content }}</b-card-text>

                    <hr />

                    <div class="text-right">
                        <b-button variant="danger" @click="deleteNotes(item.id)">delete</b-button>
                        <b-button variant="info" @click="copyToClipBoard(item.content)">copy</b-button>
                    </div>
                </b-card>
            </b-col>
        </b-row>

        <!-- <b-button @click="filtering">TES</b-button> -->

        <div v-show="!noteLists.length && !loading">
            <b-alert show variant="warning" class="text-center">
                No Notes Found
                <br />
                <NuxtLink to="/add">
                    <b-button>Add New</b-button>
                </NuxtLink>
            </b-alert>
        </div>

        <div class="loading" v-show="loading">
            <b-alert class="text-center" show>Fetching Data....</b-alert>
        </div>

        <div v-show="!loading">
            <b-alert class="text-center" show>
                <b-button variant="success" @click="getNotes()">Refresh</b-button>
            </b-alert>
        </div>

        <b-modal
            id="modal-1"
            title="BootstrapVue"
            centered
            hide-footer
            hide-header
            no-close-on-backdrop
        >
            <p class="my-4 text-center">Please Wait . . . .</p>
        </b-modal>
    </b-container>
</template>

<script>
import _ from "lodash"

export default {
    name: 'MainMenu',
    computed: {
        noteLists () {
            return this.$store.state.notes.list
        }
    },
    data () {
        return {
            // items: [],
            loading: true,
        }
    },
    mounted () {
        const pub = process.env.hello
        console.log(pub)

        // console.log(this.noteLists.length)
        if(this.$route.params.refresh){
            return this.getNotes()
        }

        if (this.noteLists.length === 0) {
            return this.getNotes()
        } else {
            this.loading = false
        }

        // const snapshot = await dataRef.orderBy('created_datetime', 'desc').get()
        // this.items = snapshot.docs.map(doc => {
        //     const item = doc.data()
        //     item.id = doc.id
        //     return item
        // })
    },

    methods: {
        async getNotes () {
            this.loading = true
            console.log('fetching from firebase....')

            const dataRef = this.$fire.firestore.collection('users').doc('master')

            const notes = await dataRef.collection('notes').orderBy('created_datetime', 'desc').get()
            const items = notes.docs.map(doc => {
                const item = doc.data()
                item.id = doc.id
                return item
            })

            console.log(items)
            this.$store.commit('notes/set', items)
            this.loading = false
        },

        deleteNotes (id) {
            this.$bvModal.msgBoxConfirm('Are you sure?')
                .then(value => {
                    if (!value)
                        return false;

                    this.$bvModal.show('modal-1')
                    const dataRef = this.$fire.firestore.collection('users').doc('master')
                    dataRef.collection('notes').doc(id).delete().then(() => {
                        this.$bvModal.hide('modal-1')
                        this.makeToast('warning', 'Notes Deleted!')
                        this.filtering(id)

                    }).catch((error) => {
                        this.$bvModal.hide('modal-1')
                        this.makeToast('danger', 'Error Deleting Notes!')
                        console.error("Error removing document: ", error);
                    });

                })
                .catch(error => {
                    console.error("Error removing document: ", error);
                })
        },

        copyToClipBoard (textToCopy) {
            navigator.clipboard.writeText(textToCopy);
            this.makeToast('info', 'Copied to Clipboard')
        },

        makeToast (variant = null, text) {
            this.$bvToast.toast(text, {
                title: 'Notification',
                variant,
                solid: true,
                autoHideDelay: 1000,
                appendToast: false
            })
        },

        filtering (idToHide) {
            const filteredItems = _.filter(this.noteLists, (i) => {
                return i.id !== idToHide
            })

            this.$store.commit('notes/set', filteredItems)
        }
    }
}
</script>

<style>
.note-col {
    /* background: red; */
    padding: 20px !important;
}

.pastel-yellow {
    background: #f6f7d4;
}
</style>
