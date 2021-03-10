import React, { forwardRef } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Flex, Box } from "@motion-system/flexbox";
import { Text, Loader } from "@motion-system/core";
import {
  ResponsiveForm,
  FormContext,
  useFormContext,
  ResponsiveError,
  ResponsiveReceipt,
  FormLink,
  ResponsiveInput,
  ResponsiveSubmit,
  ResponsiveSubmitLoader,
  useEffectAfterMount,
} from "./context";

function Web3Form({ children, ...rest }) {
  const [hasMounted, setHasMounted] = React.useState(false);
  const toggleFlag = React.useCallback((setState) => setState((state) => !state), []);

  useEffectAfterMount(() => {
    toggleFlag(setHasMounted);
  }, []);
  const value = React.useMemo(() => ({ hasMounted }), [hasMounted]);
  return (
    <FormContext.Provider value={value}>
      <ResponsiveForm variant="lexdao" {...rest}>
        {children}
      </ResponsiveForm>
    </FormContext.Provider>
  );
}
const ResponsiveFormTitle = forwardRef((props, ref) => {
  return <Text ref={ref} variant="title" {...props} />;
});

const ResponsiveFormDetail = forwardRef((props, ref) => {
  return <Text ref={ref} variant="detail" width="266px" margin="auto" __css={{ overflow: "hidden" }} {...props} />;
});

const Input = forwardRef((props, ref) => {
  const { hasMounted } = useFormContext();
  return (
    <React.Fragment>
      <Flex
        width="300px"
        height="80px"
        mx="auto"
        mb={["16px"]}
        className="form-item"
        flexDirection="column"
        background="linear-gradient(103.8deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 100.69%)"
        boxShadow="0px 16px 32px rgba(134, 124, 210, 0.2)"
        __css={{ backdropFilter: "blur(30px)" }}
        borderRadius="20px">
        <Flex className="form-label-container" flexDirection="row" verticalAlign="top" mt="10px" ml="18px">
          <Box className="form-label" width={["30%"]}>
            <Text variant="label">{props?.label}</Text>
          </Box>
          <Box className="form-error" textAlign="left" minWidth={["70%"]} mt="3px" mr="10px">
            <ErrorMessage
              errors={props?.errors}
              name={props?.name}
              render={({ message }) => <ResponsiveError>{message}</ResponsiveError>}
            />
          </Box>
        </Flex>
        <Flex className="form-input-container" flexDirection="row" mt="7px" ml="18px">
          <ResponsiveInput
            name={props?.name}
            placeholder={props?.placeHolder}
            ref={ref}
            className="form-input"
            variant="lexdao"
            {...props}
          />
        </Flex>
      </Flex>
    </React.Fragment>
  );
});

function Submit({ children, loading, ...rest }) {
  const { hasMounted } = useFormContext();
  return loading ? (
    <React.Fragment>
      <Flex mx="auto" className="form-submit" flexDirection="column">
        <ResponsiveSubmitLoader {...rest}>
          <Loader />
        </ResponsiveSubmitLoader>
      </Flex>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Flex mx="auto" className="form-submit" flexDirection="column">
        <ResponsiveSubmit {...rest}>{children}</ResponsiveSubmit>
      </Flex>
    </React.Fragment>
  );
}
function Error({ children, error, ...rest }) {
  const { hasMounted } = useFormContext();

  return error ? (
    <React.Fragment>
      <Flex mx="auto" mt={["16px"]}>
        <ResponsiveError width="266px" mx="auto" textAlign="center" fontSize="12px" {...rest}>
          {error}
        </ResponsiveError>
      </Flex>
    </React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
}
function Receipt({ children, receipt, ...rest }) {
  const { hasMounted } = useFormContext();
  const json2String = (value) => {
    try {
      return JSON.stringify(value, null, 2);
    } catch (e) {
      return false;
    }
  };

  return receipt ? (
    <React.Fragment>
      <Flex mx="auto" mt={["16px"]}>
        <ResponsiveReceipt width="266px" mx="auto" textAlign="center" {...rest}>
          {json2String(receipt)}
        </ResponsiveReceipt>
      </Flex>
    </React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
}

function ExporerLink({ children, url, ...rest }) {
  const { hasMounted } = useFormContext();
  return url ? (
    <React.Fragment>
      <Flex mx="auto" mt={["16px"]}>
        <ResponsiveReceipt width="266px" mx="auto" textAlign="center" fontSize="12px" {...rest}>
          <FormLink href={url}>{url}</FormLink>
        </ResponsiveReceipt>
      </Flex>
    </React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
}

/////////////REACT-HOOK-FORM HELPERS////////////////
const registerAddress = {
  required: "This field is required",
  pattern: {
    value: /^0x[a-fA-F0-9]{40}$/,
    message: "Invalid ethereum address",
  },
  setValueAs: (value) => value,
};
const registerUint256 = {
  required: "This field is required",
  pattern: {
    value: /^[0-9]+$/,
    message: "Invalid amount",
  },
  setValueAs: (value) => value,
};
const registerBytes32 = {
  required: "This field is required",
  validate: {
    isValidJSON: (value) => {
      try {
        JSON.parse(value);
        console.log(JSON.parse(value));
      } catch (e) {
        return "Failed to parse JSON";
      }
      return true;
    },
  },

  setValueAs: (value) => value,
};
const registerBytes = {
  required: "This field is required",
  pattern: {
    value: /^0x[a-fA-F0-9]+$/,
    message: "Invalid hex in call data",
  },
  setValueAs: (value) => value,
};
/////////////COMPOUND COMPONENT////////////////
Web3Form.Title = ResponsiveFormTitle;
Web3Form.Detail = ResponsiveFormDetail;
Web3Form.Input = Input;
Web3Form.Submit = Submit;
Web3Form.Error = Error;
Web3Form.Receipt = Receipt;
Web3Form.ExporerLink = ExporerLink;
Web3Form.registerAddress = registerAddress;
Web3Form.registerUint256 = registerUint256;
Web3Form.registerBytes32 = registerBytes32;
Web3Form.registerBytes = registerBytes;

export default Web3Form;
