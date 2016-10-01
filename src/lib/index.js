

// Returns all items from invList not in the user's selection where an invList item is a list (of choices)
export const inverter = function (selection, invList) {
  var unselectedItems = []
  for (var inv of invList) {
    if (typeof(inv) === "object") {
      for (var i of inv) {
        if (i !== selection) {
          unselectedItems.push(i)
        }
      }
    }
  }
  return unselectedItems
}
