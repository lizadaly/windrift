export const SHOW_NEXT_SECTION = "SHOW_NEXT_SECTION"
export const SHOW_NEXT_CHAPTER = "SHOW_NEXT_CHAPTER"
export const UPDATE_INVENTORY = "UPDATE_INVENTORY"
export const REPLACE_INVENTORY = "REPLACE_INVENTORY"
export const SET_EXPANSIONS = "SET_EXPANSIONS"
export const UPDATE_STATE_COUNTER = "UPDATE_STATE_COUNTER"
export const GET_CONFIG = "GET_CONFIG"

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

// Go to the chapter by index value

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
// Replace any existing instance of this tag in the inventory, rather
// than adding
export const replaceInventory = (sel, tag) => {
  return {
    type: REPLACE_INVENTORY,
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
export const getConfig = (config) => {
  return {
    type: GET_CONFIG,
    config
  }
}
