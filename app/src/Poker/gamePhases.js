export const dealCommunityCards = (deck, phase) => {
    let cardsToDeal = 0;
    switch (phase) {
      case 'flop':
        cardsToDeal = 3;
        break;
      case 'turn':
      case 'river':
        cardsToDeal = 1;
        break;
      default:
        return [];
    }
  
    return deck.splice(0, cardsToDeal);
  };
  
  export const getNextPhase = (currentPhase) => {
    const phases = ['pre-flop', 'flop', 'turn', 'river', 'showdown'];
    const index = phases.indexOf(currentPhase);
    return phases[index + 1] || 'showdown';
  };
  