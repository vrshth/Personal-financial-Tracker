<template>
    <div class="finance-flex" :style="{borderRight: '10px solid'+ this.getAccountType(finance.accountName)}">
        <p class="pill" :style="{backgroundColor: this.getAccountType(finance.accountName)}">{{finance.accountName}}</p>
        <p>{{finance.transactionType}}</p>
        <p>{{finance.amount}} $</p>
        <p>{{finance.category}}</p>
        <p><img src="https://img.icons8.com/?size=20&id=85102&format=png&color=000000" alt="Calendar icon"/> {{finance.transactionDate}}</p>
    </div>
</template>

<script>
    export default{
        name:"FinanceTracker",
        props:{
            finance: Object
        },
        methods:{
            getAccountType(accountType){
                if(accountType === "Checking") return "#0077b6"
                else return "#84a59d"   
            }
        }
    }
</script>

<style>
 @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..900;1,400..900&display=swap');
 *{
     font-family: "Lora", serif;
  }

.finance-flex{
    display:flex;
    justify-content:space-between;
    align-items: center;
    margin:15px;
    border:transparent;
    border-radius: 10px;
    box-shadow:0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    padding:1em;
    font-size:1.2em;
}

.finance-flex img{
    vertical-align:middle;
}

.pill{
        border:transparent;
        border-radius: 4px;
        padding:10px;
        color:white;
        text-align:center;
        width: 100px;
    }
</style>