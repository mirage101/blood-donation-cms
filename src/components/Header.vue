<template>
  <div>
   
    <nav class="site-nav navbar navbar-expand bg-primary navbar-dark">
      <div class="container-fluid">
        <router-link
          class="navbar-brand"
          to="/"
        >BDP - blood donation portal</router-link>
        <div class="navbar-nav ml-auto">
          <div v-if="!isAdmin" class="user-role">
            <router-link class="nav-item nav-link" to="/">Home</router-link>
            <router-link class="nav-item nav-link" to="/events">Events</router-link>
            <router-link class="nav-item nav-link" to="/info">Info</router-link>
            <router-link class="nav-item nav-link" to="/centers">Centers</router-link>
          </div>
          <div v-else-if="isAdmin" class="user-role">                 
            <router-link class="nav-item nav-link" to="/admin/change-user">Change user</router-link>
            <router-link class="nav-item nav-link" to="/admin/manage-pages">Manage Info pages</router-link>
          </div>
          <div v-if="isDriver" class="user-role">
            <router-link class="nav-item nav-link" to="/driver/profile">Your profile</router-link> 
            <router-link class="nav-item nav-link" to="/driver/manage-events">Manage events</router-link>
            <router-link class="nav-item nav-link" to="/driver/manage-pages">Manage pages</router-link>
            <router-link class="nav-item nav-link" to="/driver/manage-centers">Manage Centers</router-link>              
            <router-link class="nav-item nav-link" to="/driver/donors-list">Donors List</router-link>                    
          </div>
          <div v-if="isDonor" class="user-role">
            <router-link class="nav-item nav-link" to="/donor/edit-profile">Edit profile</router-link>            
            <router-link class="nav-item nav-link" to="/donor/enlist">Enlist for donation</router-link>               
          </div>
          <router-link
            class="nav-item nav-link"
            to="/meetings"
            v-if="userstate"
          >meetings</router-link>
          <router-link
            class="nav-item nav-link"
            to="/login"
            v-if="!userstate"
          >log in</router-link>
          <router-link
            class="nav-item nav-link"
            to="/register"
            v-if="!userstate"
          >register</router-link>
          <button  
            v-show="userstate"
            class="nav-item nav-link btn btn-link"
            @click="$emit('logout')"
          >
            logout
          </button>
        </div>
      </div>
    </nav>

  </div>
</template> 
<script>
export default {
  name: "header",
  props: ["user", "userstate", "isAdmin", "isDriver", "isDonor"]
};
</script>
<style scoped>
.user-role{
  display: flex;
}
.navbar-dark .navbar-nav .nav-link{
      color: rgba(255, 255, 255, 1);
}
</style>
