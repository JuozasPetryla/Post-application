import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import { describe, test, expect, vi } from "vitest";
import PostDetailPage from "../views/PostDetailPage.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("PostDetailPage.vue", () => {
  let actions;
  let store;
  let getters;
  let wrapper;
  let mockRouter;

  beforeEach(() => {
    actions = {
      openModal: vi.fn(),
      selectFormMode: vi.fn(),
      openInfoModal: vi.fn(),
      getCurrentPost: vi.fn(),
      getAuthors: vi.fn(),
      getDeleteId: vi.fn(),
      getEditId: vi.fn(),
    };

    getters = {
      currentPostDetail: () => {
        return {
          title: "Naujausias article",
          body: "naujausias tikrai",
          authorId: 2,
          created_at: "2023-07-19",
          updated_at: "2023-07-19",
          id: 1,
        };
      },
      postDetailId: () => 1,
      formMode: () => "edit",
      createModalIsOpen: () => false,
      deleteId: () => 1,
      authors: () => [
        {
          id: 1,
          name: "Oliver",
          created_at: "2023-05-31",
          updated_at: "2023-05-31",
        },
        {
          id: 2,
          name: "Evelyn",
          created_at: "2023-05-31",
          updated_at: "2023-05-31",
        },
      ],
    };

    store = new Vuex.Store({
      modules: {
        posts: {
          actions,
          getters,
        },
        postActions: {
          actions,
          getters,
        },
        form: {
          actions,
          getters,
        },
        infoModal: {
          actions,
        },
      },
    });
    mockRouter = {
      push: vi.fn(),
    };

    wrapper = shallowMount(PostDetailPage, {
      localVue,
      store,
      mocks: {
        $router: mockRouter,
      },
    });
  });
  test("fetch post data initially", () => {
    expect(actions.getCurrentPost).toHaveBeenCalled();
    expect(actions.getAuthors).toHaveBeenCalled();
  });
  test("Render all of the post info", () => {
    expect(wrapper.find("h1").text()).toContain("Naujausias article");
    expect(wrapper.find("h2").text()).toContain("Evelyn");
    expect(wrapper.find(".post-body").text()).toContain("naujausias tikrai");
    expect(wrapper.find(".post-date").text()).toContain("2023-07-19");
  });
  test("Should not render the dynamic form component", () => {
    expect(wrapper.find(".modal-dynamic-component").exists()).toBe(false);
  });
  test("Should trigger open modal, set modal to edit and get the edit id when edit button clicked", async () => {
    await wrapper.find(".edit-btn").trigger("click");
    expect(actions.openModal).toHaveBeenCalled();
    expect(actions.selectFormMode).toHaveBeenCalled();
    expect(actions.getEditId).toHaveBeenCalled();
  });
  test("Should trigger open info modal and get the delete id when delete button clicked", async () => {
    await wrapper.find(".delete-btn").trigger("click");
    expect(actions.openInfoModal).toHaveBeenCalled();
    expect(actions.getDeleteId).toHaveBeenCalled();
  });
  test('Should trigger route change to "/" when go back is clicked', async () => {
    await wrapper.find(".back-btn").trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });
});
