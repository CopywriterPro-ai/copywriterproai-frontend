import { useMemo } from "react";
import numeral from "numeral";

const dict = {
  words: "Word Limit",
  inputLimit: "Input limit",
  userLimit: "User Limit",
  copywritingTools: "Copywriting tools",
  aiBlogGenerator: "AI blog generator",
  grammerFixer: "Grammar fixer",
  readabilityEnhancer: "Readability Enhancer",
  proofReading: "Proofreading",
  plagiarismChecker: "Plagiarism Checker",
  keywordResearch: "Keyword Research",
  chromeExtension: "Chrome extension",
  fireFoxAddon: "Firefox Addon",
  communitySupport: "Community support",
  tweentyFourSevenSupport: "24/7 support",
};

const packages = [
  {
    name: "Light",
    price: 5,
    popular: false,
    features: {
      words: 7000,
      inputLimit: 200,
      userLimit: 1,
      copywritingTools: 20,
      aiBlogGenerator: false,
      grammerFixer: false,
      readabilityEnhancer: false,
      proofReading: false,
      plagiarismChecker: false,
      keywordResearch: false,
      chromeExtension: true,
      fireFoxAddon: true,
      communitySupport: true,
      tweentyFourSevenSupport: false,
    },
  },
  {
    name: "Basic",
    price: 35,
    popular: false,
    features: {
      words: 50000,
      inputLimit: 500,
      userLimit: 3,
      copywritingTools: 45,
      aiBlogGenerator: true,
      grammerFixer: true,
      readabilityEnhancer: false,
      proofReading: false,
      plagiarismChecker: false,
      keywordResearch: false,
      chromeExtension: true,
      fireFoxAddon: true,
      communitySupport: true,
      tweentyFourSevenSupport: true,
    },
  },
  {
    name: "Professional",
    price: 99,
    popular: true,
    features: {
      words: 250000,
      inputLimit: 800,
      userLimit: 5,
      copywritingTools: 45,
      aiBlogGenerator: true,
      grammerFixer: true,
      readabilityEnhancer: true,
      proofReading: true,
      plagiarismChecker: true,
      keywordResearch: true,
      chromeExtension: true,
      fireFoxAddon: true,
      communitySupport: true,
      tweentyFourSevenSupport: true,
    },
  },
  {
    name: "Enterprise",
    price: "Custom",
    popular: false,
    features: {
      words: "Unlimited",
      inputLimit: 1000,
      userLimit: "unlimited",
      copywritingTools: 45,
      aiBlogGenerator: true,
      grammerFixer: true,
      readabilityEnhancer: true,
      proofReading: true,
      plagiarismChecker: true,
      keywordResearch: true,
      chromeExtension: true,
      fireFoxAddon: true,
      communitySupport: true,
      tweentyFourSevenSupport: true,
    },
  },
];

const usePricing = (months = 1) => {
  const formatPackages = useMemo(() => {
    return packages.map((item) => {
      if (item.name === "Enterprise") {
        // const features = item.features;
        // let formatFeatures = {};

        // for (const key in features) {
        //   const value = features[key];
        //   formatFeatures = {
        //     ...formatFeatures,
        //     [key]: { name: dict[key], value },
        //   };
        // }
        // return { ...item, features: formatFeatures };
        return item;
      } else {
        let percentage = 0;
        switch (true) {
          case months === 24:
            percentage = 20;
            break;
          case months >= 18:
            percentage = 15;
            break;
          case months >= 12:
            percentage = 10;
            break;
          case months >= 6:
            percentage = 5;
            break;
          default:
            percentage = 0;
            break;
        }
        const productprice = item.price * months;
        const features = item.features;
        const words = features.words * months;
        const formatedWords = numeral(words).format("0,0");
        const floatnum = percentage / 100;
        const percentageamount = productprice - productprice * floatnum;
        const price = parseFloat(percentageamount).toFixed(2);

        // let formatFeatures = {};

        // for (const key in features) {
        //   const value = features[key];
        //   formatFeatures = {
        //     ...formatFeatures,
        //     [key]: { name: dict[key], value },
        //   };
        // }

        // return {
        //   ...item,
        //   price,
        //   features: {
        //     ...formatFeatures,
        //     words: { name: dict.words, value: formatedWords },
        //   },
        // };
        return {
          ...item,
          price,
          features: {
            ...features,
            words: formatedWords,
          },
        };
      }
    });
  }, [months]);

  return { pricingFeaturesName: dict, pricingPackages: formatPackages };
};

export default usePricing;
