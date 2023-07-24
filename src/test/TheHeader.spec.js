import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from 'vuex'
import { describe, test, expect, vi } from 'vitest'
import TheHeader from '../components/layout/TheHeader.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('TheHeader.vue', () => {
    let actions
    let store

    beforeEach(() => {
        actions = {
            openModal: vi.fn(),
            selectFormMode: vi.fn(),
        }

        store = new Vuex.Store({
            modules: {
                form: {
                    actions
                },
            }
        })
    })


    test('Header "new article" button should open modal window and set mode to create', () => {
        const wrapper = shallowMount(TheHeader, { store, localVue })
        wrapper.find('button').trigger('click')
        expect(actions.openModal).toHaveBeenCalled()
        expect(actions.selectFormMode).toHaveBeenCalled()
    })

})
