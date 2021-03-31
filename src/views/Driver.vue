<template>
    <section>
        <div class="ui middle aligned center aligned grid">
            <div class="column">
                <router-view></router-view>
            </div>
        </div>
    </section>

</template>
<script>
import firebase from "firebase";
export default {
    data() {
        return {
            user: null
        };
    },
    created() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            self.user = user;
        });
    },
    methods: {
        signout() {
            firebase
                .auth()
                .signOut()
                .then(user => {
                    this.$router.push("/");
                });
        }
    }
};
</script>
