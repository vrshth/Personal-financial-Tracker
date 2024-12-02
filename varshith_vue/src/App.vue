<template>
  <FinanceTrackerHeader/>
  <FinanceTrackerList :financeList = financeList />
</template>

<script>
  import FinanceTrackerHeader from "./components/FinanceTrackerHeader.vue";
  import FinanceTrackerList  from "./components/FinanceTrackerList.vue";

  export default{
    name: "App",
    components:{
      FinanceTrackerHeader,
      FinanceTrackerList 
    },
    data(){
      return{
        financeList:[]
      }
    },
    methods:{
      async fetchFinanceList(){
        const res = await fetch("http://localhost:4198/api");
        const financeData = await res.json();
        return financeData[0].finance;
      }
    },
    async created(){
        this.financeList = await this.fetchFinanceList();
    }
  }
</script>

<style scoped>
</style>