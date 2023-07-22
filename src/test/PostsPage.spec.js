import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import { describe, test, expect, vi } from "vitest";
import PostsPage from "../views/PostsPage.vue";
const localVue = createLocalVue();

localVue.use(Vuex);

describe("PostsPage.vue", () => {
  let actions;
  let store;
  let getters;
  let wrapper;
  let mockRoute;
  let mockRouter;

  beforeEach(() => {
    actions = {
      getPosts: vi.fn(),
      getAuthors: vi.fn(),
      getPostDetailId: vi.fn(),
      closeInfoModal: vi.fn(),
      getCurrentPost: vi.fn(),
      getSearchedPosts: vi.fn(),
      getAllPosts: vi.fn(),
      getPages: vi.fn(),
    };

    getters = {
      posts: () => [
        {
          title: "Naujausias article",
          body: "naujausias tikrai",
          authorId: 2,
          created_at: "2023-07-19",
          updated_at: "2023-07-19",
          id: 1,
        },
        {
          title: "NewArticleTest",
          body: "JuozasJuozasJuozas",
          authorId: 2,
          created_at: "2023-07-19",
          updated_at: "2023-07-19",
          id: 2,
        },
      ],
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
      formMode: () => "create",
      createModalIsOpen: () => false,
      postsLength: () => 9,
      searchTerm: () => "",
      searchedPosts: () => [],
    };

    store = new Vuex.Store({
      modules: {
        posts: {
          actions,
          getters,
        },
        pagination: {
          actions,
          getters,
        },
        search: {
          actions,
          getters,
        },
        form: {
          actions,
        },
        infoModal: {
          actions,
          getters,
        },
      },
    });

    mockRoute = {
      params: {
        id: 1,
      },
    };
    mockRouter = {
      push: vi.fn(),
    };
    wrapper = shallowMount(PostsPage, {
      store,
      localVue,
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
    });
  });

  test("Should fetch and render posts with authors and pagination", () => {
    expect(actions.getPosts).toHaveBeenCalled();
    expect(actions.getAuthors).toHaveBeenCalled();
    expect(wrapper.findAllComponents({ name: "ArticleCard" }).exists()).toBe(
      true
    );
    expect(wrapper.findComponent({ name: "ThePagination" }).exists()).toBe(
      true
    );
  });
  test('Should not render "There are no posts here"', () => {
    expect(wrapper.find("h2").exists()).toBe(false);
  });
  test("Should get post id when clicked on article card and redirect to another route", async () => {
    const card = wrapper.findAllComponents({ name: "ArticleCard" });
    await card.at(0).trigger("clickCard");
    await wrapper.vm.getPostId();
    expect(actions.getPostDetailId).toHaveBeenCalled();
    expect(actions.getCurrentPost).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledOnce();
    expect(mockRouter.push).toHaveBeenCalledWith("/postDetail/" + mockRoute.id);
  });

  test("Should not render the dynamic form component", () => {
    expect(wrapper.find(".modal-dynamic-component").exists()).toBe(false);
  });

  test("Should call getPosts  when current page is updated and search term is empty", () => {
    wrapper.vm.$store.state.pagination.currentPage = 2;
    expect(actions.getPosts).toHaveBeenCalled();
  });
});
