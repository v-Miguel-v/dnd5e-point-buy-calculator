"use strict";
//* Base Scores
const strengthBase = document.getElementById("strength-base");
const dexterityBase = document.getElementById("dexterity-base");
const constitutionBase = document.getElementById("constitution-base");
const intelligenceBase = document.getElementById("intelligence-base");
const wisdomBase = document.getElementById("wisdom-base");
const charismaBase = document.getElementById("charisma-base");
const allAbilitiesBase = [strengthBase, dexterityBase, constitutionBase, intelligenceBase, wisdomBase, charismaBase];
allAbilitiesBase.forEach(ability => {
	ability.min = 7;
	ability.max = 16;
	ability.value = 8;
	ability.addEventListener("change", updateResults);
});

//* Racial Bonuses
const strengthRacialBonus = document.getElementById("strength-racial-bonus");
const dexterityRacialBonus = document.getElementById("dexterity-racial-bonus");
const constitutionRacialBonus = document.getElementById("constitution-racial-bonus");
const intelligenceRacialBonus = document.getElementById("intelligence-racial-bonus");
const wisdomRacialBonus = document.getElementById("wisdom-racial-bonus");
const charismaRacialBonus = document.getElementById("charisma-racial-bonus");
const allAbilitiesRacialBonus = [strengthRacialBonus, dexterityRacialBonus, constitutionRacialBonus, intelligenceRacialBonus, wisdomRacialBonus, charismaRacialBonus];
allAbilitiesRacialBonus.forEach(racialBonus => {
	racialBonus.value = 0;
	racialBonus.addEventListener("change", updateResults);
});

//* Final Scores
const strengthFinalScore = document.getElementById("strength-final-score");
const dexterityFinalScore = document.getElementById("dexterity-final-score");
const constitutionFinalScore = document.getElementById("constitution-final-score");
const intelligenceFinalScore = document.getElementById("intelligence-final-score");
const wisdomFinalScore = document.getElementById("wisdom-final-score");
const charismaFinalScore = document.getElementById("charisma-final-score");

//* Modifiers
const strengthModifier = document.getElementById("strength-modifier");
const dexterityModifier = document.getElementById("dexterity-modifier");
const constitutionModifier = document.getElementById("constitution-modifier");
const intelligenceModifier = document.getElementById("intelligence-modifier");
const wisdomModifier = document.getElementById("wisdom-modifier");
const charismaModifier = document.getElementById("charisma-modifier");
const allModifiers = [strengthModifier, dexterityModifier, constitutionModifier, intelligenceModifier, wisdomModifier, charismaModifier];

//* Costs
const strengthCost = document.getElementById("strength-cost");
const dexterityCost = document.getElementById("dexterity-cost");
const constitutionCost = document.getElementById("constitution-cost");
const intelligenceCost = document.getElementById("intelligence-cost");
const wisdomCost = document.getElementById("wisdom-cost");
const charismaCost = document.getElementById("charisma-cost");
const allCosts = [];

//* Available and Remaining Points
const availablePoints = document.getElementById("available-points");
const remainingPoints = document.getElementById("remaining-points");
availablePoints.addEventListener("change", reset);


//* Functions
function calculateModifier(score) {
	const value = Number(score);
	const result = Math.floor((0.5 * (value-1)) - 4.5);
	if (result > 0) return `+${result}`;
	else return result;
}

function calculateCost(score) {
	const scoreValue = Number(score);
	let result = null;

	if (scoreValue >= 6 || scoreValue <= 13) result = scoreValue - 8;
	if (scoreValue > 13) result = (scoreValue - 8) + sequenceUpperResolutor(scoreValue);
	if (scoreValue < 6) result = (scoreValue - 8) + sequenceLowerResolutor(scoreValue);

	return result;
}

function sequenceUpperResolutor(value) {
	const term = value - 14;
	if (term < 0) return null;

	let sum = 1; // Cantidad que se va a sumar
	let result = 0;
	for (let step=0; step<=term; step++) {
		if (step !== 0 && step % 2 === 0) sum++; 	// Si estamos en un paso (step) par, la cantidad que se va a sumar aumenta en 1.
		result += sum; 								// Cada nuevo paso (step) se le suma la cantidad "sum" al resultado.
	}

	return result;
}

function sequenceLowerResolutor(value) { // Es idéntica a la otra, pero los resultados deben ser negativos para los pasos (steps) menores que 6 a la vez que mantiene el mismo ritmo de crecimiento que para cuando es mayor a 14.
	const term = (value - 5);
	if (term > 0) return null;

	let sum = 14;
	for (let step=0; step>term; step--) {
		sum += 2;
	}
	const result = term + sum;

	return (sequenceUpperResolutor(result) * -1);
}

function updateResults() {
	// Final Scores
	strengthFinalScore.innerText = Number(strengthBase.value) + Number(strengthRacialBonus.value);
	dexterityFinalScore.innerText = Number(dexterityBase.value) + Number(dexterityRacialBonus.value);
	constitutionFinalScore.innerText = Number(constitutionBase.value) + Number(constitutionRacialBonus.value);
	intelligenceFinalScore.innerText = Number(intelligenceBase.value) + Number(intelligenceRacialBonus.value);
	wisdomFinalScore.innerText = Number(wisdomBase.value) + Number(wisdomRacialBonus.value);
	charismaFinalScore.innerText = Number(charismaBase.value) + Number(charismaRacialBonus.value);

	// Modifiers
	strengthModifier.innerText = calculateModifier(strengthFinalScore.innerText);
	dexterityModifier.innerText = calculateModifier(dexterityFinalScore.innerText);
	constitutionModifier.innerText = calculateModifier(constitutionFinalScore.innerText);
	intelligenceModifier.innerText = calculateModifier(intelligenceFinalScore.innerText);
	wisdomModifier.innerText = calculateModifier(wisdomFinalScore.innerText);
	charismaModifier.innerText = calculateModifier(charismaFinalScore.innerText);
	allModifiers.forEach(modifier => {
		const value = Number(modifier.innerText);
		if (value > 0) modifier.style.color = "blue";
		if (value === 0) modifier.style.color = "grey";
		if (value < 0) modifier.style.color = "red";
	});

	// Costs
	strengthCost.innerText = calculateCost(strengthBase.value);
	dexterityCost.innerText = calculateCost(dexterityBase.value);
	constitutionCost.innerText = calculateCost(constitutionBase.value);
	intelligenceCost.innerText = calculateCost(intelligenceBase.value);
	wisdomCost.innerText = calculateCost(wisdomBase.value);
	charismaCost.innerText = calculateCost(charismaBase.value);
	allCosts[0] = Number(strengthCost.innerText);
	allCosts[1] = Number(dexterityCost.innerText);
	allCosts[2] = Number(constitutionCost.innerText);
	allCosts[3] = Number(intelligenceCost.innerText);
	allCosts[4] = Number(wisdomCost.innerText);
	allCosts[5] = Number(charismaCost.innerText);

	// Remaining Points
	remainingPoints.innerText = Number(availablePoints.value) - allCosts.reduce((sum, val) => sum+val);
	const rmPts = Number(remainingPoints.innerText);
	if (rmPts < 0) remainingPoints.style.color = "red";
	if (rmPts === 0) remainingPoints.style.color = "grey";
	if (rmPts > 0) remainingPoints.style.color = "initial";
}

function reset() {
	remainingPoints.innerText = availablePoints.value;

	allAbilitiesBase.forEach(ability => {
		ability.min = 7;
		ability.max = 16;
		ability.value = 8;
	});

	allAbilitiesRacialBonus.forEach(racialBonus => {
		racialBonus.value = 0;
	});

	updateResults();
}

//* Execution
updateResults();