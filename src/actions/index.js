export const SHOW_NEXT_SECTION = "SHOW_NEXT_SECTION"
export const SHOW_NEXT_CHAPTER = "SHOW_NEXT_CHAPTER"
export const UPDATE_INVENTORY = "UPDATE_INVENTORY"
export const SET_EXPANSIONS = "SET_EXPANSIONS"
export const UPDATE_STATE_COUNTER = "UPDATE_STATE_COUNTER"

// Show the next section of text
export const showNextSection = (increment=1) => {
  return {
    type: SHOW_NEXT_SECTION,
    increment
  }
}

// Show the next chapter
export const showNextChapter = (chapter) => {
  return {
    type: SHOW_NEXT_CHAPTER,
    chapter
  }
}

// Initialize the expansions set
export const setExpansions = (exps, tag, currentExpansion) => {
  var expansions = {}
  expansions[tag] = {currentExpansion: currentExpansion, expansions: exps}
  return {
    type: SET_EXPANSIONS,
    expansions
  }
}

// Update the user's inventory list
// Data is a mapping of key/values based on the user selection
export const updateInventory = (sel, tag) => {
  return {
    type: UPDATE_INVENTORY,
    sel,
    tag
  }
}
// Update the atomic counter for the current state change
export const updateStateCounter = (counter) => {
  return {
    type: UPDATE_STATE_COUNTER,
    counter
  }
}
