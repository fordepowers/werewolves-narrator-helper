// @Author - Ford Powers, January 4th, 2019

/* Global Variables */
let PlayersHashTable = {};
let NumberOfWereWolves = 0;
let WhatHappenedLastNight;
var BadGuys = 0;
var GoodGuys = 0;
var NumberOfPlayers;
let LoveLinkHashTable = {};
let LoversDeadAlready;
let DogIsOut;
// var Howl = new Audio("http://soundbible.com/grab.php?id=1291&type=mp3");

/**
 * Left for my wife, Meg Rose.
 * We always used to make this sound randomly.
 */
function EasterEgg() {
  let MegSound = new Audio("https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Small+Mouth+pop+sound&filename=od/ODc3MTQ0MzEwODc3MjQw_Pqvf2yhLezc.mp3");
  MegSound.play();
}

/**
 * Plays the introduction page, if the user declines, it breaks the program.
 */
function IntroductionPage() {
  if (confirm("Press 'Ok' to play Werewolves.")) {
    // Howl.play();
  } else {
    document.getElementById("middleDisplay").style.animation = "fading 1.5s";
    document.getElementById("middleDisplay").style.opacity = "1";
    throw new Error;
  }
}

/**
 * Handles the selection of the number of players,
 * and inputting them into a an object based on their names.
 */
function NumberOfPlayersFunction() {
  let nameDisplayObject = [`Players:`];
  let Ok = false;
  while (Ok === false) {
    NumberOfPlayers = parseInt(prompt('How many players are there?')) // Initialize number of players
    let notANumber = isNaN(NumberOfPlayers)
    // Make sure a right value was chosen.
    if (NumberOfPlayers <= 3) {
      alert("-That's not enough players!")
      Ok = false;
    } else if (NumberOfPlayers === '' ||
      NumberOfPlayers === null ||
      notANumber
    ) {
      alert("-That's not a number!")
      Ok = false
    } else {
      Ok = true
    }
  }
  Ok = false
  // Populates the hash table for the players
  for (let i = 0; i < NumberOfPlayers; i++) {
    let Ok = false
    while (Ok === false) {
      let plusone = i + 1
      let inputString = prompt(`Enter the name of Player ${plusone}`)
      if (inputString === '' || inputString === null || inputString === ' ') {
        alert("That won't work!")
        Ok = false
      } else if (PlayersHashTable[inputString] === 'Villager') {
        alert("-There's already someone called that!")
        Ok = false
      } else {
        Ok = true
        PlayersHashTable[inputString] = 'Villager'
        nameDisplayObject.push(inputString)
      }
    }
  }
  alert(
    nameDisplayObject.join(`
    `)
  )
}

/**
 * Is responsible for prompting and storing the Werewolves
 */
function ChooseWerewolves() {
  for (let i = 0; i < NumberOfWereWolves; i++) {
    let Ok = false
    var plusone = i + 1
    while (Ok === false) {
      let currentPlayerName = prompt(`Enter the name of Werewolf ${plusone}`)
      if (PlayersHashTable[currentPlayerName] !== 'Villager') {
        alert("-That's not a player!")
        Ok = false
      } else if (PlayersHashTable[currentPlayerName] === 'Werewolf') {
        alert("-There's already a werewolf called that!")
        Ok = false
      } else {
        PlayersHashTable[currentPlayerName] = 'Werewolf'
        Ok = true
      }
    }
    BadGuys = BadGuys + 1 // Adds one to the bad guy counter
  }
}
/**
 * Function that handles prompting and storing the given character,
 * provided with the character you want to store them as.
 * @param {*} Character - Name of the character to be designated
 */
function ChoosePlayerCharacter(Character) {
  let Ok = false
  while (Ok === false) {
    let currentPlayerName = prompt(`Enter the name of the ${Character}`)
    if (PlayersHashTable[currentPlayerName] !== 'Villager') {
      alert("-That won't work!")
      Ok = false
    } else {
      PlayersHashTable[currentPlayerName] = `${Character}`
      Ok = true
    }
  }
}

/**
 * Is responsible for calculating and prompting for the different characters in each game
 */
function ChooseCharacters() {
  BadGuys = 0 // Initialize the bad guys in the game
  // This series of if statements determines how many of each character to prompt for
  if (NumberOfPlayers <= 4) {
    NumberOfWereWolves = 1
    ChooseWerewolves()
    ChoosePlayerCharacter('Doctor')
  } else if (NumberOfPlayers <= 5) {
    NumberOfWereWolves = 2
    ChooseWerewolves()
    ChoosePlayerCharacter('Doctor')
    ChoosePlayerCharacter('Little Girl')
  } else if (NumberOfPlayers <= 8) {
    NumberOfWereWolves = 2
    ChooseWerewolves()
    ChoosePlayerCharacter('Doctor')
    ChoosePlayerCharacter('Little Girl')
    ChoosePlayerCharacter('Cupid')
  } else if (NumberOfPlayers <= 12) {
    var wolves = 3
    NumberOfWereWolves = wolves
    ChooseWerewolves()
    ChoosePlayerCharacter('Doctor')
    ChoosePlayerCharacter('Little Girl')
    ChoosePlayerCharacter('Cupid')
    ChoosePlayerCharacter('Demon Butler')
    ChoosePlayerCharacter('Demon Dog')
    BadGuys = BadGuys + 1
  } else {
    var wolves = NumberOfPlayers / 3
    NumberOfWereWolves = wolves
    ChooseWerewolves()
    ChoosePlayerCharacter('Doctor')
    ChoosePlayerCharacter('Little Girl')
    ChoosePlayerCharacter('Cupid')
    ChoosePlayerCharacter('Demon Butler')
    ChoosePlayerCharacter('Demon Dog')
    BadGuys = BadGuys + 1
    ChoosePlayerCharacter('Old Man')
  }
  GoodGuys = NumberOfPlayers - BadGuys // Initialize the good guys in the game
}

/**
 * Function that kills a specific person by setting their character tag as 'dead' for later removal.
 * @param {*} deadPerson - The person to be killed
 * @param {*} whatKilledThem - The group/person/cause killing them
 */
function KillSomeone(deadPerson, whatKilledThem) {
  if (deadPerson != SavedPerson) {
    if (PlayersHashTable[deadPerson] === 'Werewolf') {
      BadGuys = BadGuys - 1
    } else if (PlayersHashTable[deadPerson] === 'Demon Dog') {
      BadGuys = BadGuys - 1
    } else if (PlayersHashTable[deadPerson] === 'Old Man') {
      OldManRevenge = true
      GoodGuys = GoodGuys - 1;
    } else if (PlayersHashTable[deadPerson] === 'dead') {
      WhatHappenedLastNight = WhatHappenedLastNight + `the ${whatKilledThem} killed the already dying ${deadPerson}, ` // Add this event to the print out
      return;
    } else {
      GoodGuys = GoodGuys - 1
    }
    WhatHappenedLastNight = WhatHappenedLastNight + `the ${whatKilledThem} killed ${deadPerson}, ` // Add this event to the print out
    PlayersHashTable[deadPerson] = 'dead'; // Set them as dead for the undertaker to clean up after
    CheckLoveLink(deadPerson);
  } else {
    WhatHappenedLastNight = WhatHappenedLastNight + `the ${whatKilledThem} tried to kill ${deadPerson}, but they were saved by the Doctor, ` // Add this to the print out
  }
}

/**
 * Function displays the current status of the game, with the Players Object,
 * and how many Good and Bad Guys are left.
 */
function WhosWho() {
  let output = JSON.stringify(PlayersHashTable)
  let output1 = output.replace('{', '')
  let output2 = output1.replace('}', '')
  let output3 = output2.replace(/"/g, '')
  let output4 = output3.replace(/:/g, ': ')
  let output5 = output4.replace(
    /,/g,
    `
    `
  )
  alert(
    `Players Left: 
    ` +
    output5 +
    `
Good Guys: ${GoodGuys}
Bad Guys: ${BadGuys}`
  )
}

/**
 * Handles the WereWolves selecting who they want to kill.
 */
function PromptWereWolves() {
  let Ok = false
  while (Ok === false) {
    deadPerson = prompt('Who do the Werewolves want to kill?')
    if (PlayersHashTable[deadPerson] === undefined) {
      alert("-That's not a player!")
      Ok = false
    } else if (PlayersHashTable[deadPerson] === 'Werewolf') {
      alert("-That's a fellow Werewolf!")
      Ok = false
    } else {
      Ok = true
    }
  }
  // Calls the KillSomeone function and passes the deadperson to it
  KillSomeone(deadPerson, 'Werewolves')
}

/**
 * Handles the Doctor selecting who they want to save
 */
function PromptDoctor() {
  let Ok = false
  while (Ok === false) {
    SavedPerson = prompt('Who does the Doctor want to save?')
    if (PlayersHashTable[SavedPerson] === undefined) {
      alert("-That's not a player!")
      Ok = false
    } else {
      Ok = true
    }
  }
  WhatHappenedLastNight =
    WhatHappenedLastNight + `the Doctor saved ${SavedPerson}, ` // Add the event to the print out
}

/**
 * Handles the Little Girl receiving her instructions
 */
function PromptLittleGirl() {
  confirm('Tell the Little Girl her rules.')
}

/**
 * Handles Cupid selecting who they want to love link
 */
function PromptCupid() {
  let Ok = false
  let loveLink1
  let loveLink2
  while (Ok === false) {
    loveLink1 = prompt('Who do you want to love link first?')
    if (PlayersHashTable[loveLink1] === undefined) {
      alert("-That's not a player!")
      Ok = false
    } else {
      Ok = true
    }
  }
  Ok = false
  while (Ok === false) {
    loveLink2 = prompt('Who do you want to love link second?')
    if (PlayersHashTable[loveLink2] === undefined) {
      alert("-That's not a player!")
      Ok = false
    } else if (loveLink1 == loveLink2) {
      alert("-That's the same player!")
      Ok = false
    } else {
      Ok = true
    }
  }
  LoveLinkHashTable[loveLink1] = `Love Linked 1`
  LoveLinkHashTable[loveLink2] = `Love Linked 2`
  alert(
    `Love Linked: 
    ` + `${loveLink1} & ${loveLink2} <3`
  )
  LoversDeadAlready = false
}

/**
 * Handles the Demon Butler deciding if they want to let the Demon Dog out
 */
function PromptDemonButler() {
  let Ok = false
  while (Ok === false) {
    inputString = prompt('Do you want to let your dog out for the night? Y/N')
    if (inputString === 'Y' || inputString === 'y' || inputString === 'yes') {
      DogIsOut = true
      Ok = true
    } else if (
      inputString === 'N' ||
      inputString === 'n' ||
      inputString === 'no'
    ) {
      DogIsOut = false
      Ok = true
    } else {
      alert("-That's not a Y or N.")
      Ok = false
    }
  }
  if (DogIsOut) {
    alert('The Demon Dog has been released!')
    WhatHappenedLastNight =
      WhatHappenedLastNight + 'the Demon Butler let out his dog, ' // Add this event to the print out
  } else {
    alert('The Demon Dog has been locked up.')
    WhatHappenedLastNight =
      WhatHappenedLastNight + 'the Demon Butler locked up his dog, ' // Add this event to the print out
  }
}

/**
 * Handles the Demon Dog selecting who they want to kill
 */
function PromptDemonDog() {
  let Ok = false
  while (Ok === false) {
    deadPerson = prompt('Who does the Demon Dog want to kill?')
    if (PlayersHashTable[deadPerson] === undefined) {
      alert("-That's not a player!")
      Ok = false
    } else if (PlayersHashTable[deadPerson] === 'Demon Dog') {
      alert("-You can't kill yourself!")
      Ok = false
    } else {
      Ok = true
    }
  }
  if (DogIsOut) {
    // Calls the KillSomeone function and passes the deadperson to it
    KillSomeone(deadPerson, 'Demon Dog')
  } else {
    alert('The Demon Dog was not released tonight.')
  }
}

/**
 * Handles the OldMan selecting who they want to take with them
 */
function PromptOldMan() {
  let Ok = false
  if (OldManRevenge) {
    while (Ok === false) {
      deadPerson = prompt('Who does the Old Man want to take with him?')
      if (PlayersHashTable[deadPerson] === undefined) {
        alert("-That's not a player!")
        Ok = false
      } else {
        Ok = true
      }
    }
    // Calls the KillSomeone function and passes the deadperson to it
    KillSomeone(deadPerson, 'Old Man')
  }
}

/**
 * Function checks to see if one of the lovers has died. If they have, kills the other lover.
 */
function CheckLoveLink(deadPerson) {
  if (LoversDeadAlready === false) {
    // Check to make sure this method hasn't already killed someone
    if (LoveLinkHashTable[deadPerson] === undefined) {
      return
    } else {
      delete LoveLinkHashTable[deadPerson]
    }
    if (
      Object.values(LoveLinkHashTable).indexOf('Love Linked 1') > -1 ||
      Object.values(LoveLinkHashTable).indexOf('Love Linked 2') > -1
    ) {
      let personToKill = Object.keys(LoveLinkHashTable)
      alert(`${deadPerson} died, and ${personToKill[0]} was love linked, so they died too!`); // Alert this in case the trial happens
      LoversDeadAlready = true // Make sure this method doesn't run again
      KillSomeone(personToKill[0], `pain of ${deadPerson}'s death`)
    }
  }
}

/**
 * Function handles the trial during the day, and executing someone if it happens.
 */
function DayTrial() {
  let Ok = false;
  SavedPerson = null // Reset the saved person
  let deadPerson;
  if (Object.keys(PlayersHashTable).length > 2) {
    // If the player count is greater than 2, run the trial.
    while (Ok === false) {
      deadPerson = prompt('Who will the villagers execute?')
      if (PlayersHashTable[deadPerson] === undefined) {
        alert("-That's not a player!")
        Ok = false;
      } else {
        Ok = true;
      }
    }
    alert(`The Village has executed ${deadPerson}`);
    KillSomeone(deadPerson, "Village");
  } else {
    alert('There are not enough villagers for a trial...')
  }
}

/**
 * Handles the act of playing the game until all of one side are dead.
 */
function PlayGame() {
  for (let i = 1; BadGuys != 0 && GoodGuys != 0; i++) {
    WhatHappenedLastNight = 'Last night, ' // This is the string that prints out the events.
    alert(`Night ${i}`) // Start of the night ---

    SavedPerson = null // Reset the saved person
    if (Object.values(PlayersHashTable).indexOf('Doctor') > -1) { PromptDoctor() } // Doctor goes first so that way he can save people
    if (i === 1) {
      if (Object.values(PlayersHashTable).indexOf('Little Girl') > -1) { PromptLittleGirl() }
      if (Object.values(PlayersHashTable).indexOf('Cupid') > -1) { PromptCupid() }
    }
    if (Object.values(PlayersHashTable).indexOf('Demon Butler') > -1) {
      PromptDemonButler()
    } else {
      DogIsOut = true
    }
    if (Object.values(PlayersHashTable).indexOf('Demon Dog') > -1) { PromptDemonDog() }
    if (Object.values(PlayersHashTable).indexOf('Old Man') > -1) { PromptOldMan() }
    if (Object.values(PlayersHashTable).indexOf('Werewolf') > -1) { PromptWereWolves() } // Wolves go last so that way they don't kill the dog first

    // Delete everyone who died
    CallTheUndertaker();

    // End of the Night
    WhatHappenedLastNight = WhatHappenedLastNight.slice(0, -2);
    WhatHappenedLastNight = WhatHappenedLastNight + '.';
    alert(WhatHappenedLastNight) // Print event list from the night
    WhosWho();

    alert(`Day ${i}`); // Start of the day and trial ---
    DayTrial();

    // Delete everyone who died
    CallTheUndertaker();

    WhosWho()
  }
}

/**
 * Calls the Undertaker to remove all the dead players from the Hash Table, by deleting them.
 * After checking to see if anyone died, it loops through and removes the dead ones.
 */
function CallTheUndertaker() {
  if (Object.values(PlayersHashTable).indexOf("dead") > -1) {
    for (var player in PlayersHashTable) {  
      if (PlayersHashTable[player] === "dead") {
        delete PlayersHashTable[player];
      }
    }
  }
}

/**
 * Handles the end game results being displayed and who won.
 */
function GameOver() {
  if (BadGuys == 0) {
    alert('The villagers win!')
  } else {
    alert('The bad guys win!')
  }
  location.reload()
}

/**
 * Main function, handles the Intro for the game,
 * the number of players being entered, the entering
 * of the player names, the character choosing,
 * and actually playing the game until completion.
 */
function PlayWerewolves() {
  document.getElementById('middleDisplay').style.animation = 'fadeOut 1.5s'
  document.getElementById('middleDisplay').style.opacity = '0'
  setTimeout(function () {
    IntroductionPage()
    NumberOfPlayersFunction()
    ChooseCharacters()
    PlayGame()
    GameOver()
  }, 1500)
}

/**
 * Function that outputs the roles for a given number of
 * players in the game.
 */
function GetRolesOutput() {
  var players = document.getElementById('roles-input').value
  let roles = []
  let outputBadGuys = 0
  let outputGoodGuys = 0
  if (players < 4) {
    roles.push('Not enough players...')
  } else if (players == 4) {
    roles.push("<span style='color: red'>1 Werewolf</span>")
    outputBadGuys = outputBadGuys + 1
    roles.push("<span style='color: green'>1 Doctor</span>")
    roles.push('2 Villagers')
  } else if (players <= 5) {
    roles.push("<span style='color: red'>2 Werewolves</span>")
    outputBadGuys = outputBadGuys + 2
    roles.push("<span style='color: green'>1 Doctor</span>")
    roles.push("<span style='color: green'>1 Little Girl</span>")
    roles.push('1 Villager')
  } else if (players <= 8) {
    roles.push("<span style='color: red'>2 Werewolves</span>")
    outputBadGuys = outputBadGuys + 2
    roles.push("<span style='color: green'>1 Doctor</span>")
    roles.push("<span style='color: green'>1 Little Girl</span>")
    roles.push("<span style='color: green'>1 Cupid</span>")
    let villagers = players - outputBadGuys - 3
    roles.push(`${villagers} Villagers`)
  } else if (players <= 12) {
    roles.push("<span style='color: red'>3 Werewolves</span>")
    outputBadGuys = outputBadGuys + 3
    roles.push("<span style='color: green'>1 Doctor</span>")
    roles.push("<span style='color: green'>1 Little Girl</span>")
    roles.push("<span style='color: green'>1 Cupid</span>")
    roles.push("<span style='color: red'>1 Demon Dog</span>")
    outputBadGuys = outputBadGuys + 1
    roles.push("<span style='color: green'>1 Demon Butler</span>")
    let villagers = players - outputBadGuys - 4
    roles.push(`${villagers} Villagers`)
  } else {
    let wolves = Math.floor(players / 3)
    roles.push(`<span style='color: red'>${wolves} Werewolves</span>`)
    outputBadGuys = outputBadGuys + wolves
    roles.push("<span style='color: green'>1 Doctor</span>")
    roles.push("<span style='color: green'>1 Little Girl</span>")
    roles.push("<span style='color: green'>1 Cupid</span>")
    roles.push("<span style='color: red'>1 Demon Dog</span>")
    outputBadGuys = outputBadGuys + 1
    roles.push("<span style='color: green'>1 Demon Butler</span>")
    roles.push("<span style='color: green'>1 Old Man</span>")
    let villagers = players - outputBadGuys - 5
    roles.push(`${villagers} Villagers`)
  }
  outputGoodGuys = players - outputBadGuys
  roles.push(`Good Guys: <span style='color: green'>${outputGoodGuys}</span>`)
  roles.push(`Bad Guys: <span style='color: red'>${outputBadGuys}</span>`)
  roles.push(`<br>`)
  roles.push(`<br>`)
  roles.push(`<br>`)
  rolesString = roles.toString()
  rolesString = rolesString.replace(/,/g, `<br>`)
  document.getElementById('outputArea').innerHTML = rolesString
}
