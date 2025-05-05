import { mount } from "@vue/test-utils";
import TargetShipSelect from "@/components/targetShipSelect.vue";

describe("TargetShipSelect.vue", () => {
  it("emits targetShipCordinates with selected row and column", async () => {
    const wrapper = mount(TargetShipSelect);

    await wrapper.find("select").setValue("B");
    await wrapper.findAll("select")[1].setValue("5");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted()).toHaveProperty("targetShipCordinates");
    expect(wrapper.emitted().targetShipCordinates[0][0]).toEqual({
      column: "B",
      row: "5",
    });
  });
});
