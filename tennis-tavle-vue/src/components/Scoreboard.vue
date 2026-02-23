<script setup>
import { ref, computed } from 'vue'
//States for spillerne, starter på nul
const player1Score = ref(0)
const player2Score = ref(0)

//Finder ud af om der er en vinder
const winner = computed(() => {
  if (player1Score.value >= 6 && (player1Score.value - player2Score.value) >= 2) return 'Spiller 1'
  if (player2Score.value >= 6 && (player2Score.value - player1Score.value) >= 2) return 'Spiller 2'
  return null
})
//Afslutning af spil, om det er uafgjort eller om der en vinder.
const isTie = computed(() => player1Score.value === 11 && player2Score.value === 11)
const gameOver = computed(() => winner.value !== null || isTie.value)
//Tilføjelse af points
const addPointPlayer1 = () => { if (!gameOver.value) player1Score.value++ }
const addPointPlayer2 = () => { if (!gameOver.value) player2Score.value++ }
//Nulstil af spil
const resetGame = () => {
  player1Score.value = 0
  player2Score.value = 0
}
</script>

<template>
  <div class="scoreboard-container">
    <div class="scoreboard-casing">
      <h1 class="title">Tennis Tavle</h1>
      
      <div class="screen">
        <div class="player-row">
          <span class="player-name">Spiller 1</span>
          <span class="score-box">{{ player1Score }}</span>
        </div>
        
        <div class="player-row">
          <span class="player-name">Spiller 2</span>
          <span class="score-box">{{ player2Score }}</span>
        </div>

        <div v-if="gameOver" class="status-message">
          <span v-if="winner">{{ winner }} VINDER!</span>
          <span v-else-if="isTie">KAMP UAFGJORT (11-11)</span>
        </div>
      </div>

      <div class="controls">
        <button class="btn btn-point" @click="addPointPlayer1" :disabled="gameOver">
          Point til Spiller 1
        </button>
        
        <button class="btn btn-point" @click="addPointPlayer2" :disabled="gameOver">
          Point til Spiller 2
        </button>
        
        <button class="btn btn-reset" @click="resetGame">
          Nulstil Spil
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.scoreboard-container {
  display: flex;
  justify-content: center;
  padding: 40px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.scoreboard-casing {
  background-color: #245c3b; 
  background-image: repeating-linear-gradient(
    to bottom,
    #245c3b,
    #245c3b 48px,
    #1d4a2f 48px,
    #1d4a2f 52px
  );
  padding: 40px 30px;
  border-radius: 4px; 
  box-shadow: 0 15px 35px rgba(0,0,0,0.6), inset 0 0 15px rgba(0,0,0,0.3);
  width: 100%;
  max-width: 500px;
  border: 4px solid #1a422a;
}

.title {
  color: #f1c40f;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-top: 0;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5); 
}

.screen {
  background-color: transparent;
  border: none;
  padding: 0;
  margin-bottom: 35px;
}

.player-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.player-name {
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
}

.score-box {
  background-color: #f9f9f9;
  color: #111; 
  font-family: 'Arial Black', Arial, sans-serif; 
  font-size: 4rem;
  padding: 10px 25px;
  border-radius: 4px;
  min-width: 80px;
  text-align: center;
  box-shadow: 0 6px 10px rgba(0,0,0,0.4), inset 0 -3px 5px rgba(0,0,0,0.05);
  border: 1px solid #ccc;
  border-top: 5px solid #e0e0e0; 
}

.status-message {
  text-align: center;
  color: #f1c40f; 
  background-color: rgba(0, 0, 0, 0.4); 
  padding: 15px;
  border-radius: 4px;
  margin-top: 25px;
  font-size: 1.4rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}


.controls {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 20px;
  border-top: 2px solid #1d4a2f; 
}

.btn {
  border: none;
  padding: 12px 20px;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}

.btn-point {
  background-color: #fdfdfd;
  color: #1a422a;
}

.btn-point:hover:not(:disabled) {
  background-color: #e0e0e0;
  transform: translateY(-2px);
}

.btn-point:disabled {
  background-color: #95a5a6;
  color: #ecf0f1;
  cursor: not-allowed;
  opacity: 0.6;
  box-shadow: none;
}

.btn-reset {
  background-color: #c0392b;
  color: white;
  width: 100%;
  margin-top: 10px;
}

.btn-reset:hover {
  background-color: #e74c3c;
  transform: translateY(-2px);
}
</style>