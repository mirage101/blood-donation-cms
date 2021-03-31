<template>
    <div>
        <Benefits />
        <BloodGroups />
        <Requirements />
        <Tips />
    </div>
</template>

<script>
import Benefits from '@/views/Benefits'
import Requirements from '@/views/Requirements'
import BloodGroups from '@/views/BloodGroups'
import Tips from '@/views/Tips'

export default {
    name: 'App',
  components: {
    Benefits,
    BloodGroups,
    Requirements,
    Tips    
  }
}

</script>
