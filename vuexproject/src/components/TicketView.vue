<template>
    <div class="container">
        <h1>Tickets</h1>
        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Email ID</td>
                <td>Description</td>
                <td>File Location</td>
            </tr>
            </thead>
            <tbody>
               <tr v-for="ticket in tickets" :key="ticket._id">
                    <td>{{ ticket._id }}</td>
                    <td>{{ ticket.email }}</td>
                    <td>{{ ticket.description }}</td>
                    <td>{{ ticket.file }}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'TicketView',
        mounted() {
          console.log("this$", this.$store);
          this.$store.dispatch('loadTickets');
        },
        computed: mapState([
          'tickets'
        ])
    }
</script>

<style>
/* @import "~bootstrap/scss/modal"; */
</style>
