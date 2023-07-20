import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from 'vuex'
import pagination from "../store/pagination";
import { describe, test, expect, vi } from 'vitest'
import ThePagination from '../components/layout/ThePagination.vue'
import pagination from "../store/pagination";

const localVue = createLocalVue()

localVue.use(Vuex)

describe('ThePagination.vue', () => {
    let actions
    let store

    beforeEach(() => {
        actions = {
            getCurrentPage: vi.fn(),
            getPages: vi.fn(),
        }

        store = new Vuex.Store({
            modules: {
                pagination: {
                    actions,
                    getters: pagination.getters
                },
            }
        })
    })

    test('Should render pages based on the pages number', async () => {
        const wrapper = shallowMount(ThePagination, { store, localVue })


    })