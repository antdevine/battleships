import { mount } from "@vue/test-utils";
import StartGameForm from "@/components/startGameForm.vue";

describe("StartGameForm.vue", () => {
  it("emits startGame event with player name", async () => {
    const wrapper = mount(StartGameForm);
    await wrapper.find("input").setValue("Bob");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted()).toHaveProperty("startGame");
    expect(wrapper.emitted().startGame[0]).toEqual(["Bob"]);
  });
});
