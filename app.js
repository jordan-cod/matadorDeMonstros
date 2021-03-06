new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        playerImage: './personagens/player.gif',
        monsterLife: 100,
        logs: []
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame(){
            this.running = true
            this.logs = []
            this.playerLife = 100
            this.monsterLife = 100
        },
        giveUp(){
            const medinho = new Audio('audio/galinha.wav')
            medinho.play()
            this.running = false
            this.logs = []
            this.playerLife = 100
            this.monsterLife = 100
        },
        getSoundAndImage(){
            this.playerImage = './personagens/player-attack.gif'
            setTimeout(() => {
				this.playerImage = './personagens/player.gif'
                const attack = new Audio('./audio/attack.wav')
                attack.play()
			}, 500)
        },
        attack(especial){
            this.getSoundAndImage()
            this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
            if(this.monsterLife > 0) {
                this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
            }
        },
        hurt(prop, min, max, especial, source, target, cls){
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
        },
        healAndHurt(){
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        heal(min, max) {
            const healSound = new Audio('audio/heal.wav')
            healSound.play()
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`Jogador ganhou for??a de ${heal}.`, 'player-heal')
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls) {
            this.logs.unshift({text, cls})
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }
    }
})