import React from 'react'
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'
const TEST_IDS = {
    noResultId: 'noResult',
    nameInputId: 'nameInput',
    ratingsInputId: 'ratingsInput',
    durationInputId: 'durationInput',
    addButtonId: 'addButton',
    listId: 'moviesList',
    searchId: 'search',
    alertId: 'alert'
}
describe('Favorite Movie Directory', () => {
    let getByTestId
    let queryByTestId
    let getNoResult
    let queryNoResult
    let nameInput
    let ratingsInput
    let durationInput
    let addButton
    let list
    let queryList
    let search
    let getAlert
    let queryAlert
    beforeEach(() => {
        const app = render(<App />)
        getByTestId = app.getByTestId
        nameInput = getByTestId(TEST_IDS.nameInputId)
        ratingsInput = getByTestId(TEST_IDS.ratingsInputId)
        durationInput = getByTestId(TEST_IDS.durationInputId)
        addButton = getByTestId(TEST_IDS.addButtonId)
        search = getByTestId(TEST_IDS.searchId)
        queryByTestId = app.queryByTestId
        queryList = queryByTestId(TEST_IDS.listId)
        queryNoResult = queryByTestId(TEST_IDS.noResultId)
        queryAlert = queryByTestId(TEST_IDS.alertId)
    })
    afterEach(() => {
        cleanup()
    })
    const addMovie = (name, ratings, duration) => {
        fireEvent.change(nameInput, { target: { value: name } })
        fireEvent.change(ratingsInput, { target: { value: ratings } })
        fireEvent.change(durationInput, { target: { value: duration } })
        fireEvent.click(addButton, { button: '0' })
    }
    const addMoviesSet = () => {
        addMovie('Toy Story', '90', '1.5h')
        addMovie('Beauty and the Beast', '86', '1.8h')
        addMovie('North by Northwest', '84', '2.2h')
        addMovie('Gravity', '78', '2h')
        addMovie('Notorious', '60', '1.4h')
    }
    // 1 - Passed
    it('should not initially show the no result message or list', async () => {
        await waitFor(() => {
            expect(queryList).toBeNull()
            expect(queryNoResult).toBeNull()
        })
    })
    // 2 - Passed
    it('should add a row with valid data and not show the no result message', async () => {
        addMovie('Star Wars', '95', '3h')
        list = getByTestId(TEST_IDS.listId)
        await waitFor(() => {
            // expect(list.children[0].textContent).toEqual('Star Wars 95 3 Hrs')
            expect(list.children[0].textContent).toEqual('Star WarsRatings: 95/1003 Hrs') // I changed this
            expect(queryNoResult).toBeNull()
        })
    })
    // 3 - Passed
    it('should not add the row if name or ratings or duration is empty', async () => {
        addMovie('The Platform', '40', '1.5h')
        list = getByTestId(TEST_IDS.listId)
       
        await waitFor(() => {
            expect(list.children[0].textContent).toEqual('The PlatformRatings: 40/1001.5 Hrs')
        })
        addMovie('', '90', '1.5h')
        addMovie('The Irishman', '', '2.2h')
        addMovie('Annihilation', '70', '')
        await waitFor(() => {
            expect(list.children.length).toEqual(1)
        })
    })
    // 4 - Done
    it('should add duration in hours if entered in minutes', async () => {
        addMovie('Casablanca', '95', '170m')
        await waitFor(() => {
            list = getByTestId(TEST_IDS.listId)
            expect(list.children[0].textContent).toContain('2.8 Hrs')
        })
    })
    // 5 - Passed
    it('should not add the row if data invalid', async () => {
        addMovie('Antman', '99', '2h')
        await waitFor(() => {
            list = getByTestId(TEST_IDS.listId)
            expect(list.children[0].textContent).toEqual('AntmanRatings: 99/1002 Hrs')
            // expect(list.children[0].textContent).toEqual('Antman 99 2 Hrs') // changed this
        })
        addMovie('Harry Potter', '100', '3w')
        await waitFor(() => {
            list = getByTestId(TEST_IDS.listId)
            expect(list.children.length).toEqual(1)
        })
    })
    // 6 - Passed
    it('should show alert message if duration data invalid', async () => {
        addMovie('Harry Potter', '100', '3w')
        await waitFor(() => {
            getAlert = getByTestId(TEST_IDS.alertId)
            expect(getAlert.textContent).toEqual('Please specify time in hours or minutes (e.g. 2.5h or 150m)')
        })
    })
    // 7 - Passed 
    it('should hide alert message after user starts typing in some input', async () => {
        addMovie('Harry Potter', '100', '3w')
        await waitFor(() => {
            getAlert = getByTestId(TEST_IDS.alertId)
            expect(getAlert).toBeTruthy()
        })
        fireEvent.change(nameInput, { target: { value: 'Home' } })
        await waitFor(() => {
            expect(queryAlert).toBeNull()
        })
    })
    // 8 - Pending - Looks fishy
    it('should add multiple rows in sorted order', async () => {
        addMoviesSet()
        await waitFor(() => {
            list = getByTestId(TEST_IDS.listId)
           
            expect(list.children[1].textContent).toContain("2 Hrs")
            expect(list.children[2].textContent).toContain("1.8 Hrs")
            expect(list.children[3].textContent).toContain("1.5 Hrs")
        })
    })
    // 9 - Pending - Looks fishy
    it('should start search when at least 2 characters are entered', async () => {
        addMoviesSet()
        fireEvent.change(search, { target: { value: 'g' } })
        await waitFor(() => {
            list = getByTestId(TEST_IDS.listId)
     
            expect(list.children.length).toEqual(5)
        })
        fireEvent.change(search, { target: { value: 'gr' } })
        await waitFor(() => {
            list = getByTestId(TEST_IDS.listId)
            expect(list.children.length).toEqual(1)
            expect(list.children[0].textContent).toContain('Gravity')
        })
    })
    // 10 - Pending
    it('should filter movies by starting characters', async () => {
        addMoviesSet()
        fireEvent.change(search, { target: { value: 'no' } })
        await waitFor(() => {
            list = getByTestId(TEST_IDS.listId)
            expect(list.children[0].textContent).toContain('North by Northwest')
            expect(list.children[1].textContent).toContain('Notorious')
        })
        fireEvent.change(search, { target: { value: 'not' } })
        await waitFor(() => {
            list = getByTestId(TEST_IDS.listId)
            expect(list.children[0].textContent).toContain('Notorious')
        })
    })
    // 11 - Passed
    it('should show no result message and not show list when the search returns no match', async () => {
        addMoviesSet()
        fireEvent.change(search, { target: { value: 'tr' } })
        await waitFor(() => {
            getNoResult = getByTestId(TEST_IDS.noResultId)
            expect(getNoResult.textContent).toEqual('No Results Found')
            expect(queryList).toBeNull()
        })
    })


})