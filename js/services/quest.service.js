'use strict'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null

// const STORAGE_KEY = 'QuestTreeDB'

function createQuestsTree() {
  gQuestsTree = createQuest('Male?')
  gQuestsTree.yes = createQuest('Gandhi')
  gQuestsTree.no = createQuest('Rita')
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
  gCurrQuest = res==='yes'? gQuestsTree.yes : gQuestsTree.no
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {

  gPrevQuest[lastRes] = createQuest(newQuestTxt)
  gPrevQuest[lastRes].yes = createQuest(newGuessTxt)
  gPrevQuest[lastRes].no = createQuest(gCurrQuest)
}

function getCurrQuest() {
  return gCurrQuest
}
