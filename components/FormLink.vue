<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="Link Title" label-for="input-1">
                <b-form-input id="input-1" v-model="form.title" placeholder="Enter Title" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Link URL:" label-for="input-2">
                <b-form-input id="input-2" v-model="form.url" placeholder="Enter Url" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Color:" label-for="input-3">
                <b-form-select id="input-3" v-model="form.color" :options="colors" required></b-form-select>
            </b-form-group>

            <b-button type="submit" variant="primary">Save</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>

        <b-modal
            id="modal-1"
            title="BootstrapVue"
            centered
            hide-footer
            hide-header
            no-close-on-backdrop
        >
            <p class="my-4 text-center">Saving . . . .</p>
        </b-modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                title: '',
                url: '',
                color: null,
            },
            colors: [
                { text: 'Select Color', value: null },
                { text: 'Red', value: '#ffb3ba' },
                { text: 'Orange', value: '#ffdfba' },
                { text: 'Yellow', value: '#ffffba' },
                { text: 'Green', value: '#baffc9' },
                { text: 'Blue', value: '#bae1ff' },
            ],
            show: true
        }
    },
    methods: {
        onSubmit (event) {
            event.preventDefault()
            this.$bvModal.show('modal-1')
            const indata = {
                title: this.form.title,
                content: this.form.url,
                color: this.form.color,
                created_datetime: this.$fireModule.firestore.Timestamp.now()
            }

            this.$fire.firestore.collection('users').doc('master').collection('notes').add(indata).then((dataRef) => {
                console.log("Document written with ID: ", dataRef.id);
                this.$store.commit('notes/add', indata)
                // alert("Notes Saved")
                // window.location = process.env.baseUrl
                // this.$bvModal.hide('modal-1')
                this.$router.push('/')
            })
                .catch((error) => {
                    console.log(error)
                    alert("Error adding document: ", error)
                    this.$bvModal.hide('modal-1')
                });
        },
        onReset (event) {
            event.preventDefault()
            // Reset our form values
            this.form.title = ''
            this.form.url = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
}
</script>