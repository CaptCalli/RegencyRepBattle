var playerName = prompt('Enter your name please');
const monsterHealthBar = document.getElementById('bingham-health');
const playerHealthBar = document.getElementById('player-health');
const bonusLifeEl = document.getElementById('bonusLife');
const attackBtn = document.getElementById('attack-btn');
const strongAttackBtn = document.getElementById('strong-attack-btn');
const healBtn = document.getElementById('heal-btn');

const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17
const BINGHAM_ATTACK_VALUE = 14;
const HEAL_VALUE = 10;


if (playerName === "") {
	playerName = "Your";
} else {
	playerName += "'s";
}

document.getElementById("playerName").innerHTML = playerName + " Reputation";

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

function adjustHealthBars(maxLife) {
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
}

function dealMonsterDamage(damage) {
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}

function resetGame(value) {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
  bonusLifeEl.textContent = "1";
}

function removeBonusLife() {
  bonusLifeEl.textContent = "0";
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}

function reset(){
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
  hasBonusLife = true;
}


function endRound(){
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(BINGHAM_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if(currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("You're almost ruined, but got a bonus due to a charitable act!");

  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0){
    alert("Congratulations, you have ruined Mrs. Bingham's Reputation!");
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("Oh no! Mrs. Bingham has ruined your reputation!");
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("You have both suffered reputation loss, it's a Draw.");
    reset();
  }
}

function attackMonster(mode){
  const damage = dealMonsterDamage(mode);
  currentMonsterHealth -= damage;
  endRound();
}



function attackHandler(){
  attackMonster(ATTACK_VALUE);
}


function strongAttackHandler(){
  attackMonster(STRONG_ATTACK_VALUE);
}

function healPlayerHandler(){
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
    alert("You can't heal to more than your max health.");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  endRound(); 
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);