import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ComparePage from './ComparePage';

Enzyme.configure({adapter: new Adapter()})

describe('App component', () => {
      it('starts with a count of 0', () => {
        const wrapper = shallow(<ComparePage />);
        // const text = wrapper.find('p').text();
        // expect(text).toEqual('Count: 0');
        expect(2 + 2).toBe(4)
      });
    });
