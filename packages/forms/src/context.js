import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import {
  compose,
  space,
  layout,
  typography,
  color,
  flexbox,
  background,
  border,
  position,
  shadow,
} from "styled-system";
import shouldForwardProp from "@styled-system/should-forward-prop";

import { Box } from "@motion-system/flexbox";
import { Text } from "@motion-system/core";

export const FormContext = React.createContext();

export function useFormContext() {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error(`FormContext compound components cannot be rendered outside the FormContext component`);
  }
  return context;
}

export function useEffectAfterMount(cb, dependencies) {
  const justMounted = React.useRef(true);
  React.useEffect(() => {
    if (!justMounted.current) {
      return cb();
    }
    justMounted.current = false;
  }, dependencies);
}

const sx = (props) => css(props.sx)(props.theme);
const base = (props) => css(props.__css)(props.theme);
const variant = ({ theme, variant, tx = "variants" }) =>
  css(get(theme, tx + "." + variant, get(theme, variant)))(theme);

/////////////FORM COMPONENTS////////////////
export const MagicForm = styled(motion.form, {
  shouldForwardProp,
})(
  {
    boxSizing: "border-box",
    margin: 0,
    minWidth: 0,
  },
  base,
  variant,
  sx,
  (props) => props.css,
  compose(space, layout, typography, color, flexbox, background, border, position, shadow)
);

export const ResponsiveForm = forwardRef((props, ref) => {
  return (
    <MagicForm
      ref={ref}
      as="form"
      tx="form"
      py="25px"
      {...props}
      __css={{
        width: "359px",
        left: "0px",
        top: "0px",

        background: "linear-gradient(103.01deg, rgba(0, 0, 0, 0.5) 0.49%, rgba(0, 0, 0, 0.4) 100%)",
        boxShadow: "0px 16px 32px rgba(134, 124, 210, 0.2)",
        backdropFilter: "blur(50px)",
        /* Note: backdrop-filter has minimal browser support */

        borderRadius: "32px",
      }}
    />
  );
});

export const ResponsiveError = forwardRef((props, ref) => {
  return (
    <Text
      ref={ref}
      variant="error"
      {...props}
      __css={{ "::before": { display: "inline", content: '"⚠ "' }, overflow: "hidden" }}
    />
  );
});

export const ResponsiveReceipt = forwardRef((props, ref) => {
  return <Text ref={ref} variant="receipt" {...props} __css={{ overflow: "hidden" }} />;
});

export const FormLink = forwardRef((props, ref) => {
  return <Box ref={ref} as="a" tx="text" variant="link" {...props} __css={{ color: "darksalmon" }} />;
});

/////////////INPUT////////////////
export const MagicInput = styled(motion.input, {
  shouldForwardProp,
})(
  {
    boxSizing: "border-box",
    margin: 0,
    minWidth: 0,
  },
  base,
  variant,
  sx,
  (props) => props.css,
  compose(space, layout, typography, color, flexbox, background, border, position, shadow)
);

export const ResponsiveInput = forwardRef((props, ref) => {
  return (
    <MagicInput
      ref={ref}
      as="input"
      tx="input"
      {...props}
      __css={{
        fontSize: "22px",
        lineHeight: "26px",
        fontFamily: "heading",
        fontWeight: "normal",
        background: "transparent",
        color: "#FFFFFF",
      }}
    />
  );
});

/////////////SUBMIT BUTTON////////////////
export const MagicSubmit = styled(motion.input, {
  shouldForwardProp,
})(
  {
    boxSizing: "border-box",
    minWidth: 0,
  },
  base,
  variant,
  sx,
  (props) => props.css,
  compose(space, layout, typography, color, flexbox, background, border, position, shadow)
);

export const ResponsiveSubmit = forwardRef((props, ref) => {
  return (
    <MagicSubmit
      ref={ref}
      type="submit"
      as="input"
      tx="submit"
      width="295px"
      height="68px"
      borderRadius="20px"
      mx="auto"
      {...props}
      __css={{
        appearance: "none",
        display: "inline-block",
        fontFamily: "Apex Mk3",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "19px",
        textAlign: "center",
        letterSpacing: "1px",
        textTransform: "uppercase",
        color: "text",
        bg: "background",
      }}
    />
  );
});

export const ResponsiveSubmitLoader = forwardRef((props, ref) => {
  return (
    <MagicSubmit
      ref={ref}
      as="button"
      width="295px"
      height="68px"
      borderRadius="20px"
      disabled="true"
      mx="auto"
      {...props}
      __css={{
        appearance: "none",
        display: "inline-block",
        fontFamily: "Apex Mk3",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "19px",
        textAlign: "center",
        letterSpacing: "1px",
        textTransform: "uppercase",
        color: "text",
        bg: "background",
      }}
    />
  );
});
