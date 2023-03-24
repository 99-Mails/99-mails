import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuButtonProps,
  forwardRef,
  ButtonGroup,
  Button,
  ButtonProps,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react";
import { useState } from "react";

export interface MenuWrapperProps extends MenuButtonProps {
  cb: Fn;
  onChange: Fn;
  data: any[];
}

const MenuWrapper = forwardRef<MenuWrapperProps, "button">((props, ref) => {
  const { cb, onChange, data, ...rest } = props;

  return (
    <Menu
      isLazy
      eventListeners={true}
      flip={true}
      preventOverflow={true}
      boundary="clippingParents"
      placement="auto-end"
      strategy="absolute"
    >
      <MenuButton ref={ref} {...rest}>
        <ChevronDownIcon />
      </MenuButton>
      <MenuList>
        <MenuOptionGroup onChange={(e) => onChange(e)}>
          {data.map((item, index) => (
            <MenuItemOption
              data-testid="menu-wrapper-button"
              key={index}
              value={item}
              onClick={() => cb(item)}
            >
              {item}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
});

export interface MenuButtonContainerProps extends ButtonProps {
  initialValue: string;
  onChange: Fn;
  data: any[];
}

const MenuButtonContainer = forwardRef<MenuButtonContainerProps, "button">(
  (props, ref) => {
    const { initialValue, data, onChange, ...restProps } = props;
    const [value, setValue] = useState(initialValue);

    return (
      <ButtonGroup isAttached variant="outline">
        <Button data-testid="menu-button" ref={ref} {...restProps} size="sm">
          + {value}
        </Button>
        <MenuWrapper
          disabled={false}
          data={data}
          cb={setValue}
          onChange={onChange}
          data-testid="menu-wrapper"
        />
      </ButtonGroup>
    );
  }
);

export { MenuButtonContainer };
export { MenuWrapper };
