<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="Link Title" label-for="input-1">
                <b-form-input id="input-1" v-model="form.title" placeholder="Enter Title" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Link URL:" label-for="input-2">
                <b-form-input id="input-2" v-model="form.url" placeholder="Enter Url" required></b-form-input>
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
            },
            show: true
        }
    },
    methods: {
        onSubmit (event) {
            event.preventDefault()
            this.$bvModal.show('modal-1')

            this.$fire.firestore.collection('users').doc('master').collection('notes').add({
                title: this.form.title,
                content: this.form.url,
                created_datetime: this.$fireModule.firestore.Timestamp.now()
            }).then((dataRef) => {
                console.log("Document written with ID: ", dataRef.id);
                alert("Notes Saved")
                this.$bvModal.hide('modal-1')
                // window.location = process.env.baseUrl
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