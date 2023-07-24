import createWrapper from "./mockFactory";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import { describe, test, expect } from "vitest";
import ArticleCard from "../components/article/ArticleCard.vue";
const localVue = createLocalVue();
localVue.use(Vuex);

describe("ArticleCard.vue", () => {
  let store;
  let wrapper;
  let actions;

  beforeEach(() => {
    actions = {
      openModal: vi.fn(),
      selectFormMode: vi.fn(),
      getEditId: vi.fn(),
      openInfoModal: vi.fn(),
      getDeleteId: vi.fn(),
    };

    store = new Vuex.Store({
      modules: {
        posts: {
          actions,
        },
        form: {
          actions,
        },
        infoModal: {
          actions,
        },
        postActions: {
          actions,
        },
      },
    });
    wrapper = shallowMount(ArticleCard, {
      localVue,
      store,
      propsData: {
        author: "Author",
        title: "Title",
        date: "Date",
        id: 1,
      },
    });
  });

  test("Article card to contain required text", () => {
    expect(wrapper.find("h2").text()).toBe("Author");
    expect(wrapper.find("h3").text()).toBe("Title");
    expect(wrapper.find("p").text()).toBe("Date");
  });

  test("Article card should emit clickCard event", () => {
    wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("clickCard");
  });

  test("Article cards edit button should open modal window, set mode to edit and get the edit id", async () => {
    wrapper.findComponent(".editButton").trigger("click");
    expect(actions.openModal).toHaveBeenCalled();
    expect(actions.selectFormMode).toHaveBeenCalled();
    expect(actions.getEditId).toHaveBeenCalled();
  });

  test("Article cards delete button should open info modal window and get the delete id", async () => {
    wrapper.findComponent(".deleteButton").trigger("click");
    expect(actions.openInfoModal).toHaveBeenCalled();
    expect(actions.getDeleteId).toHaveBeenCalled();
  });
});
