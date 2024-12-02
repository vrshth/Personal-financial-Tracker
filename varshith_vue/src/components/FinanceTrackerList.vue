<template>
    <div v-for="finance of financeList" :key="finance.accountId">
        <FinanceTracker :finance = finance />
    </div>
</template>

<script>
    import FinanceTracker from "./FinanceTracker.vue";

    export default{
        name:"FinanceTrackerList",
        components:{
           FinanceTracker
        },
        props:{
            financeList: Array
        }
    }
</script>

<style scoped>
</style>