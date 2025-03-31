'use strict'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null

const STORAGE_KEY = 'QuestTreeDB'

function getQuestsTree() {
  gQuestsTree = loadFromStorage(STORAGE_KEY)
  console.log('gQuestsTree:',gQuestsTree);

  if (!gQuestsTree) {
    console.log('CREATING MYSELF');
    
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
    saveToStorage(STORAGE_KEY, gQuestsTree)
  }

  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {

  gPrevQuest[lastRes] = createQuest(newQuestTxt)
  console.log('gPrevQuest[lastRes]:', gPrevQuest[lastRes]);
  console.log('newQuestTxt:', newQuestTxt);
  

  gPrevQuest[lastRes].yes = createQuest(newGuessTxt)
  console.log('\ngPrevQuest[lastRes].yes:', gPrevQuest[lastRes].yes);
  console.log('newGuessTxt:',newGuessTxt);


  gPrevQuest[lastRes].no = gCurrQuest
  console.log('\ngPrevQuest[lastRes].no:', gPrevQuest[lastRes].no);
  console.log('gCurrQuest:',gCurrQuest);


  saveToStorage(STORAGE_KEY, gQuestsTree)

}

function getCurrQuest() {
  return gCurrQuest
}
