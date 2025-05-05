import { mount } from "@vue/test-utils";
import BoardGrid from "@/components/boardGrid.vue";

describe("BoardGrid.vue", () => {
  it("renders grid with ship icons when showShipLocations is true", () => {
    const board = {
      1: {
        A: { isShip: true, isHit: false, isMiss: false, isShipSunk: false },
      },
      2: {
        A: { isShip: false, isHit: true, isMiss: false, isShipSunk: false },
      },
    };
    const letters = ["A"];

    const wrapper = mount(BoardGrid, {
      props: {
        board,
        letters,
        showShipLocations: true,
      },
    });

    expect(wrapper.text()).toContain("🚢");
    expect(wrapper.text()).toContain("💥");
  });
});
