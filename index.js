let player = 
{
    name: "Robert",
    credits: 200
}
let cards = [];
let sum = 0;

let compCards = []
let compSum = 0;

let hasBlackJack = false;
let stillOnGame = false;
let message = "";

let messageEl = document.getElementById("message-el")

let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")

let compSumEl = document.getElementById("computerSum-el")
let compCardsEl = document.getElementById("compuetCards-el")

let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + " : $" + player.credits

function startGame()
{
    hasBlackJack = false;
    stillOnGame = true;

    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard;

    let firstCompCard = getRandomCard();
    let secondCompCard = getRandomCard();
    compCards = [firstCompCard , secondCompCard]
    compSum = firstCompCard + secondCompCard

    renderGame()
}

function renderGame()
{
    cardsEl.textContent = "Karty: "

    for (let i = 0; i < cards.length; i++) 
    {
        cardsEl.textContent += cards[i] + " "
    }
    compCardsEl.textContent = "Karty: "
    compSumEl.textContent = "Wynik: ";
    sumEl.textContent = "Wynik: " + sum;


    if(sum < 21 && compSum < 21)
    {
        messageEl.style.color = "white"
        messageEl.style.fontSize = "x-large";
        message = "Chcesz dobrac karte?"
    }
    else if (sum === 21 || compSum === 21)
    {
        if(sum === 21 && compSum === 21)
        {
            messageEl.style.fontSize = "x-large";
            message = "REMIS!"
            hasBlackJack = true;

        }
        else if(sum === 21)
        {
            message = "Masz BlackJack!"
            messageEl.style.color = "gold"
            messageEl.style.fontSize = "x-large";
            player.credits += 25;
            hasBlackJack = true;
        }
        else if(compSum === 21)
        {
            message = "Komputer ma BlackJack!"
            messageEl.style.fontSize = "x-large";
            messageEl.style.color = "black"
            player.credits -= 25;
            hasBlackJack = true;
        }
        showCompStats()
    }
    else if(sum > 21 || compSum > 21)
    {
        if(sum > 21 && compSum > 21)
        {
            message = "Nikt nie wygrywa!"
            messageEl.style.fontSize = "x-large";
            stillOnGame = false;
        }
        else if(sum > 21)
        {
            message = "Przegrywasz"
            messageEl.style.color = "red"
            messageEl.style.fontSize = "x-large";
            player.credits -= 20;
            stillOnGame = false;
        }
        else if(compSum > 21)
        {
            message = "Wygrywasz!"
            messageEl.style.color = "green"
            messageEl.style.fontSize = "x-large";
            player.credits += 20;
            stillOnGame = false;
        }
        showCompStats()
    }
    playerEl.textContent = player.name + " : $" + player.credits
    messageEl.textContent = message;
    console.log(compSum);
    console.log(sum);
}

function newCard()
{
    if(stillOnGame === true && hasBlackJack === false)
    {
        let newCard = getRandomCard()
        let compNewCard = getRandomCard()
        sum += newCard;
        cards.push(newCard);

        if(compSum < 17 && compSum < sum)
        {
            compSum += compNewCard;
            compCards.push(compNewCard)
        }
        renderGame()
    }
}

function getRandomCard()
{   
    let random = Math.floor(Math.random() * 13) + 1

    if(random > 10)
        return 10;
    else if(random === 1)
        return 11;
    else
        return random;
}

function pass()
{   

    if(compSum < 17 && sum > compSum)
    {
        let compNewCard = getRandomCard()
        compSum += compNewCard;
        compCards.push(compNewCard)
        if(compSum < 17 && sum > compSum)
        {
        let qwe = getRandomCard()
            compSum += qwe;
            compCards.push(qwe)
        }  
        if(compSum < 17 && sum > compSum)
        {
            let ert = getRandomCard()
            compSum += ert;
            compCards.push(ert)
        }      
    }    
    renderGame()
    
    if(stillOnGame === true)
    {
        if(sum < 21 && compSum < 21)
        {
            if(sum > compSum)
            {
                message = "Wygrywasz!"
                messageEl.style.color = "green"
                messageEl.style.fontSize = "x-large";
                player.credits += 20;
                stillOnGame = false;
                
            }
            
            else if (sum < compSum)
            {
                message = "Przegrywasz!"
                messageEl.style.color = "red"
                messageEl.style.fontSize = "x-large";
                player.credits -= 20;
                stillOnGame = false;
            }
            
            else if ( sum === compSum)
            {
                message = "Remis"
                stillOnGame = false;
            }
            showCompStats()
        }
        playerEl.textContent = player.name + " : $" + player.credits
        messageEl.textContent = message;
    }
}

function showCompStats()
{
    for (let index = 0; index < compCards.length; index++) 
    {
        compCardsEl.textContent += compCards[index] + " "    
    }
    compSumEl.textContent = "Sum: " + compSum;
}