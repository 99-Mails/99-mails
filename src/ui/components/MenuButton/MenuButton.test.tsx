import { vi, it, expect } from "vitest";
import { render, screen, userEvent } from "../../../tests/test-utils";
import { MenuButtonContainer } from "./MenuButton";

it("should render correctly", () => {
  const fruitList = ["apple", "banana", "orange"];
  const selectedFruit = vi.fn();

  const { asFragment } = render(
    <MenuButtonContainer
      data={fruitList}
      initialValue="apple"
      onChange={selectedFruit}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should show the initial value correctly", async () => {
  const fruitList = ["apple", "banana", "orange"];
  const selectedFruit = vi.fn();

  render(
    <MenuButtonContainer
      data={fruitList}
      initialValue="apple"
      onChange={selectedFruit}
    />
  );

  expect(await screen.findByTestId("menu-button")).toHaveTextContent("apple");
});

// TODO: fix vitest console error
// When testing, code that causes React state updates should be wrapped into act(...):

// act(() => {
//   /* fire events that update state */
// });
// /* assert on the output */

// This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
//     at Menu (file:///Users/mahdi/Projects/temp-email/node_modules/@chakra-ui/menu/dist/chunk-6BD5HRZF.mjs:22:11)
//     at /Users/mahdi/Projects/temp-email/src/ui/components/MenuButton/MenuButton.tsx:10:11
//     at div
//     at Styled(div) (/Users/mahdi/Projects/temp-email/node_modules/@emotion/react/dist/emotion-element-b63ca7c6.cjs.dev.js:43:23)
//     at ChakraComponent (file:///Users/mahdi/Projects/temp-email/node_modules/@chakra-ui/system/dist/chunk-E32MZNBA.mjs:42:35)
//     at ButtonGroup2 (file:///Users/mahdi/Projects/temp-email/node_modules/@chakra-ui/button/dist/chunk-PEYICJIL.mjs:36:7)
//     at /Users/mahdi/Projects/temp-email/src/ui/components/MenuButton/MenuButton.tsx:42:13
// Warning: An update to MenuItemOption inside a test was not wrapped in act(...).
it("should show the menu when it's clicked", async () => {
  const user = userEvent.setup();

  const fruitList = ["apple", "banana", "orange"];
  const selectedFruit = vi.fn();

  const { container } = render(
    <MenuButtonContainer
      data={fruitList}
      initialValue="apple"
      onChange={selectedFruit}
    />
  );

  const MenuWrapper = await screen.findByTestId("menu-wrapper");

  await user.click(MenuWrapper);

  fruitList.forEach((fruit) => {
    expect(container).toHaveTextContent(fruit);
  });
});

it("should change the value of button when an item in menu is clicked", async () => {
  const user = userEvent.setup();

  const fruitList = ["apple"];
  const selectedFruit = vi.fn();

  const { container } = render(
    <MenuButtonContainer
      data={fruitList}
      initialValue="banana"
      onChange={selectedFruit}
    />
  );

  const MenuWrapper = await screen.findByTestId("menu-wrapper");

  await user.click(MenuWrapper);

  const MenuWrapperItem = await screen.findByTestId("menu-wrapper-button");

  await user.click(MenuWrapperItem);

  expect(await screen.findByTestId("menu-button")).toHaveTextContent("apple");
});
