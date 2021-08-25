const { test, expect } = require('@jest/globals');
const validateEntry = require('../untis/validateEntry');

test('validateEntry() returns null when all properties exist', ()=>{
    const obj = {name: 'John'};

    expect(validateEntry(obj, 'name')).toBe(null);
});

test('validateEntry() return an object when a property is missing', ()=>{
    const obj = {name: 'John', job: ''};

    expect(validateEntry(obj, 'name', 'occupation')).toEqual(
        expect.objectContaining({
            error: expect.stringContaining('No occupation specified')
        })
    );
});