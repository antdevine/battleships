import { useGame } from '@/composables/useGame';

test('starting a game resets state and adds ships', () => {
  const {
    startGame,
    board,
    ships,
    gameStarted
  } = useGame();

  startGame('Player 1');

  expect(gameStarted.value).toBe(true);
  expect(ships.every(s => s.qtySank === 0)).toBe(true);
  let totalShips = 0;
  for (let i = 1; i <= 10; i++) {
    for (const cell of Object.values(board.value[i])) {
      if (cell.isShip) totalShips++;
    }
  }
  expect(totalShips).toBeGreaterThan(0);
});
