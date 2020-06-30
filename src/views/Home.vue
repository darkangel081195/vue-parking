<template>
  <div>
    <Parking-Form />
    <CarsList />
  </div>
</template>

<script>
  // @ is an alias to /src
  import ParkingForm from "../components/ParkingForm";
  import CarsList from "../components/CarsList"

  export default {
    name: 'Home',
    components: {
      ParkingForm,
      CarsList
    }
  }
</script>
