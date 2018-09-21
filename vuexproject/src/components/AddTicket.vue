<template>
  <div class="container">
    <h1>Create A Ticket</h1>
    <form v-on:submit.prevent="addTicket">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Email ID:</label>
            <input type="text" class="form-control" v-model="ticket.email"/>
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Ticket Description:</label>
              <textarea cols="5" rows="5" class="form-control col-md-6" v-model="ticket.description"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>File Upload</label>
              <input type="file" class="form-control" v-on:change="upload"/>
            </div>
          </div>
        </div>
        <br />
        <div class="form-group">
          <button class="btn btn-primary">Create Ticket</button>
        </div>
    </form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {mapMutations} from 'vuex'
export default {
    name: 'AddTicket',
    data() {
      return  {
        ticket: {},
        file: '',
      }
    },
    methods: {
       addTicket() {
            this.ticket.file = this.file;
            console.log("thisaasd", this.ticket);
            this.$store.dispatch('putTickets',this.ticket);
            this.$router.push('index');
       },
       async upload(event) {
          let file = event.target.files
          let formData = new FormData()
          formData.append('file',file[0]);
          for (var key of formData.entries()) {
            console.log("hihi",key[1]);
        }
          let uri = 'http://localhost:4000/tickets/file';
          this.axios.post(uri, formData).then((response) => {
            this.file = response.data.Location;
          })
       }
    }
}
</script>
