import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Meetings from "./views/Meetings.vue";
import CheckIn from "./views/CheckIn.vue";
import Attendees from "./views/Attendees.vue";

import Register from '@/views/Register'
import Admin from '@/views/Admin'
import Driver from '@/views/Driver'
import Donor from '@/views/Donor'

//pages
import Home from '@/views/Home'
import Events from '@/views/Events'
import Info from '@/views/Info'
import Centers from '@/views/Centers'

//donor profile
import EditProfile from '@/views/donor/EditProfile'
import EnlistDonations from '@/views/donor/EnlistDonations'

//admin pages
import ChangeUser from '@/views/admin/ChangeUser'
import ManagePages from '@/views/admin/ManagePages'

//doctor pages
import DoctorProfile from '@/views/doctor/DoctorProfile'
import ManageCenters from '@/views/doctor/ManageCenters'
import ManageEvents from '@/views/doctor/ManageEvents'
import DonorsList from '@/views/doctor/DonorsList'

import ViewPage from '@/views/doctor/ViewPage'
import EditPage from '@/views/doctor/EditPage'
import TestPage from '@/views/doctor/TestPage'


import EditUser from '@/views/doctor/EditUser'
import ViewUser from '@/views/doctor/ViewUser'

import CreateEvent from '@/views/doctor/CreateEvent'
import EditEvent from '@/views/doctor/EditEvent'
import ViewEvent from '@/views/doctor/ViewEvent'

import NewCenter from '@/views/doctor/NewCenter'
import ViewCenter from '@/views/doctor/ViewCenter'
import EditCenter from '@/views/doctor/EditCenter'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
      meta: {
        guest: true
      }
    },
    {
      path: '/info',
      name: 'Info',
      component: Info,
      meta: {
        guest: true
      }
    },
    {
      path: '/centers',
      name: 'Centers',
      component: Centers,
      meta: {
        guest: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children:[
        {
          path:'change-user',
          component:ChangeUser,
        },
        {
          path: 'new-page',
          component: TestPage
        },
        {
          path: '/:page_id',
          name: 'view-page',
          component: ViewPage
        },
        {
          path: 'edit/:page_id',
          name: 'edit-page',
          component: EditPage
        },
       
        {
          path:'manage-pages',
          component:ManagePages,
         
        }
      
      ],
      meta: {
        auth: true
      }
    },
    {
      path: '/driver',
      name: 'driver',
      component: Driver,
      children:[
        {
          path:'profile',
          component:DoctorProfile,
         },
        {
         path:'manage-centers',
         component:ManageCenters,
        },
        {
          path:'create-center',
          component:NewCenter,
         },
         {
          path:'/edit-center/:center_id',
          name: 'edit-center',
          component:EditCenter
         },
         {
          path: '/center/:center_id',
          name: 'view-center',
          component: ViewCenter
        },
        {
          path:'manage-events',
          component:ManageEvents,
         },
         {
          path:'manage-pages',
          component:ManagePages,
         },
         {
          path:'/event/create-event',
          component:CreateEvent,
         },
         {
          path:'/edit-event/:event_id',
          name: 'edit-event',
          component:EditEvent
         },
         {
          path: 'event/:event_id',
          name: 'view-event',
          component: ViewEvent
        },
         {
          path:'donors-list',
          component:DonorsList,
         },
        {
          path: '/:user_id',
          name: 'view-user',
          component: ViewUser
        },
        {
          path: '/edit-user/:user_id',
          name: 'edit-user',
          component: EditUser
        },
      ],
      meta: {
        auth: true
      }
    },
    {
      path: '/donor',
      name: 'donor',
      component: Donor,
      children:[
        {
         path:'edit-profile',
         component:EditProfile,
        },
        {
          path:'enlist',
          component:EnlistDonations,
         }
      ],
      meta: {
        auth: true
      }
    },
   
    {
      path: "/meetings",
      name: "meetings",
      component: Meetings
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/checkin/:userID/:meetingID",
      name: "CheckIn",
      component: CheckIn
    },
    {
      path: "/attendees/:userID/:meetingID",
      name: "Attendees",
      component: Attendees
    },
    {
      path: "*",
      redirect: '/'
    }

  ]
});
