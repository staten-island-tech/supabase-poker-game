export function getStoredMoney() {
  const storedMoney = localStorage.getItem('money')
  return storedMoney ? parseInt(storedMoney, 10) : 0
}

export function incrementMoney(currentMoney) {
  const newMoney = currentMoney + 1
  localStorage.setItem('money', newMoney)
  return newMoney
}
