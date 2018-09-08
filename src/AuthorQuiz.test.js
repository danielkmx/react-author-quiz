import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, { mount,shallow,render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter() });

const state = {
  turnData: {
    books: ['Cray Sunday', 'A new Leaf', 'The offshore Pirate', 'Bernice Bobs Her hair'],
   author: {
      name: ' F. SCOTT FITZGERALD',
      imageUrl: 'images/scott_fitzgerald.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['Cray Sunday', 'A new Leaf', 'The offshore Pirate', 'Bernice Bobs Her hair']
  }
  },
  highlight: 'none'
}

it('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}} />,div);
});

describe("When no awnser has been selected", () => {
let wrapper;
beforeAll(() => {
  wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={()=> {}} />)
});
it("should have white bg color", () => {
  expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
});

});
describe("When the wrong awnser has been selected", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
    <AuthorQuiz {...(Object.assign({},state,{highlight: 'wrong'}))} onAnswerSelected={() => {}} />)

    });
    it('should have a red background color',() => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('red');
    });
  });
  describe("When the correct awnser has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
      <AuthorQuiz {...(Object.assign({},state,{highlight: 'correct'}))} onAnswerSelected={() => {}} />)
  
      });
      it('should have a green background color',() => {
        expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('green');
      });
    });
    describe("When the first answer is selected",() => {
      let wrapper;
      const handleAnswerSelected = jest.fn();
      beforeAll(() => {
        wrapper = mount(
          <AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} />
        );
        wrapper.find('.answer').first().simulate('click');
      });
      it("onAnswerSelected should be called", () => {
        expect(handleAnswerSelected).toHaveBeenCalled();
      });
      it("selected answer should be Cray Sunday, A new Leaf", () => {
        expect(handleAnswerSelected).toHaveBeenCalledWith("Cray Sunday");
      });
    })