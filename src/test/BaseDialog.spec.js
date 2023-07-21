import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import BaseDialog from '../components/UI/BaseDialog.vue'



const localVue = createLocalVue()

localVue.use(Vuex)

describe('BaseDialog.vue', () => {

    let store
    let actions
    let getters


    beforeEach(() => {
        actions = {
            closeModal: vi.fn(),
            createNewPost: vi.fn(),
            editPost: vi.fn()
        }
        getters = {
            authors: () => ['Evelyn', 'Bob'],
            formMode: () => 'create',
            editId: () => 1
        }
        store = new Vuex.Store({
            modules: {
                form: {
                    actions,
                    getters
                },
                posts: {
                    getters
                },
                postActions: {
                    actions,
                    getters
                }
            }
        })
    })

    test('Renders slots correctly', () => {
        const wrapper = shallowMount(BaseDialog, {
            localVue,
            store,
            slots: {
                header: 'Header content',
                button: 'Button content'
            }
        })
        expect(wrapper.html()).toContain('Header content')
        expect(wrapper.html()).toContain('Button content')
    })

    test('shows the author select element when formMode is "create"', () => {
        const wrapper = shallowMount(BaseDialog, {
            localVue,
            store,
        });
        const authorSelect = wrapper.find('select#author');
        expect(authorSelect.exists()).toBe(true);
    })


    it("validates the title, author and content field correctly", async () => {
        const wrapper = shallowMount(BaseDialog, {
            localVue,
            store
        });
        await wrapper.find("#title").setValue("");
        expect(wrapper.vm.titleIsValid).toBe(false);

        await wrapper.find("#title").setValue("Test Title");
        expect(wrapper.vm.titleIsValid).toBe(true);

        await wrapper.find("textarea").setValue("Test content");
        expect(wrapper.vm.contentIsValid).toBe(true);

        await wrapper.find(".select-options").findAll('option').at(0).setSelected({});
        expect(wrapper.vm.authorIsValid).toBe(true);

        await wrapper.find(".select-options").findAll('option').at(0).setSelected({ name: 'Evelyn', id: 1 });
        expect(wrapper.vm.authorIsValid).toBe(true);


    });


    test("triggers 'closeModal' action when the Close Modal button is clicked", async () => {
        const wrapper = shallowMount(BaseDialog, {
            localVue,
            store
        });
        await wrapper.find(".close-btn").trigger("click");
        expect(actions.closeModal).toHaveBeenCalled();
    });

    test('validates the title field', async () => {
        const wrapper = shallowMount(BaseDialog, {
            localVue,
            store,
        });
        const titleInput = wrapper.find('#title');
        const contentTextarea = wrapper.find('#content');
        const authorSelect = wrapper.find('#author');

        await titleInput.setValue('');
        await titleInput.trigger('blur');
        expect(wrapper.vm.titleIsValid).toBe(false);

        await contentTextarea.setValue('');
        await contentTextarea.trigger('blur');
        expect(wrapper.vm.contentIsValid).toBe(false);

        await authorSelect.find(".select-options").findAll('option').at(0).setSelected({});
        await authorSelect.trigger('focusout');
        expect(wrapper.vm.authorIsValid).toBe(false);

    });

    test('submits the form in create mode when all fields are valid', async () => {
        const wrapper = shallowMount(BaseDialog, {
            localVue,
            store,
        });

        const titleInput = wrapper.find('#title');
        const contentTextarea = wrapper.find('#content');
        const authorSelect = wrapper.find('select');
        await titleInput.setValue('Title');
        await contentTextarea.setValue('Content long 10');
        await authorSelect.find(".select-options").findAll('option').at(0).setSelected({ name: 'Evelyn', id: 1 });

        const form = wrapper.find('form');
        await form.trigger('submit.prevent');

        await wrapper.vm.$nextTick()

        expect(actions.createNewPost).toHaveBeenCalledWith({
            title: 'Title',
            body: 'Content long 10',
            authorId: 1,
            created_at: '2023-07-21',
            updated_at: '2023-07-21',
        });

        expect(actions.closeModal).toHaveBeenCalled();
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/');
    });

    test('submits the form in edit mode when all fields are valid', async () => {
        const wrapper = shallowMount(BaseDialog, {
            localVue,
            store,
            computed: {
                formMode: 'edit'
            }
        });
        const titleInput = wrapper.find('#title');
        const contentTextarea = wrapper.find('#content');
        await titleInput.setValue('Title');
        await contentTextarea.setValue('Content long 10');
        const form = wrapper.find('form');
        await form.trigger('submit.prevent');

        wrapper.vm.formSubmit()

        expect(actions.editPost).toHaveBeenCalledWith({
            title: 'Title',
            body: 'Content long 10',
            id: 1,
            updated_at: '2023-07-21',
        });

        expect(actions.closeModal).toHaveBeenCalled();
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/');
    });
})