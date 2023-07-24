import createWrapper from "./mockFactory";
import { describe, test, expect } from "vitest";
import ArticleCard from "../components/article/ArticleCard.vue";


describe("ArticleCard.vue", () => {

  let wrapper;

  beforeEach(() => {

    wrapper = createWrapper(ArticleCard, {
      propsData: {
        author: "Author",
        title: "Title",
        date: "Date",
        id: 1,
      },
    });
  });


  test("card to contain required text", () => {
    expect(wrapper.find("h2").text()).toBe("Author");
    expect(wrapper.find("h3").text()).toBe("Title");
    expect(wrapper.find("p").text()).toBe("Date");
  });

  test("card should emit clickCard event", () => {
    wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("clickCard");
  });

  test("cards edit button should open modal window, set mode to edit and get the edit id", async () => {
    wrapper.findComponent(".editButton").trigger("click");
    const spy = vi.spyOn(wrapper.vm.$store.modules.form.actions, 'openModal')
    expect(spy).toHaveBeenCalled();
    expect(selectFormMode).toHaveBeenCalled();
    expect(getEditId).toHaveBeenCalled();
  });

  test("cards delete button should open info modal window and get the delete id", async () => {
    wrapper.findComponent(".deleteButton").trigger("click");
    expect(openInfoModal).toHaveBeenCalled();
    expect(getDeleteId).toHaveBeenCalled();
  });
});
