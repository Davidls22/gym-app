const React = require("react");
const renderer = require("react-test-renderer");
const App = require("./App").default;

test("App component matches snapshot", () => {
  const component = renderer.create(React.createElement(App));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
