import { useTranslation } from "@pancakeswap/localization";
import { Percent, ZERO_PERCENT } from "@pancakeswap/sdk";
import { useState, ReactNode } from "react";
import styled from "styled-components";

import { ExpandableLabel, Box, Grid, Text, Flex } from "../../components";
import { Footer, BulletList } from "../../components/RoiCalculatorModal/RoiCalculatorFooter";
import { toSignificant } from "./utils";

const StyledFooter = styled(Footer)`
  border-radius: 16px;
`;

interface Props {
  totalYield?: number | string;
  lpReward?: number | string;
  lpApr?: Percent;
  lpApy?: Percent;
  externalLink?: ReactNode;
  compoundIndex?: number;
}

export function Details({
  totalYield = 0,
  externalLink,
  lpReward = 0,
  lpApy = ZERO_PERCENT,
  lpApr = ZERO_PERCENT,
  compoundIndex = 0,
}: Props) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const compoundIndexToReadableText: { [key: number]: string | undefined } = {
    0: t("2x daily compound"),
    1: t("1x daily compound"),
    2: t("1x weekly compound"),
    3: t("1x monthly compound"),
  };
  const compoundText = compoundIndexToReadableText[compoundIndex] || "";

  const details = isExpanded ? (
    <Box px="8px">
      <Grid gridTemplateColumns="2.5fr 1fr" gridRowGap="8px" gridTemplateRows="repeat(2, auto)" mb="8px">
        <Text color="textSubtle" small>
          {t("Yield")}
        </Text>
        <Text small bold textAlign="right">
          ${toSignificant(totalYield)}
        </Text>
        <Text color="textSubtle" small style={{ textIndent: "1em" }}>
          {t("LP Fee Yield")}
        </Text>
        <Text small color="textSubtle" textAlign="right">
          ${toSignificant(lpReward)}
        </Text>
      </Grid>
      <Grid gridTemplateColumns="2.5fr 1fr" gridRowGap="8px" gridTemplateRows="repeat(2, auto)" mb="8px">
        <Text color="textSubtle" small>
          {t("APR")}
        </Text>
        <Text small bold textAlign="right">
          ${lpApr.toSignificant(5)}%
        </Text>
        <Text color="textSubtle" small style={{ textIndent: "1em" }}>
          {t("LP Fee APR")}
        </Text>
        <Text small color="textSubtle" textAlign="right">
          ${lpApr.toSignificant(5)}%
        </Text>
      </Grid>
      <Grid gridTemplateColumns="2.5fr 1fr" gridRowGap="8px" gridTemplateRows="repeat(1, auto)">
        <Text color="textSubtle" small>
          {t("APY")} {compoundText && `(${compoundText})`}
        </Text>
        <Text small bold textAlign="right">
          ${lpApy.toSignificant(5)}%
        </Text>
      </Grid>
      <BulletList>
        <li>
          <Text fontSize="12px" textAlign="center" color="textSubtle" display="inline" lineHeight={1.1}>
            {t("Calculated based on current rates.")}
          </Text>
        </li>
        <li>
          <Text fontSize="12px" textAlign="center" color="textSubtle" display="inline" lineHeight={1.1}>
            {t(
              "All figures are estimates provided for your convenience only, and by no means represent guaranteed returns."
            )}
          </Text>
        </li>
      </BulletList>
      {externalLink && (
        <Flex justifyContent="center" mt="24px">
          {externalLink}
        </Flex>
      )}
    </Box>
  ) : null;

  return (
    <StyledFooter p="16px" flexDirection="column">
      <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded((prev) => !prev)}>
        {isExpanded ? t("Hide") : t("Details")}
      </ExpandableLabel>
      {details}
    </StyledFooter>
  );
}
