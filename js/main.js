/* This creates a new Vue instance */
var app = new Vue({
    /* The el object connects this Vue instance to an existing DOM element (div with id='app' in index.html) */
    el: '#app',
    /* The data object holds data */
    data: {
        /* The game starts with Joker and Batman's health at 100% */
        jokerHealth: 100,
        batmanHealth: 100,
        /* Connected to v-if in index.html, true sets this section to visible when app loads and hidden when set to false */
        game_is_starting: true,
        /* Connected to v-if in index.html, false sets this section to hidden when app loads */
        game_is_running: false,
        /* Connected to v-if in index.html, false sets this section to hidden when app loads */
        jokerWins: false,
        /* Connected to v-if in index.html, false sets this section to hidden when app loads */
        batmanWins: false,
        /* Connected to v-bind:style in index.html and initially set to none, this class and css @keyframes rule will be used to apply animation to an image discharged at the opponent when attacking */
        jokerAttackAnimation: '',
        /* Connected to v-bind:style in index.html and initially set to none, this class and css @keyframes rule will be used to apply animation to an image discharged at the opponent when attacking */
        batmanAttackAnimation: '',
        /* Setting attackCount to 1 allows us to animate the attack object twice for mangle and once for attack */
        attackCount: 1
    },
    /* methods hold all the functions we'll be using */
    methods: {
        /* Connected to button with @click in index.html, load and win/lose screens disappear, game screan displays, health is set to 100% */
        start_game: function () {
            this.game_is_running = true;
            this.game_is_starting = false;
            this.jokerWins = false;
            this.batmanWins = false;
            this.jokerHealth = 100;
            this.batmanHealth = 100;
        },
        jokerWinsGame: function () {
            this.jokerWins = true;
            this.game_is_running = false;
            this.game_is_starting = false;
            this.batmanWins = false;
        },
        batmanWinsGame: function () {
            this.batmanWins = true;
            this.game_is_running = false;
            this.game_is_starting = false;
            this.jokerWins = false;
        },
        attack: function () {
            this.batmanHealth -= this.calculateDamage(3, 10);
            this.jokerAttackAnimation = "jokerAttackAnimation 0.6s ease";
            setTimeout(()=>{
                this.jokerAttackAnimation = "";
            }, 600);
            if (this.checkWin()) {
                return;
            }
            this.batmanAttacks();
        },
        mangle: function () {
            this.batmanHealth -= this.calculateDamage(10, 20);
            this.jokerAttackAnimation = "jokerAttackAnimation 0.3s ease";
            this.attackCount = 2;
            setTimeout(()=>{
                this.jokerAttackAnimation = "";
                this.attackCount = 1;
            }, 600);
            if (this.checkWin()) {
                return;
            }
            this.batmanAttacks();
        },
        heal: function () {
            if (this.jokerHealth <= 90) {
                this.jokerHealth += 10;
            } else {
                this.jokerHealth = 100;
            }
            this.batmanAttacks();
        },
        giveUp: function () {
            this.gameIsRunning = false;
            this.game_is_starting = true;
        },
        batmanAttacks: function () {
            setTimeout(()=>{
                this.batmanAttackAnimation = "batmanAttackAnimation 0.6s ease";
                setTimeout(()=>{
                    this.batmanAttackAnimation = "";
                }, 600);
                this.jokerHealth -= this.calculateDamage(5, 12);
                this.checkWin();
            }, 500);
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        checkWin: function () {
            if (this.batmanHealth <= 0) {
                this.jokerWinsGame();
                return true;
            } else if (this.jokerHealth <= 0) {
                this.batmanWinsGame();
                return true;
            }
            return false;
        }
    }
});
