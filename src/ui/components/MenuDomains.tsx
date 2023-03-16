import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButtonProps,
  forwardRef,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { INITIAL_DOMAIN } from "../../constants/domain";
import { Domain } from "../../domains/Domain";
import { useDomain } from "../../services/api";

interface MenuDomainProps extends MenuButtonProps {
  setValue: (domain: Domain) => void;
}

const MenuDomains = forwardRef<MenuDomainProps, "button">((props, ref) => {
  const { listDomains } = useDomain();
  const { data, loading: loadingDomains } = listDomains();

  const { setValue, ...rest } = props;

  return (
    <Menu isLazy>
      <MenuButton
        ref={ref}
        px={2}
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        _hover={{ bg: "gray.400" }}
        _focus={{ boxShadow: "outline" }}
        {...rest}
      >
        <ChevronDownIcon />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={(e) => setValue(INITIAL_DOMAIN)}>
          Random Address
        </MenuItem>
        <MenuDivider />
        {!loadingDomains &&
          data.domains.map((domain) => (
            <MenuItem
              key={domain.id}
              value={domain.id}
              onClick={(e) => setValue(domain)}
            >
              {domain.name}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
});

const MenuDomainContainer = ({ domain, setDomain, onClick }) => {
  return (
    <ButtonGroup isAttached variant="outline">
      <Button
        isLoading={false}
        loadingText={"Creating Address..."}
        onClick={onClick}
        size="sm"
      >
        + {domain.name}
      </Button>
      <MenuDomains disabled={false} setValue={setDomain} />
    </ButtonGroup>
  );
};

export default MenuDomainContainer;
