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
import type { Domain } from "../../domains/Domain";
import { useListDomains } from "../../services/api";

interface MenuDomainProps extends MenuButtonProps {
  setValue: (domain: Domain) => void;
}

const MenuDomains = forwardRef<MenuDomainProps, "button">((props, ref) => {
  const { data, loading: loadingDomains } = useListDomains();

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
          data.domains.map((domain: Domain) => (
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

const MenuDomainContainer = ({
  domain,
  setDomain,
  onClick,
}: {
  domain: Domain;
  setDomain: () => void;
  onClick: () => void;
}) => {
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
