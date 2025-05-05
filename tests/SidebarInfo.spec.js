import { mount } from '@vue/test-utils';
import SidebarInfo from '@/components/sidebarInfo.vue';

describe('SidebarInfo.vue', () => {
  it('displays player name, ships, and attempts', () => {
    const wrapper = mount(SidebarInfo, {
      props: {
        ships: [{ type: 'Destroyer', qty: 2, qtySank: 1 }],
        attempts: 5,
        playerName: 'Alice',
      },
    });

    expect(wrapper.text()).toContain('Battleship Game - Player: Alice');
    expect(wrapper.text()).toContain('Destroyer: 1 remaining');
    expect(wrapper.text()).toContain('Attempts: 5');
  });
});